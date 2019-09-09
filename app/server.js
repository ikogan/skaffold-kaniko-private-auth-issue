'use strict';

const Hapi = require('@hapi/hapi');


const init = async() => {
    const server = new Hapi.Server({
        port: process.env['SERVER_PORT'] || 3000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return {'status': 'running'};
        }
    });

    server.route({
        method: 'GET',
        path: '/environment',
        handler: (request, h) => {
            return process.env;
        }
    });

    await server.register({
        plugin: require('@hapi/good'),
        options: {
            reporters: {
                console: [{
                    module: '@hapi/good-squeeze',
                    name: 'Squeeze',
                    args: [{ log: '*', response: '*' }]
                },{
                    module: '@hapi/good-console'
                },
                'stdout']
           }
        }        
    });

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();

