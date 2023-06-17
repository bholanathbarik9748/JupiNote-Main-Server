'use strict';
// var server = express();

var Table = require('cli-table');
var _ = require('lodash');

module.exports = function (server, options) {
    var config  = _.assign({
        header: ['API PATH', 'API METHOD'],
        style: {
            compact: false,
            head: ['cyan'],
            //border: ['magenta'],
        },
        showStatistics: true,
        autoPrint: true,
        otherRouters: []
    }, options);

    var routers = [], otherRouters = [];
    if (config.otherRouters.length) {
        _.each(config.otherRouters, function(r){
            otherRouters = otherRouters.concat(parseRouters(r));
        });
    }

    routers = otherRouters.concat(parseRouters(server._router))

    function parseRouters (_routers) {
        var route, routes = [];
        _routers.stack.forEach(function(middleware) {
            if (middleware.route) {
                 // routes registered directly on the app
                routes.push(middleware.route);
            } else if (middleware.name === 'router') {
                // router middleware
                middleware.handle.stack.forEach(function(handler){
                    route = handler.route;
                    route && routes.push(route);
                });
            }
        });
        return routes;
    }

    var table = new Table({
        head: config.header,
        style: config.style
    });

    _.each(routers, function(r, i) {
        var _method = null;
        for (var k in r.methods) {
            _method = k;
        }
        var _rou = [r.path, _method.toUpperCase()]
        table.push(_rou);
    });

    if (config.showStatistics) {
        table.push(['Total Number', routers.length]);
    }

    if (config.autoPrint) {
        console.log(table.toString());
    } else {
        return table;
    }
};
