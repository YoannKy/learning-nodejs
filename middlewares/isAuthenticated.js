const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const User = server.models.User;
    const salt = server.settings.security.salt;

    return (req, res, next) => {
        req.isAuthenticated = true;
        let encryptedToken = req.headers['authorization'];

        if (!encryptedToken)
            req.isAuthenticated = false;
            return next();

        jwt.verify(encryptedToken, salt, (err, token) => {
            if (err)
                req.isAuthenticated = false;
                return next();

            if (!token)
                req.isAuthenticated = false;
                return next();

            User.findById(token.userId, (err, user) => {
                if (err)
                    req.isAuthenticated = false;
                    return next();

                if (!user)
                    req.isAuthenticated = false;
                    return next();

                req.userId = token.userId;
                req.role   = user.role
                next();
            });
        });

        function unauthorized() {
            res.status(401).send();
        }
    };
};