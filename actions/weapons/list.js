module.exports = (server) => {
    const Weapon = server.models.Weapon;

    return (req, res, next) => {
        Weapon.find({'owner': null}, (err, instances) => {
            if (err)
                return res.status(500).send(err);

            res.send(instances);
        });
    }
};
