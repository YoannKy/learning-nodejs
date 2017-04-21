module.exports = (server) => {
    const Bot = server.models.Bot;

    return (req, res, next) => {
        if(req.isAuthenticated == false) {
            Bot.findOne({ _id: req.params.id,'owner': null })
            .then(ensureOne)
            .then(sendResult)
            .catch(res.error);
        } else {
            Bot.findOne({ _id: req.params.id, $or : [{'owner': req.userId},{'owner': null}] })
            .populate({
                path: 'weapons',
            })
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