module.exports = (server) => {
    return {
        create: require('./create')(server),
        update: require('./update')(server),
        list: require('./list')(server),
        show: require('./show')(server),
        remove: require('./remove')(server),
        assign: require('./assign')(server),
        buy: require('./buy')(server)
    };
};