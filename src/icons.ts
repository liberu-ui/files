import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faFolderOpen, 
    faPhotoVideo, 
    faFolderPlus, 
    faFolder, 
    faFileImport,
    faFileUpload, 
    faFileExport, 
    faStar, 
    faShare, 
    faShareAlt,
    faExclamationTriangle, 
    faFileContract, 
    faImage, 
    faCopyright,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Adds the specified icons to the font library.
 * 
 * @param icons - The icons to be added to the library.
 */
function addIconsToLibrary(...icons: IconDefinition[]): void {
    library.add(...icons);
}

// Add the icons to the library
addIconsToLibrary(
    faFolderOpen, 
    faPhotoVideo, 
    faFolderPlus, 
    faFolder,
    faFileImport,
    faFileUpload, 
    faFileExport, 
    faStar, 
    faShare,
    faShareAlt, 
    faExclamationTriangle, 
    faFileContract, 
    faImage,
    faCopyright,
);