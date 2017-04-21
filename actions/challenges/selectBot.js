const moment = require('moment');

module.exports = (server) => {
    const Bot = server.models.Bot;
    const User = server.models.User;
    const Challenge = server.models.Challenge;

    return (req, res) => {
      let challenge, bot;
      Challenge.findById(req.params.challenge)
          .then(ensureChallenge)
          .then(ensureLoggedUserIsSourceOrTarget)
          .then(findBot)
          .then(ensureBot)
          .then(ensureLoggedUserIsOwner)
          .then(ensureBotHasWeapon)
          .then(selectBotForChallenge)
          .then(respond)
          .catch(error);

          function ensureChallenge(data)  {
              if(!data) return Promise.reject({code: 404});

              challenge = data;

              if (challenge.status !== "Selecting") return Promise.reject({code : 403});
               
              return challenge;
          }

          function ensureLoggedUserIsSourceOrTarget(challenge) {
              if (challenge.target != req.userId && challenge.source != req.userId) return Promise.reject({code: 403});

              return challenge;
          }

          function findBot() {
                return Bot.findById(req.params.bot);
          }

          function ensureBot(data) {
            if(!data) return Promise.reject({code: 404});

            bot = data;
            return bot;
          }

          function ensureLoggedUserIsOwner() {
              if (bot.owner != req.userId) return Promise.reject({code: 403});

              console.log(bot);
              return bot;
          }

          function ensureBotHasWeapon() {
              if (bot.weapons.length === 0) return Promise.reject({code: 403});

              return bot;
          }

          function selectBotForChallenge() {

              if (challenge.bots.length  === 2) return Promise.reject({code :403})

              if (challenge.bots.indexOf(bot._id) !== -1) return Promise.reject({code :403})

              for (var i = 0; i < challenge.bots.length; i++) {
                  if(challenge.bots[i].source == req.userId || challenge.bots[i].target == req.userId) return Promise.reject({code :403});
              }

              challenge.bots.push(bot);

              if (challenge.bots.length === 2) challenge.status = "Done";

              challenge.save();

          }

          function challengeReady(challenge) {
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
