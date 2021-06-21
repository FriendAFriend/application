/* 
this script handles CRUD functionality for user schema for sign-up, login, authentication
*/ 

const db = require('../models/model');
const bcrypt = require('bcrypt');

const userController = {};

// find a user by email
// sets the user row onto res.locals.user
userController.getUser = (req, res, next) => {
    const queryParams = [req.body.email];
    const queryString = `SELECT * FROM users
                         WHERE email = $1;`;
    db.query(queryString, queryParams, (err, result) => {
      if (err) return next({ status: 500, message: `Error in userController.getUser. ${err}` });
      res.locals.user = result.rows[0];
      return next();
    });
}

/* finds a user by email and compares the password with bcrypt user row is saved to res.locals.user */
userController.verifyUser = (req, res, next) => {
  const queryParams = [req.body.email];
  const queryString = `SELECT * FROM users
                       WHERE email = $1;`;
  db.query(queryString, queryParams, (err, result) => {
    if (err) return next({ status: 500, message: `Error in userController.verifyUser: ${err}`});
    if (result.rows.length === 0) {
      return res.status(400).json({ userVerified: false, message: 'User not found. Please check email.' });
    }
    bcrypt.compare(req.body.password, result.rows[0].password, (err, isMatched) => {
      if (isMatched === false) {
        return res.status(400).json({ userVerified: false, message: 'Password incorrect.'});
      }
      res.locals.user = result.rows[0];
      return next();
    });
  });
};

// creates a user row with bcrypted password
// TODO does not seem to have collision handling for an already created user?
userController.createUser = async (req, res, next) => {
  const SALT_FACTOR = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, SALT_FACTOR);
  const queryParams = [
    // ! add params, see table
  ];
  const queryString = ``;
  db.query(queryString, queryParams, (err, result) => {
    if (err) return next(err);
    return next();
  });
};

module.exports = userController;