const db = require('../models')
const HomeSliderImage = db.HomeSliderImage;

exports.createHomeSliderImage = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Note title can not be empty"
            });
        }
        else {
            const imageSlider = new HomeSliderImage({
                title: req.body.title,
                isactive: req.body.isactive,
                image: req.body.image != null ? req.body.image : ''
            })
            imageSlider.save().then(data => {

                res.send(
                    {
                        success: true,
                        message: "HomeSliderImage added successfully",
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


exports.updateHomeSliderImage = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "HomeSliderImage can not be empty"
        });
    }
    else {

        await HomeSliderImage.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : '',
        }).then(data => {
            res.status(200).send({
                "message": "HomeSliderImage Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid description ID"
            })
        });

    }
}

exports.getAllHomeSliderImages = async (req, res) => {
    try {
      
        const imageSliders = await HomeSliderImage.find();
        
        if (!imageSliders) {
            res.status(500).send({
                "message": "There are no HomeSliderImages"
            })
        } else {
            res.status(200).send({
                "data": imageSliders
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getSingleHomeSliderImage = async (req, res) => {
    try {
        await HomeSliderImage.findOne({ _id: req.params.id }).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "HomeSliderImage not found"
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

exports.deleteHomeSliderImage = async (req, res) => {
    try {
        //Delete HomeSliderImage
        await HomeSliderImage.findByIdAndRemove(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        success: false,
                        "message": "HomeSliderImage not found"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "HomeSliderImage deleted successfully."
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