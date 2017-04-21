const moment = require('moment');

module.exports = (server) => {
    const Bot = server.models.Bot;
    const User = server.models.User;
    const Challenge = server.models.Challenge;

    return (req, res) => {
      let challenger, user, challengerBot, userBot;
      User.findById(req.userId).populate('bots')
          .then(ensureUser)
          .then(findChallengeOfUser)
          .then(ensureNoChallengeToday)
          .then(ensureBotsForUser)
          .then(ensureOneBotHasWeaponForUser)
          .then(findChallenger)
          .then(ensureChallenger)
          .then(findChallengeOfChallenger)
          .then(ensureNoChallengeToday)
          .then(ensureBotsForChallenger)
          .then(ensureOneBotHasWeaponForChallenger)
          .then(createChallenge)
          .then(respond)
          .catch(error);

          function findChallenger() {
            return User.findById(req.params.user).populate('bots');
          }

          function ensureChallenger(data) {
              if(!data) return Promise.reject({code: 404});

              if (data._id == req.userId) return Promise.reject({code: 403});
              
              challenger = data;
              return challenger;
          }

          function ensureUser(data) {
              if(!data) return Promise.reject({code: 404});

              user = data;
              return user;
          }

          function ensureBotsForUser() {
              if (user.bots.length === 0) return Promise.reject({code : 403});

              return user;
          }

          function ensureBotsForChallenger() {
              if (challenger.bots.length === 0) return Promise.reject({code : 403});

              return challenger;
          }

          function findChallengeOfUser() {
              return Challenge.findOne({ $or : [{
                $and : [{'date': moment().format('MMM-D-YYYY') }, { 'target': user._id }, {$or : [{'status': 'Selecting'},{'status': 'Done'}]}]
              },
              {
                  $and: [{'date': moment().format('MMM-D-YYYY') },{'source' : user._id}, { $or : [{'status' :'Pending'}, {'status': 'Selecting'}, {'status' : 'Done'}]}]
              }
              ]});
          }

          function findChallengeOfChallenger() {
              return Challenge.findOne({ $or : [{
                $and : [{'date': moment().format('MMM-D-YYYY') }, { 'target': challenger._id }, {$or : [{'status': 'Selecting'},{'status': 'Done'}]}]
              },
              {
                  $and: [{'date': moment().format('MMM-D-YYYY') },{'source' : challenger._id}, { $or : [{'status' :'Pending'}, {'status': 'Selecting'}, {'status' : 'Done'}]}]
              }
              ]});
          }


          function ensureNoChallengeToday(challenge) {
              if(challenge) return Promise.reject({code : 403});
              return challenge;
          }

          function ensureOneBotHasWeaponForUser() {
              let bots = user.bots;

              for (var i = 0; i < bots.length; i++) {
                  if(bots[i].weapons.length !== 0) {
                      return;
                  }
              }
              return Promise.reject({code : 403});
          }

          function ensureOneBotHasWeaponForChallenger() {
              let bots = challenger.bots;

              for (var i = 0; i < bots.length; i++) {
                  if(bots[i].weapons.length !== 0) {
                      return;
                  }
              }
              return Promise.reject({code : 403});
          }

          function createChallenge () {
            var date   =  moment().format('MMM-D-YYYY');
            var source =  user._id;
            var target =  challenger._id;
            var body = {
              'date' : date.toString(),
               'target' : target.toString(),
               'source' : source.toString(),
               'status' : 'Pending',
               'bots' : []
            };
            var challenge =  new Challenge(body);
            challenge.save((err, challenge) => {
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
