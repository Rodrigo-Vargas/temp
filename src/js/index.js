import collapse from "./collapse";

new collapse().init();


/* Font Awesome */

import { library, dom } from '@fortawesome/fontawesome-svg-core'

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';

import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';

library.add(
  faBars, 
  faEnvelope,
  faGithub,
  faLinkedin,
  faHeart
);

dom.watch();