import  Post from "../models/Post.js"
import User from "../models/User.js";


//  CREATE
export const createPost = async(req,res)=>{
    try{
      const{userId,description,picturePath} = req.body;
      const user = await User.findById(userId)
     
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newPost = new Post({
        userId,
        firstName : user.firstName,
        lastName : user.lastName,
        location : user.location,
        description,
        userPicturePath : user.picturePath,
        picturePath,
        likes :{},
        comments : [],
      })  
      await newPost.save();
      const post = await Post.find();
      res.status(201).json(post)
      
    }catch(err){
        res.status(409).json({message:err.message})
    }
};
// READ
// export const getFeedPosts = async(req,res)=>{
// try{
//     const post = await Post.find();
//     res.status(201).json(post)

// }catch(err)
// {
//     res.status(404).json({message:err.message})
// }
// };
export const getFeedPosts = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post); // Use HTTP status 200 for successful retrieval
    } catch (err) {
      res.status(404).json({ message: err.message }); // Consider using HTTP status 500 for server errors
    }
  };
  

export const getUserPosts = async(req,res)=>{
    try{
        const {userId} = req.params;
        const post = await Post.find({userId})
        res.status(200).json(post)

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

// UPDATE

export const likePost = async (req,res)=>{
    try{
      console.log('something')
        const {id} = req.params;//grabs particular user
        const {userId} = req.body;//grabs particular post
        const post = await Post.findById(id)
        const isLiked = await post.likes.get(userId)
        console.log(isLiked)

        if(isLiked)
        {
            post.likes.delete(userId)
        }
        else
        {
            post.likes.set(userId,true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes : post.likes},
            {new : true},
             
        )

        res.status(201).json(updatedPost)
    }
    
    catch(err){
      console.log(err)
        res.status(409).json({message:err.message})
    }
};
 



