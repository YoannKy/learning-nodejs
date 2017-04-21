module.exports = (server) => {
    server.use(server.middlewares.logger);
    server.use(server.middlewares.res);
    server.use(server.middlewares.bodyParser.urlencoded({
        extended: true
    }));
    server.use(server.middlewares.bodyParser.json());
    server.use('/bots', require('./bots')(server));
    server.use('/weapons', require('./weapons')(server));
    server.use('/users', require('./users')(server));
    server.use('/auth', require('./auth')(server));
    server.use('/challenges', require('./challenges')(server));
};
