import { RouteConfig } from 'vue-router';
import { RouteImporter } from '@liberu-ui/ui/src/modules/importers/routeImporter';

/**
 * Imports all routes from the './fileTypes' folder and returns them as an array of RouteConfig.
 * @param {Function} requireContext - The require.context function used to import the routes.
 * @returns {Array<RouteConfig>} The imported routes.
 */
const importRoutes = (requireContext: __WebpackModuleApi.RequireContext): Array<RouteConfig> => {
    return RouteImporter(requireContext);
};

/**
 * The router component for the 'fileTypes' path.
 */
const FileTypesRouter = (): Promise<typeof import('@liberu-ui/ui/src/bulma/pages/Router.vue')> => {
    return import('@liberu-ui/ui/src/bulma/pages/Router.vue');
};

/**
 * The configuration for the 'fileTypes' route.
 */
const fileTypesRouteConfig: RouteConfig = {
    path: 'fileTypes',
    component: FileTypesRouter,
    meta: {
        breadcrumb: 'fileTypes',
        route: 'administration.fileTypes.index',
    },
    children: importRoutes(require.context('./fileTypes', false, /.*\.ts$/)),
};

export default fileTypesRouteConfig;