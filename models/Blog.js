
const mongoose = require('mongoose');

 
	const blogSchema = new mongoose.Schema({

		title: {
			type: String,
			required: [true, 'Title is required']
		},
		content: {
			type: String,
			required: [true, 'Content is required']
		},
		author: {
			type: String,
			required: [true, 'Author is required']
		},
		createdOn: {
			type: Date,
			default: Date.now
		},
		comments: [
        {
            username: {
                type: String,
                required: [true, 'Username is Required.']
            },
            comment: {
                type: String,
                required: [true, 'Comment is Required.']
            }
        }
    ]
	});


module.exports = mongoose.model('Blog', blogSchema);