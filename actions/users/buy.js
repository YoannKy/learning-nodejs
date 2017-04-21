module.exports = (server) => {
    const User = server.models.User;
    const Weapon = server.models.Weapon;
    return (req, res) => {
       let weapon, user;
        findWeapon()
        .then(ensureNone)
        .then(findUser)
        .then(ensurehasCredit)
        .then(assignWeapon)
        .then(assignToUser)
        .then(res.noContent)
        .catch(res.error);

        function findWeapon() {
            return Weapon.findOne({_id: req.params.weaponId, 'owner': null});
        }

        function ensureNone(data) {
           return (data)? data : Promise.reject({code: 403, reason: 'weapon doesn\'t exist or is bought'});
        }

        function findUser(data) {
            weapon = data;
            return User.findById(req.userId);
        }

        function ensurehasCredit(data) {
            user = data;
            if (weapon.price > user.credit) {
                Promise.reject({code: 403, reason: 'don\'t have credit'});
            }
        }
        function assignWeapon() {
          weapon.owner = req.userId;
          return weapon.save();
        } 

        function assignToUser() {
            user.credit -= weapon.price;
            user.weapons.push(req.params.weaponId);
            return user.save();
        }    
    };
};