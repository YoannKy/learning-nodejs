module.exports = (api) => {
  api.actions = {
    users: require('./users')(api),
    cars: require('./cars')(api)
  };
};
