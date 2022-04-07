const db = require('../models')
const Blog = db.Blog;

exports.createBlog = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
            const blog = new Blog({
                title: req.body.title,
                isactive: req.body.isactive,
                description: req.body.description,
                image: req.body.image != null ? req.body.image : ''

            })
            blog.save().then(data => {

                res.send(
                    {
                        success: true,
                        message: "Blog added successfully",
                        "data": data
                    });
            }).catch(err => {
                console.log("error" + err)
                res.status(500).send(err)
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateBlog = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Blog can not be empty"
        });
    }
    else {

        await Blog.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            description: req.body.description,
            image: req.body.image != null ? req.body.image : '',
        }).then(data => {
            res.status(200).send({
                "message": "Blog Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid description ID"
            })
        });

    }
}

exports.getAllBlogs = async (req, res) => {
    try {
      
        const blogs = await Blog.find({ isactive: true });
        
        if (!blogs) {
            res.status(500).send({
                "message": "There are no Blogs"
            })
        } else {
            res.status(200).send({
                "data": blogs
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getSingleBlog = async (req, res) => {
    try {
        await Blog.findOne({ _id: req.params.id }).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "Blog not found"
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: data
                });
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                "message": "Something went wrong"
            })
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        //Delete Blog
        await Blog.findByIdAndRemove(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        success: false,
                        "message": "Blog not found"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Blog deleted successfully."
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    "message": "Something went wrong"
                })
            })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: `Something is wrong with description!`
        });
        return;
    }

};