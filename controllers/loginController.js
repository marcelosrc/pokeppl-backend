const pool = require("../config/database");

const currentSession = async (req, res) => {
  const currentUser = req.session.passport.user;
  const userDetails = {
    id: currentUser.id,
    name: currentUser.name.givenName,
    gender: currentUser.gender,
    picture: currentUser.photos ? currentUser.photos[0].value : null,
  };

  if (req.session.passport.user) {
    pool.query(
      `SELECT *
      FROM users
      WHERE facebook_id = $1;`,
      [userDetails.id],
      (err, cb) => {
        if (!err && cb.rowCount === 1) {
          return res.status(200).send(cb);
        } else if (!err && cb.rowCount === 0) {
          pool.query(
            `DO $$
        
            DECLARE
              user_id INTEGER;
              
            BEGIN
            
            INSERT INTO pokeppl.users(id, name, profile_pic_path, captured_ppl, facebook_id)
            VALUES (DEFAULT, '${userDetails.name}', '${userDetails.picture}', DEFAULT, ${userDetails.id})
            RETURNING id INTO user_id;
            
            INSERT INTO pokeppl.inventory(id, quantity, item)
            VALUES (user_id, null, null);
            
            END $$;`,
            (err, cb) => {
              if (!err) {
                return res.status(200).send(cb);
              } else {
                console.log(userDetails.name);
                return res.status(400).send(err.stack);
              }
            }
          );
        } else {
          return res.status(404).send(err);
        }
      }
    );
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).send(req.session);
};

module.exports = {
  currentSession,
  logout,
};
