module.exports = (server) => {
    const Bot = server.models.Bot;

    return (req, res, next) => {
        let query = Bot.findOne({id: req.params.id, owner: req.userId})
            .populate('weapons');

        query.exec((err, instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.send(instance);
        });
    }
};
