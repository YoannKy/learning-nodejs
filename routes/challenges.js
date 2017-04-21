const router = require('express').Router();



module.exports = (server) => {

    router.post('/:user',
        server.middlewares.ensureAuthenticated,
        server.middlewares.clean(['winnner', 'statuts', 'target', 'source', 'date', 'bots']),
        server.actions.challenge.create
    );

    router.get('/',
        server.actions.challenge.list
    );

    router.get('/:challenge',
        server.middlewares.ensureAuthenticated,
        server.actions.challenge.show
    );

    router.post('/choose/:challenge',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureBodyFields('choice'),
        server.middlewares.clean(['winnner', 'statuts', 'target', 'source', 'date', 'bots']),
        server.actions.challenge.choose
    );

    router.post('/:challenge/selectBot/:bot',
        server.middlewares.ensureAuthenticated,
        server.middlewares.clean(['winnner', 'statuts', 'target', 'source', 'date', 'bots']),
        server.actions.challenge.selectBot
    );

    router.post('/:challenge/kombat',
        server.middlewares.ensureAuthenticated,
        server.middlewares.clean(['winnner', 'statuts', 'target', 'source', 'date', 'bots']),
        server.actions.challenge.kombat
    );

    return router;
};
