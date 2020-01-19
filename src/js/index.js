import RetroCompat from "./retro-compat";
import LazyImageLoad from "./lazy-image-load";
import AsideHandler from "./aside-handler";
import TopNavHandler from "./top-nav-handler";

/* Font Awesome */

import { library, dom } from "@fortawesome/fontawesome-svg-core"

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faFlask } from "@fortawesome/free-solid-svg-icons/faFlask";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";

let loadFontAwesome = function () {
   library.add(
      faBars,
      faBook,
      faChevronLeft,
      faChevronRight,
      faEdit,
      faEnvelope,
      faFlask,
      faGithub,
      faHeart,
      faHome,
      faLayerGroup,
      faLinkedin,
      faPaperPlane
   );

   dom.watch();
};

let main = function () {
   loadFontAwesome();
};

if (new RetroCompat().Check()) {
   console.log("Your browser is fully compatible!");
   main();
} else {
   // All other browsers loads polyfills and then run `main()`.
   new RetroCompat().loadScript("/assets/js/polyfills.js", main);
}

new LazyImageLoad();
new AsideHandler();
new TopNavHandler();