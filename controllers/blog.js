import Joi from 'joi';
/* eslint linebreak-style: ["error", "windows"] */
import queryblog from '../database/blogquery';

export default class Post {
  // query all posts from the database
  static getAllPosts(req, res) {
    queryblog.getAll().then((posts) => {
      res.render('posts', { posts: posts, user: req.user});      
    });
  }

  // query one post from the database
  static getOnePost(req, res) {
    const id = parseInt(req.params.id);
    queryblog
      .getOne(id)
      .then(post => {
        if(post){
        res.render('post', {post:post,layout: false})
        }else{
          res.render('post', {error:true,layout: false})
        }
      })
      .catch((err) => {
        res.json({
          message: 'invalid id',
          err,
        });
      });
  }

  // publish a new post by setting publish property to true
  static publishPost(req, res) {
    queryblog
      .publish(req.params.id, req.body)
      .then(() => queryblog.getOne(req.params.id))
      .then(post => res.status(200).json(post));
  }
  
  // update post info
  static updatePost(req, res) {
    const {error} = validatePostOnUpdate(req.body);
    console.log(error);
    if(error){
        res.status(400).json({error: error.details[0].message});
        return;
    }   
    const post = {
        id: req.body.id,
        title: req.body.title,
        summary: req.body.summary,
        content: req.body.content
    }
    queryblog
      .update(post)
      .then(post => {
        res.status(200).send({
          error:false,
          id: post.id,
          message: "Post updated successfully"
        })
      })
      .catch((err) => {
        res.status(302).send({
          error:true,
          id: post.id,
          message:err,
        })
      });
  }

  // create post
  static createPost(req, res) {
    // const {error} = validatePostOnCreate(req.body);
    // if(error){
    //     res.status(400).send({error: error.details[0].message});
    //     return;
    // }   
    // console.log(error);
    const post = {
        title: req.body.title,
        logo: "https://via.placeholder.com/400x300.png?text=KIGALI",
        state:"draft"
    }
    queryblog
      .create(post)
      .then((post) => res.status(200).send({
        error:false,
        message: "Post updated successfully"
      })  
      )    
      .catch((error) => {
        res.status(301).send({
          error:true,
          id: post.id,
          message:err,
        })
      });
  }

  static deleteBlogPost(req, res) {
    queryblog
      .getOne(req.params.id)
      .then((post) => {
        queryblog.deletePost(req.params.id).then(() => res.status(200).json({
          message: 'Post deleted',
          post,
        }));
      })
      .catch((error) => {
        if (error.routine === 'pg_atoi') {
          res.status(402).json({
            message: 'invalid id type',
          });
        }
      });
  }

  // public api
  static getPublicAllPosts(req, res){
    queryblog
    .getPulicAll()
    .then((posts) => {
      res.status(200).send({
        posts: posts
      });      
    })
    .catch((err) => {
      res
      .status(500)
      .send({
        error:false,
        message:err
      });
    });
  }
  
  // query one post from the database
  static getPublicOnePost(req, res) {
    const id = parseInt(req.params.id);
    queryblog
      .getPublicOne(id)
      .then(post => {
        const topics = ['Politic','Music','Sport'];
        if(post){
          res.status(200)
          .send({
            post:post,
            topics:topics
          })
        }else{
          res
          .send({
            error:true,
            message:"We can not find the post you are looking for!"
          })
        }
      })
      .catch((err) => {
        res.send({
          message: 'invalid id',
          err,
        });
      });
  }
}

function validatePostOnUpdate(post){
  const schema = {
    id: Joi.number().required(),
    title: Joi.string().min(3).max(120),
    summary: Joi.string().min(10).max(120),
    content: Joi.string().min(5).max(12000),
  };
  return Joi.validate(post, schema);
}

// function validatePostOnCreate(post){
//   const schema = {
//     title: Joi.string().min(3).max(120),
//     // created_at: Joi.date()
//   };
//   return Joi.validate(post, schema);
// }