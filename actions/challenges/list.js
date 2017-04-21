module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        Challenge.find((err, instances) => {
            if (err)
                return res.status(500).send(err);

            res.send(instances);
        }).populate('winner');
    }
};
