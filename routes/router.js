/* eslint linebreak-style: ["error", "windows"] */
import express from 'express';
import Post from '../controllers/blog';
import User from '../controllers/user';
import Mailer from '../controllers/mailer'; 

import passport  from 'passport';

import passportSetup from '../config/passport-setup';

const router = express.Router();

// check auth
import verifyAuth from '../middleware/verifyAuth';

// check if auth
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/login');    
  } else {
    next();
  }
};
// is auth
const isAuth = (req, res, next) => {
  if (req.user) {
    res.redirect('/me');    
  } else {
    next();
  }
};

router.get('/', (req, res, next) => {
  res.render('index', { user: req.user});
});

//* ** GET all posts *** //
router.get('/posts', authCheck, Post.getAllPosts);

//* ** GET single posts *** //
router.get('/posts/:id', Post.getOnePost);

//* ** Create a new posts *** //
router.post('/posts', Post.createPost);

//* ** Publish a post *** //
router.put('/api/v1/posts/:id/publish', Post.publishPost);

//* ** Update post *** //
router.put('/posts', Post.updatePost);

//* ** UnPublish a post *** //
router.put('/api/v1/posts/:id/unpublish', Post.publishPost);

//* ** delete a post *** //
router.delete('/api/v1/posts/:id', Post.deleteBlogPost);

//* ** GET all users *** //
router.get('/api/v1/users', User.getAllUsers);

//* ** Sign up new user*** //
router.post('/api/v1/signup', User.createUser);

//* ** Login *** //
router.post('/api/v1/login', User.login);

//* ** send email *** //
router.post('/api/v1/mailer', Mailer.test);

//* ** Protected Route ** *//
router.get('/api/v1/protected', verifyAuth, (req, res) => {  
  res.send({
    message: "protected"
  })
})

//Passport
router.get('/login', (req, res) =>{
  res.render('login');
});
// google
router.get('/google', isAuth, passport.authenticate('google', {
  scope: ['profile','email']
}));

router.get('/me', authCheck, (req, res) => {
  res.render('profile', { user: req.user});
});
//callback route for google to redirect to 
router.get('/auth/google/redirect', passport.authenticate('google'),  (req, res) => {
  res.redirect('/me');
});
// logout
router.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/login');
});

// user information, update username

//* ** UnPublish a post *** //
router.post('/api/v1/users/:id/username', authCheck, User.setUsername );


// admin


export default router;
