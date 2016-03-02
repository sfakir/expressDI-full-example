var _ = require('lodash');
var path = require('path');
/***
 * Little Magic Router for Express.JS
 *
 *
 * Important to know:
 *  1) Defaults loads all controllers (see attribute 'autoload' in configuration)
 *  2) dependencyTree.findResolvedContaining => returns all resolved containers with the name
 *  3)
 *
 * @param App
 * @param dependencyTree
 */
module.exports = function (App, Defaults, dependencyTree) {

    //var bundlesFoldername  = 'bundles';
    var routes = [];
    var controllers = dependencyTree.findResolvedContaining('Controller');
    var allowedMethods = ['GET','POST','PATCH','PUT','DELETE'];


     // Get all routes of the controllers and merge them.
    _.each(controllers, function (obj, name) {
        var ctrl = obj.value;
        routes = routes.concat(ctrl.routes);
    });


     //add newly found routes
    _.each(routes, function (route) {

        console.log("[routes] Found Route - " + route.path + ' - ' + route.httpMethod);

        // skip empty routes
        if (!route || !route.middleware) {
            console.log("[Routes] Warning: Empty route:", route);
            return;
        }
        var args = _.flatten([route.path, route.middleware]);

        if (allowedMethods.indexOf(route.httpMethod) === -1){
            throw new Error('illegal http Method in route', route.httpMethod, route);
        }
        var method =  route.httpMethod.toLowerCase();
        // register route in App;
        App[method].apply(App,args);
    });


};