/* eslint linebreak-style: ["error", "windows"] */
import knex from './knex';

// this is to get blog column from the db
function Posts() {
  return knex('blog');
}
// this to fetch all posts from the db
const getAll = () => Posts().select()
  .orderBy('id', 'desc')
;


// this is to get one post from the db
const getOne = id => Posts()
  .where('id',id)
  .first();

// publish newly created post
const publish = (blogID, updates) => Posts()
  .where('id', parseInt(blogID))
  .update(updates);

// update post
const update = (post) => Posts()
  .where('id', post.id)
  .update(post);

// create a new blog post
const create = blog => Posts()
.insert(blog, ['id','title']);

const deletePost = blogID => Posts()
  .where('id', parseInt(blogID))
  .del();

// Public API Query
const getPulicAll = () => Posts()
  .select()
  .column('id','title','summary','content','logo','state','created_at')
  // .where('state','online')
  .orderBy('id', 'desc')
;
const getPublicOne = id => Posts()
  .where('id', id)
  .column('id','title','summary','content','logo','state','created_at')
  .first();
// #END Public API Query
module.exports = {
  getAll,
  getOne,
  publish,
  create,
  deletePost,
  update,
  getPulicAll,
  getPublicOne,
};
