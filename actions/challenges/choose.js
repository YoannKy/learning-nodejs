const moment = require('moment');

module.exports = (server) => {
    const Bot = server.models.Bot;
    const User = server.models.User;
    const Challenge = server.models.Challenge;

    return (req, res) => {
      Challenge.findById(req.params.challenge)
          .then(ensureOne)
          .then(ensureLoggedUserIsTarget)
          .then(chooseChallenge)
          .then(respond)
          .catch(error);

          function ensureOne(data)  {
              if(!data) return Promise.reject({code: 404});

              return data;
          }

          function ensureLoggedUserIsTarget(challenge) {
              if (challenge.target != req.userId) return Promise.reject({code: 403});

              return challenge;
          }

          function chooseChallenge(challenge) {
              var choice = req.body.choice;
              if (choice === 'accept') {
                challenge.status = 'Selecting';
              } else if(choice ==='refuse') {
                challenge.status = 'Canceled';
              } else {
                return Promise.reject({code : 403});
              }

              challenge.save((err, result) => {
                  if (err)
                      return res.status(500).send(err);
                  res.status(201).send();
              });

          }

          function respond(data) {
              return res.status(201).send()
          }

          function error(reason) {
              if (!reason.code)
                  return res.status(500).send(reason);

              return res.status(reason.code).send(reason.message);
          }
    };
};
