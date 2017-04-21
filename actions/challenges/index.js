module.exports = (server) => {
    return {
        create: require('./create')(server),
        list: require('./list')(server),
        choose: require('./choose')(server),
        selectBot: require('./selectBot')(server),
        kombat: require('./kombat')(server),
        show: require('./show')(server),
    };
};
