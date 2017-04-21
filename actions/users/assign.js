module.exports = (server) => {
    const User = server.models.User;
    const Bot = server.models.Bot;
    return (req, res) => {

            findBot()
            .then(ensureNone)
            .then(assignBot)
            .then(findUser)
            .then(assignToUser)
            .then(res.noContent)
            .catch(res.error);

            function findBot() {
                return Bot.findOne({_id: req.params.botId, 'owner': null});
            }

            function ensureNone(bot) {
               return (bot)? bot : Promise.reject({code: 403, reason: 'bot doesn\'t exist or is assigned'});
            }

            function assignBot(bot) {
              bot.owner = req.userId;
              return bot.save();
            } 

            function findUser() {
                return User.findById(req.userId);
            }

            function assignToUser(user) {
                user.bots.push(req.params.botId);
                return user.save();
            }    
    };
};