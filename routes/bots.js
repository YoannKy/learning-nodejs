const router = require('express').Router();



module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.Bot.schema),
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.bots.create
    );

    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.list
    );

    router.get('/openlist',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.openlist
    );

    router.get('/ownerlist',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.ownerlist
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.show
    );

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.middlewares.bodyParser.json(),
        server.actions.bots.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.bots.remove
    );

    router.post('/:id/assign/:weaponId',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.assign
    );

    router.post('/:id/drop/:weaponId',
        server.middlewares.ensureAuthenticated,
        server.actions.bots.drop
    );

    return router;
};