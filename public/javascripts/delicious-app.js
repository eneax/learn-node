import '../sass/style.scss';

import { $, $$ } from './modules/bling'; // it allows us to use $('') instead of document.querySelector()
import autocomplete from './modules/autocomplete';

autocomplete( $('#address'), $('#lat'), $('#lng') );