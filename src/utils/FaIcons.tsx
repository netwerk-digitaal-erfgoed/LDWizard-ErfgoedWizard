import { library } from "@fortawesome/fontawesome-svg-core";

/**
 * When adding an icon, first import that icon, and then make sure that icon is added to the lib (bottom of this file) as well
 */
import { faThumbsUp, faCircle, faFileCode, faFile, faFileArchive } from "@fortawesome/free-regular-svg-icons";

import {
  faBook,
  faCircle as faCircleSolid,
  faCaretDown,
  faDatabase,
  faDownload,
  faExclamationTriangle,
  faFileCsv,
  faInfo,
  faInfoCircle,
  faLongArrowAltDown,
  faPlus,
  faThumbsUp as faThumbsUpSolid,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function registerIcons() {
  library.add(
    faBook,
    faCaretDown,
    faCircle,
    faCircleSolid,
    faDatabase,
    faDownload,
    faExclamationTriangle,
    faGithub,
    faInfo,
    faInfoCircle,
    faFile,
    faFileArchive,
    faFileCode,
    faFileCsv,
    faLongArrowAltDown,
    faPlus,
    faTimes,
    faThumbsUp,
    faThumbsUpSolid,
    faUpload
  );
}
declare module "@fortawesome/fontawesome-svg-core" {
  export interface Props {
    title: string;
  }
}
