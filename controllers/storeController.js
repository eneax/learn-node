const mongoose = require('mongoose');

const Store = mongoose.model('Store');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

// Check if the user uploads a picture
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true); // continue with the file uploading if it's a photo
    } else {
      next({ message: "That file type isn't allowed!"}, false);
    }
  },
};

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

// Upload file to memory
exports.upload = multer(multerOptions).single('photo');

// Resize image before uploading
exports.resize = async (req, res, next) => {
  // Check if there is no file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written our photo to the filesystem, keep going!
  next();
};

exports.createStore = async (req, res) => {
  req.body.author = req.user._id;
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully created ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // Query the database for a list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores: stores });
};

const confirmOwner = (store, user) => {
  if (!store.author.equals(user._id)) {
    throw Error('You must own a store in order to edit it!');
  }
};

exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });
  // 2. Confirm they are the owner of the store
  confirmOwner(store, req.user);
  // 3. Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store: store });
};

exports.updateStore = async (req, res) => {
  // Set the location data to be a point
  req.body.location.type = 'Point';
  // Find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true
  }).exec();
  // Display success message
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
  // Redirect to the store
  res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate('author');
  if (!store) return next();

  // render store
  res.render('store', { store: store, title: store.name });
};

exports.getStoresByTag = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true }; // if there is no tag selected, show me all stores that contain a tag
  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({ tags: tagQuery });
  const [ tags, stores ] = await Promise.all([tagsPromise, storesPromise]);

  res.render('tag', { tags: tags, title: 'Tags', tag, stores });
};

exports.searchStore = async (req, res) => {
  const stores = await Store
    // first find stores that match
    .find({
      $text: {
        $search: req.query.q,
      },
    }, {
      score: { $meta: 'textScore' },
    })
    // then sort them
    .sort({
      score: { $meta: 'textScore' },
    })
    // limit to only 5 results
    .limit(5);
  res.json(stores);
};

exports.mapStores = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordinates,
        },
        $maxDistance: 10000, // 10kkm
      },
    },
  };

  const stores = await Store.find(q).select('slug name description location').limit(10);
  res.json(stores);
};

/*

  - async -> each time you have to query the db
  - await the thing that returns a promise
  - it means, wait for me to save the store first and then flash and redirect

*/
