module.exports = (server) => {
    server.actions = {
        bots: require('./bots')(server),
        weapons: require('./weapons')(server),
        users: require('./users')(server),
        challenge: require('./challenges')(server),
        auth: require('./auth')(server)
    };
};
