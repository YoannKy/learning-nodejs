const moment = require('moment');

module.exports = (server) => {
    const Bot = server.models.Bot;
    const User = server.models.User;
    const Challenge = server.models.Challenge;

    return (req, res) => {
      let challenge, bot;
      Challenge.findById(req.params.challenge).populate([{
          path: 'bots',
          populate: {
              path: 'weapons'
          }
      },'users'])
          .then(ensureChallenge)
          .then(ensureLoggedUserIsSourceOrTarget)
          .then(kombatBots)
          .then(respond)
          .catch(error);

          function ensureChallenge(data)  {;
              if(!data) return Promise.reject({code: 404});

              challenge = data;
              if (challenge.status !== "Done") return Promise.reject({code : 403});

              return challenge;
          }

          function ensureLoggedUserIsSourceOrTarget(challenge) {
              if (challenge.target != req.userId && challenge.source != req.userId) return Promise.reject({code: 403});

              return challenge;
          }

          function kombatBots(challenge) {
              let bot1, bot2, damageOfBot1 = 0, damageOfBot2 = 0;
              bot1 = challenge.bots[0];
              bot2 = challenge.bots[1];

              for (let i = 0; i < bot1.weapons.length; i++) {
                  damageOfBot1 += bot1.weapons[i].damage;
              }
              damageOfBot1 = damageOfBot1 / bot2.health;


              for (let i = 0; i < bot2.weapons.length; i++) {
                  damageOfBot2 += bot2.weapons[i].damage;
              }
              damageOfBot2 = damageOfBot2 / bot1.health;

              if(damageOfBot1 > damageOfBot2) challenge.winner = bot1.owner;
              if(damageOfBot1 < damageOfBot2) challenge.winner = bot2.owner;
               challenge.save();

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
