module.exports = (server) => {
    const User = server.models.User;
    const Challenge = server.models.Challenge;

    return (req, res, next) => {
        User.findById(req.userId)
            .then(ensureOne)
            .then(findChallengeWon)
            .then(ensureOne)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function findChallengeWon() {
            return Challenge.find({'winner': req.userId });
        }


        function ensureChallenge(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function respond(data) {
            return res.send(data)
        }

        function error(reason) {
            if (!reason.code)
                return res.status(500).send(reason);

            return res.status(reason.code).send(reason.message);
        }

    }
};
