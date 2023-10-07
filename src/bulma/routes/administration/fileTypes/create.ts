/**
 * This is a TypeScript code file that defines the route configuration
 * for creating file types in a web application's administration section.
 */

import { RouteConfig } from 'vue-router';

import CreateFileType from '../../../pages/fileTypes/Create.vue';

/**
 * Represents the route configuration for creating a file type.
 */
const CreateFileTypeRoute: RouteConfig = {
  /**
   * The name of the route.
   */
  name: 'administration.fileTypes.create',

  /**
   * The URL path for the route.
   */
  path: 'create',

  /**
   * The Vue component to render for this route.
   */
  component: CreateFileType,

  /**
   * Additional metadata for the route.
   */
  meta: {
    /**
     * The breadcrumb text for this route.
     */
    breadcrumb: 'create',

    /**
     * The title for the route.
     */
    title: 'Create File Type',
  },
};

export default CreateFileTypeRoute;
