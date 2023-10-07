/**
 * Represents the file index component.
 */
const FilesIndex: () => Promise<typeof import('../pages/files/Index.vue')> = () => import('../pages/files/Index.vue');

/**
 * Represents the file route configuration.
 */
const fileRoute = {
    /**
     * The name of the file component.
     */
    name: 'core.files.index',
  
   /**
    * The path of the file route.
    */
    path: '/files',
  
   /**
    * The component for the file route.
    */
    component: FilesIndex,
  
   /**
    * Additional metadata for the file route.
    */
    meta: {
        /**
         * The breadcrumb text for the file route.
         */
        breadcrumb: 'files',
  
        /**
         * The title of the file route.
         */
        title: 'Files',
    },
};

export default fileRoute;