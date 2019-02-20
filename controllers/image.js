import queryblog from '../database/blogquery';
import path from 'path';
export default class Image {

  // create post
  static uploadImage(req, res) {
    if(req.files.upfile){
      const file = req.files.upfile;
      if(file.size < 1024){
        res.send("Image selected is too big, it must be less than 1MB");
      }else{
        if(
          file.mimetype === 'image/jpeg' || 
          file.mimetype === 'image/jpg' || 
          file.mimetype === 'image/png'
        ){
        const name = file.name;
        var uploadpath = path.join('public') + '/uploads/' + name;
        file.mv(uploadpath,function(err){
          if(err){
            res.status(301).send("Whoooch, Error Occured!");
          }
          else {
            const image = {
              logo: name,
              id:req.params.id
            }
            queryblog
            .updateLogoPost(image)
            .then((image) => res.status(200).send('Post updated successfully')
            )  
            .catch((error) => {
              res.status(301).send(err)
            });
          }
        });
        }else{
          res.status(301).send('Unkonwn image format. Please only consider image with .jpeg, .jpg or .png  extention')
        }
      }
    }
    else {
      res.send("No File selected!");
      res.end();
    };
  }

}
