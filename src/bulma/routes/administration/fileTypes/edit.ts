/**
 * This file defines the TypeScript code for a route configuration in an administration module.
 * It exports a default object which contains the route configuration.
 */

import { RouteConfig } from 'vue-router';

// Import the component for editing file types
import FileTypeEdit from '../../../pages/fileTypes/Edit.vue';

// Define the route configuration object
const administrationRouteConfig: RouteConfig = {
  /**
   * The name of the administration file types edit route.
   * @type {string}
   */
  name: 'administration.fileTypes.edit',
  
  /**
   * The URL path of the administration file types edit route.
   * @type {string}
   */
  path: ':type/edit',
  
  /**
   * The component to be rendered for the administration file types edit route.
   * @type {import('vue').VueConstructor}
   */
  component: FileTypeEdit,
  
  /**
   * The meta data for the administration file types edit route.
   * @type {object}
   * @property {string} breadcrumb - The breadcrumb text for the route.
   * @property {string} title - The title of the route.
   */
  meta: {
    breadcrumb: 'edit',
    title: 'Edit FileType',
  },
};

export default administrationRouteConfig;