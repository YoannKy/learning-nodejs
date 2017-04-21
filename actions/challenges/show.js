module.exports = (server) => {
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        Challenge.findById(req.params.challenge, (err, challenge) => {
            if (err) return res.status(500).send(err);
            if (challenge.source[0] != req.userId && challenge.target[0] != req.userId) return res.status(403).send(err);

            res.send(challenge);
        }).populate([{
            path: 'bots',
            populate: {
                path: 'weapons'
            }
        },'users','winner']);
    }
};
