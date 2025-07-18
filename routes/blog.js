
//[SECTION] Dependencies and Modules
const express = require("express");
const blogController = require("../controllers/blog");
const {verify, verifyAdmin} = require("../auth");

//[SECTION] Routing Component
const router = express.Router();


//[SECTION] Route for Adding a Blog
router.post("/addBlog", verify, blogController.addBlog)

//[SECTION] Route for Retrieving Blogs (Admin)
router.get("/getBlogs", verify, blogController.getAllBlogs)

//[SECTION] Route for Retrieving Blogs (User)
router.get("/getMyBlogs", verify, blogController.getAllMyBlogs)

//[SECTION] Route for Retrieving Blog By Id
router.get("/getBlog/:blogId", verify, blogController.getBlogById)

//[SECTION] Route for Updating Blog
router.patch("/updateBlog/:blogId", verify, blogController.updateBlog)
 
//[SECTION] Route for Deleting a Blog (Admin)
router.delete("/deleteBlog/:blogId", verify, verifyAdmin, blogController.deleteBlog)

//[SECTION] Route for Deleting a Blog (User)
router.delete("/deleteMyBlog/:blogId", verify, blogController.deleteMyBlog)

//[SECTION] Route for Deleting a Comment
router.delete("/deleteComment/:blogId/:commentId", verify, verifyAdmin, blogController.removeComment);

//[SECTION] Route for Adding a Comment
router.patch("/addComment/:blogId", verify, blogController.addBlogComment)

//[SECTION] Route for Retrieving Comments
router.get("/getComments/:blogId", verify, blogController.getBlogComments)



module.exports = router;