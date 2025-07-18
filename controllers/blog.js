
//[SECTION] Dependencies and Modules
const User = require('../models/User');
const Blog = require("../models/Blog");
const auth = require('../auth');

const { errorHandler } = auth;


// [SECTION] Create Blog
module.exports.addBlog = (req, res) => {
  return User.findById(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: user.username 
      });

      return newBlog.save();
    })
    .then(blog => res.status(201).send(blog))
    .catch(error => errorHandler(error, req, res));
};



// [SECTION] Retrieve Blogs
module.exports.getAllBlogs = (req, res) => {

	return Blog.find({})
	.then(blogs => {
		if(!blogs) {
			res.status(404).send({ error: 'No blogs found' });
		} else{
			res.status(200).send({ blogs });
		}
	})
	.catch(error => errorHandler(error, req, res));
};


// [SECTION] Retrieve My Blogs
module.exports.getAllMyBlogs = (req, res) => {
	const username = req.user.username; 

	return Blog.find({ author: username })
		.then(blogs => {
			if (!blogs || blogs.length === 0) {
				return res.status(404).send({ error: 'No blogs found for this user' });
			} else {
				return res.status(200).send({ blogs });
			}
		})
		.catch(error => errorHandler(error, req, res));
};



// [SECTION] Retrieve Blog By Id
module.exports.getBlogById = (req, res) => {

	return Blog.findById(req.params.blogId)
	.then(blog => {
		if(!blog) {
			res.status(404).send({ error: 'Blog not found' });
		} else{
			res.status(200).send(blog);
		}
	})
	.catch(error => errorHandler(error, req, res));
};


// [SECTION] Update Blog
module.exports.updateBlog = (req, res) => {

    let updatedBlog = {
        title: req.body.title,
		content : req.body.content
    };

    return Blog.findByIdAndUpdate(req.params.blogId, updatedBlog, { new: true })
    .then(blog => {
        if (blog) {
            res.status(200).send({ 
                message: 'Blog updated successfully', 
                updatedBlog: blog  
            });
        } else {
            res.status(404).send({ error: 'Blog not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};



// [SECTION] Delete Blog
module.exports.deleteBlog = (req, res) => {

	return Blog.deleteOne({ _id: req.params.blogId })
	.then((deleteStatus) => {
		if (deleteStatus.deletedCount === 1) {
			res.status(200).send({ message: 'Blog deleted successfully' });
		} else {
			res.status(404).send({ error: 'Blog not found' });
		}
	})
	.catch(error => errorHandler(error, req, res));
};


// [SECTION] Delete My Blog
module.exports.deleteMyBlog = (req, res) => {
	const username = req.user.username;
	const blogId = req.params.blogId;

	return Blog.deleteOne({ _id: blogId, author: username })
		.then((deleteStatus) => {
			if (deleteStatus.deletedCount === 1) {
				res.status(200).send({ message: 'Blog deleted successfully' });
			} else {
				res.status(404).send({ error: 'Blog not found or you are not the author' });
			}
		})
		.catch(error => errorHandler(error, req, res));
};



// [SECTION] Create Comment
module.exports.addBlogComment = (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }

      const comment = {
        username: user.username, 
        comment: req.body.comment
      };

      return Blog.findByIdAndUpdate(
        req.params.blogId,
        { $push: { comments: comment } },
        { new: true }
      );
    })
    .then(blog => {
      if (!blog) {
        return res.status(404).send({ error: 'Blog not found' });
      }

      res.status(200).send({
        message: 'Comment added successfully',
        updatedBlog: blog
      });
    })
    .catch(error => errorHandler(error, req, res));
};



// [SECTION] Retrieve Comments
module.exports.getBlogComments = (req, res) => {

	return Blog.findById(req.params.blogId)
	.then(blog => {
		if(!blog) {
			res.status(404).send({ error: 'Blog not found' });
		} else{
			res.status(200).send({ comments: blog.comments });
		}
	})
	.catch(error => errorHandler(error, req, res));
};


// [SECTION] Remove a Comment
module.exports.removeComment = (req, res) => {

	return Blog.findById(req.params.blogId)
	.then(blog => {
		if (!blog) {
			return res.status(404).send({ error: 'Blog not found' });
		}
            blog.comments = blog.comments.filter(comment => comment._id.toString() !== req.params.commentId);

            return blog.save();
        })
	.then(updatedBlog => {
		res.status(200).send({ message: 'Comment removed successfully', comments: updatedBlog.comments });
	})
	.catch(error => {
		console.error('Error removing comment:', error);
		res.status(500).send({ error: 'Something went wrong while removing the comment' });
	});
};
