module.exports = (server) => {
    const User = server.models.User;
    return (req, res) => {

            findUSer()
            .then(findUser)
            .then(ensureNone)
            .then(creditUser)
            .then(res.noContent)
            .catch(res.error);

            function findUser() {
                return User.findById(req.params.userId);
            }

            function ensureNone(user) {
               return (user)? user : Promise.reject({code: 403, reason: 'user doesn\'t exist'});
            }

            function creditUser(user) {
                user.credit += req.body.credit;
                return user.save();
            }    
    };
};