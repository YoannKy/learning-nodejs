const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.User.schema),
        server.actions.users.create
    );

    
    router.post('/assign/:botId',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.actions.users.assign
    );

    router.post('/buy/:weaponId',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.actions.users.buy
    );

    router.post('/credit/:userId',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.users.credit
    );

    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.actions.users.list
    );

    router.get('/palmares',
        server.middlewares.ensureAuthenticated,
        server.actions.users.palmares
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.users.show
    );

    router.put('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.middlewares.clean(['password', '_id']),
        server.actions.users.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.users.remove
    );

    return router;
};
