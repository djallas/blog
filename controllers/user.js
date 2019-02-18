/* eslint linebreak-style: ["error", "windows"] */
import queryuser from '../database/usersquery';

const dotenv = require('dotenv');
// Update with your config settings.
dotenv.config();

// Joi, validation helper
import Joi from 'joi';

// // manage auth
import jwt from 'jsonwebtoken';

// encrypting password
import bcrypt from 'bcryptjs';

export default class User {
  // query all users from the database
  static getAllUsers(req, res) {
    queryuser
    .getAll()
    .then((users) => {
      res.status(200).json({
        message: 'all users',
        users
      });
    });
  }
  // set up username
  static setUsername(req, res, next) {
    // validate user
    // const {error} = validateUsername(req.body);
    // if(error){
    //     res.status(400).send({
    //       message:error.details[0].message
    //     });
    //     return;
    // }
    const user = {
      username: req.body.username,
      id: req.body.id
    }  
    // let message = '';  
    queryuser
    .updateUsername(user)
    .then((user) => { 
    res.redirect('/me');
    }).catch(error => {
      if (error.routine === '_bt_check_unique') {
        res.redirect('/me');
      }
    })
  }
  // sign up new user
  static createUser(req, res) { 
    // validate user
    const {error} = validateUser(req.body);
    if(error){
        res.status(400).send({
          message:error.details[0].message
        });
        return;
    }
    // user info
    bcrypt.hash(req.body.password, 10, (err, hashed) => {
      // get input info
      const user = {
        email: req.body.email,
        username: req.body.username,
        names: req.body.names,
        password: hashed
      }
      if(err){
        return res.status(500).send({
          error:err
        });
      } else {
      // start insert query
        queryuser
        .create(user)
        .then(user => res.status(200).json({
          message: "User registered successfully"
        })
        )
        .catch((error) => {
          if (error.routine === '_bt_check_unique') {
            return res.status(422).json({
                message: 'Sorry, user already exists!'
            });
          }
          if (error.routine === 'ExecConstraints') {
              return res.status(402).json({
              message: 'user post cannot be empty'
            });
          }
          if(error){
            res.json({
              message:error
            });
          }
        });
      }
    });
  } 
  // user sign in
  static login (req, res) {
    // request inputs
    const credential = {
      email: req.body.email,
      password: req.body.password
    }
    // validate inputs      
    const {error} = validateLogin(credential);
    if(error){
      res.status(400).send({
        message:error.details[0].message
      });
      return;
    }
      // check user in db
    queryuser.login(credential).then((user) => {
      //  if user exist
      if(user){
          bcrypt.compare(credential.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).send({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign({id: user.id, role: user.role, contributor: user.contributor}, process.env.SECRET, {expiresIn: "24h"});
            return res.status(200).send({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).send({
            message: "Auth failed"
          });
        });
      }else{
        // user not exist
        res.status(409).send({
          message: "Account not found."
        })
      }
    })
    .catch((error) => {
      res.send({
        message:error.message
      })
    });
    }
  }
// validating user
function validateUser(user){
  const schema = {
      names: Joi.string().min(5).max(60).required(),
      username: Joi.string().min(6).max(30).required(),
      email: Joi.string().email().min(10).max(300),
      password: Joi.string(),
      created_time: Joi.date()
      
  };
  return Joi.validate(user, schema);
}
// validating login
function validateLogin(user){
  const schema = {
      email: Joi.string().email().min(6).max(30).required(),
      password: Joi.string()
      
  };
  return Joi.validate(user, schema);
}
// validating validateUsername
function validateUsername(user){
  const schema = {
      username: Joi.string().min(6).max(30).required(),
      id: Joi.number().min(1).required()
      
  };
  return Joi.validate(user, schema);
}