module.exports = (server) => {
    const Weapon = server.models.Weapon;

    return (req, res, next) => {
        if(req.isAuthenticated == false) {
            Weapon.findOne({ _id: req.params.id,'owner': null })
            .then(ensureOne)
            .then(sendResult)
            .catch(res.error);
        } else {
            Weapon.findOne({ _id: req.params.id, $or : [{'owner': req.userId},{'owner': null}] })
            .then(ensureOne)
            .then(sendResult)
            .catch(res.error);  
        }

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function sendResult(data) {
            return res.send(data);
        }
    }
};