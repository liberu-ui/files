import routeImporter from '@liberu-ui/ui/src/modules/importers/routeImporter';

/**
 * Imports all the route configuration files from the './administration' directory.
 * 
 * @param {NodeRequireContext} requireContext - The require context for the files.
 * @returns {Array} - An array of route configuration objects.
 */
const importRoutes = (requireContext: NodeRequireContext): RouteConfig[] => {
  return routeImporter(requireContext);
};

/**
 * The route configuration for the administration section.
 */
const administrationRoute: RouteConfig = {
  path: '/administration',
  children: importRoutes(require.context('./administration', false, /.*\.ts$/)),
};

export default administrationRoute;

/**
 * The route configuration.
 * 
 * @interface RouteConfig
 * @property {string} path - The path of the route.
 * @property {Array} children - The child routes.
 */
interface RouteConfig {
  path: string;
  children: RouteConfig[];
}

/**
 * The require context for the files.
 * 
 * @interface NodeRequireContext
 * @property {Function} keys - Returns an array of all possible request strings.
 * @property {Function} resolve - Returns the module id of the requested module.
 * @property {Function} id - Returns the module id of the context module.
 * @property {Function} webpackPolyfill - A getter function for the webpack runtime.
 */
interface NodeRequireContext {
  keys(): string[];
  resolve(id: string): string;
  id: string;
  webpackPolyfill: any;
}