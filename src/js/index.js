import RetroCompat from "./retro-compat";
import LazyImageLoad from "./lazy-image-load";
import AsideHandler from "./aside-handler";
import TopNavHandler from "./top-nav-handler";
import LanguageDetector from "./language-detector";

/* Font Awesome */

import { library, dom } from "@fortawesome/fontawesome-svg-core"

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons/faBriefcase";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faDesktop } from "@fortawesome/free-solid-svg-icons/faDesktop";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faFlag } from "@fortawesome/free-solid-svg-icons/faFlag";
import { faFlask } from "@fortawesome/free-solid-svg-icons/faFlask";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons/faLightbulb";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons/faPaperPlane";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import { faFileAlt } from "@fortawesome/free-regular-svg-icons/faFileAlt";

import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";

let loadFontAwesome = function () {
   library.add(
      faBars,
      faBook,
      faBriefcase,
      faCircle,
      faChevronLeft,
      faChevronRight,
      faDesktop,
      faEdit,
      faEnvelope,
      faFileAlt,
      faFlask,
      faFlag,
      faGithub,
      faGraduationCap,
      faHeart,
      faHome,
      faLayerGroup,
      faLightbulb,
      faLink,
      faLinkedin,
      faPaperPlane,
      faPhone,
      faStar,
      faTimes
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
new LanguageDetector();