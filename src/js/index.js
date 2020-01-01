//import collapse from "./collapse";
import RetroCompat from "./retro-compat";

//new collapse().init();

/* Font Awesome */

import {
   library,
   dom
} from '@fortawesome/fontawesome-svg-core'

import {
   faBars
} from '@fortawesome/free-solid-svg-icons/faBars';
import {
   faEnvelope
} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {
   faHeart
} from '@fortawesome/free-solid-svg-icons/faHeart';

import {
   faGithub
} from '@fortawesome/free-brands-svg-icons/faGithub';
import {
   faLinkedin
} from '@fortawesome/free-brands-svg-icons/faLinkedin';

let loadFontAwesome = function () {
   library.add(
      faBars,
      faEnvelope,
      faGithub,
      faLinkedin,
      faHeart
   );

   dom.watch();
}

let main = function () {
   loadFontAwesome();
}

if (new RetroCompat().Check()) {
   console.log("Your browser is fully compatible!");
   main();
} else {
   // All other browsers loads polyfills and then run `main()`.
   new RetroCompat().loadScript('/assets/js/polyfills.js', main);
}