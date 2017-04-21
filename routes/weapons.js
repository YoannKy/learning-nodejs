const router = require('express').Router();

module.exports = (server) => {
    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.Weapon.schema),
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.weapons.create
    );

    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.actions.weapons.list
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.weapons.show
    );

    router.get('/ownerweapons',
        server.middlewares.ensureAuthenticated,
        server.actions.weapons.ownerweapons
    );

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.weapons.update
    );

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureIsAdmin,
        server.actions.weapons.remove
    );

    return router;
};