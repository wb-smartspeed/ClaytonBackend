const db = require('../models')
const HomeBanner = db.HomeBanner;
const HomeAbout = db.HomeAbout;
const HomeOffer = db.HomeOffer;
const HomeOfferImage1 = db.HomeOfferImage1;
const HomeOfferImage2 = db.HomeOfferImage2;
const HomeOfferImage3 = db.HomeOfferImage3;
const HomeOfferImage4 = db.HomeOfferImage4;
const HomeOfferImage5 = db.HomeOfferImage5;
const HomeOfferImage6 = db.HomeOfferImage6;
const HomeOfferImage7 = db.HomeOfferImage7;
const HomeOfferImage8 = db.HomeOfferImage8;
const HomeMakesDifferent = db.HomeMakesDifferent;
const HomeMakesDifferentImage = db.HomeMakesDifferentImage;
const HomeMakesDifferent1 = db.HomeMakesDifferent1;
const HomeMakesDifferent2 = db.HomeMakesDifferent2;
const HomeMakesDifferent3 = db.HomeMakesDifferent3;
const HomeMakesDifferent4 = db.HomeMakesDifferent4;

const HomeSlider = db.HomeSlider;
const HomeTimeline1 = db.HomeTimeline1;
const HomeTimeline2 = db.HomeTimeline2;
const HomeTimeline3 = db.HomeTimeline3;
const HomeTimeline4 = db.HomeTimeline4;
const SettingSocial = db.SettingSocial;
const SettingMetaTag = db.SettingMetaTag;


exports.createBanner = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let banner_result = await HomeBanner.findOne({});
            if (banner_result) {

                await HomeBanner.findOneAndUpdate({ _id: banner_result._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description,
                    image: req.body.image,
                }).then(data => {
                    res.status(200).send({
                        "message": "Banner Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid Banner ID"
                    })
                });
            }
            else {
                const banner = new HomeBanner({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description,
                    image: req.body.image
                })
                banner.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Banner added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                });
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateBanner = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeBanner.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            description: req.body.description,
            image: req.body.image,
        }).then(data => {
            res.status(200).send({
                "message": "Banner Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid Banner ID"
            })
        });
    }
}

exports.getSingleBanner = async (req, res) => {
    try {
        await HomeBanner.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no banner, Please add your first banner."
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



//Banner US Module

exports.createAbout = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_about = await HomeAbout.findOne({});
            if (get_about) {
                await HomeAbout.findOneAndUpdate({ _id: get_about._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                }).then(data => {
                    res.status(200).send({
                        "message": "About Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid About ID"
                    })
                });
            }
            else {
                const about = new HomeAbout({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description,
                    image: req.body.image

                })
                about.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "About added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateAbout = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeAbout.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            description: req.body.description
        }).then(data => {
            res.status(200).send({
                "message": "About Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid About ID"
            })
        });
    }
}

exports.getSingleAbout = async (req, res) => {
    try {
        await HomeAbout.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no About US, Please add your first banner."
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

// Offer Module


exports.createOffer = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer = await HomeOffer.findOne({});
            if (get_offer) {
                await HomeOffer.findOneAndUpdate({ _id: get_offer._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "Offer Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid Offer ID"
                    })
                });
            }
            else {
                const offer = new HomeOffer({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description,
                    image: req.body.image

                })
                offer.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Offer added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                });
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOffer = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOffer.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            description: req.body.description,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "Offer Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid Offer ID"
            })
        });
    }
}

exports.getSingleOffer = async (req, res) => {
    try {
        await HomeOffer.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Offer US, Please add your first banner."
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

//Offer Image 1 Module


exports.createOfferImage1 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image1 = await HomeOfferImage1.findOne({});

            if (get_offer_image1) {
                await HomeOfferImage1.findOneAndUpdate({ _id: get_offer_image1.id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage1 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage1 ID"
                    })
                });
            }
            else {
                const offer_image1 = new HomeOfferImage1({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image1.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage1 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage1 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage1.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage1 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage1 ID"
            })
        });
    }
}

exports.getSingleOfferImage1 = async (req, res) => {
    try {
        await HomeOfferImage1.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage1 US, Please add your first banner."
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

// Offer Image 2 Module


exports.createOfferImage2 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image2 = await HomeOfferImage2.findOne({});

            if (get_offer_image2) {
                await HomeOfferImage2.findOneAndUpdate({ _id: get_offer_image2._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage2 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage2 ID"
                    })
                });
            }
            else {
                const offer_image2 = new HomeOfferImage2({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image2.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage2 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage2 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage2.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage2 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage2 ID"
            })
        });
    }
}

exports.getSingleOfferImage2 = async (req, res) => {
    try {
        await HomeOfferImage2.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage2 US, Please add your first banner."
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

//Offer Image 3 Module


exports.createOfferImage3 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image3 = await HomeOfferImage3.findOne({});

            if (get_offer_image3) {
                await HomeOfferImage3.findOneAndUpdate({ _id: get_offer_image3._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage3 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage3 ID"
                    })
                });
            }
            else {
                const offer_image3 = new HomeOfferImage3({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image3.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage3 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage3 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage3.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage3 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage3 ID"
            })
        });
    }
}

exports.getSingleOfferImage3 = async (req, res) => {
    try {
        await HomeOfferImage3.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage3 US, Please add your first banner."
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

// Offer Image 4 Module


exports.createOfferImage4 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image4 = await HomeOfferImage4.findOne({});

            if (get_offer_image4) {
                await HomeOfferImage4.findOneAndUpdate({ _id: get_offer_image4._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage4 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage4 ID"
                    })
                });
            }
            else {
                const offer_image4 = new HomeOfferImage4({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image4.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage4 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage4 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage4.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage4 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage4 ID"
            })
        });
    }
}

exports.getSingleOfferImage4 = async (req, res) => {
    try {
        await HomeOfferImage4.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage4 US, Please add your first banner."
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

// Offer Image 5 Module


exports.createOfferImage5 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image5 = await HomeOfferImage5.findOne({});

            if (get_offer_image5) {
                await HomeOfferImage5.findOneAndUpdate({ _id: get_offer_image5._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage5 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage5 ID"
                    })
                });
            }
            else {
                const offer_image5 = new HomeOfferImage5({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image5.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage5 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage5 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage5.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage5 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage5 ID"
            })
        });
    }
}

exports.getSingleOfferImage5 = async (req, res) => {
    try {
        await HomeOfferImage5.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage5 US, Please add your first banner."
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

// Offer Image 6 Module


exports.createOfferImage6 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image6 = await HomeOfferImage6.findOne({});

            if (get_offer_image6) {
                await HomeOfferImage6.findOneAndUpdate({ _id: get_offer_image6._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage6 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage6 ID"
                    })
                });
            }
            else {
                const offer_image6 = new HomeOfferImage6({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image6.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage6 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage6 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage6.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage6 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage6 ID"
            })
        });
    }
}

exports.getSingleOfferImage6 = async (req, res) => {
    try {
        await HomeOfferImage6.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage6 US, Please add your first banner."
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

// Offer Image 7 Module


exports.createOfferImage7 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image7 = await HomeOfferImage7.findOne({});

            if (get_offer_image7) {
                await HomeOfferImage7.findOneAndUpdate({ _id: get_offer_image7._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage7 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage7 ID"
                    })
                });
            }
            else {
                const offer_image7 = new HomeOfferImage7({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image7.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage7 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                });
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage7 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage7.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage7 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage7 ID"
            })
        });
    }
}

exports.getSingleOfferImage7 = async (req, res) => {
    try {
        await HomeOfferImage7.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage7 US, Please add your first banner."
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

// Offer Image 8 Module


exports.createOfferImage8 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_offer_image8 = await HomeOfferImage8.findOne({});

            if (get_offer_image8) {
                await HomeOfferImage8.findOneAndUpdate({ _id: get_offer_image8._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                }).then(data => {
                    res.status(200).send({
                        "message": "OfferImage8 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid OfferImage8 ID"
                    })
                });
            }
            else {
                const offer_image8 = new HomeOfferImage8({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    image: req.body.image != null ? req.body.image : ''
                })
                offer_image8.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "OfferImage8 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updateOfferImage8 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title can not be empty"
        });
    }
    else {

        await HomeOfferImage8.findOneAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            isactive: req.body.isactive,
            image: req.body.image != null ? req.body.image : ''
        }).then(data => {
            res.status(200).send({
                "message": "OfferImage8 Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid OfferImage8 ID"
            })
        });
    }
}

exports.getSingleOfferImage8 = async (req, res) => {
    try {
        await HomeOfferImage8.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no OfferImage8 US, Please add your first banner."
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


// Makes Different Module

exports.createMakesDifferent = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_makes_different = await HomeMakesDifferent.findOne({});

            if (get_makes_different) {
                await HomeMakesDifferent.findOneAndUpdate({ _id: get_makes_different._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                }).then(data => {
                    res.status(200).send({
                        "message": "MakesDifferent Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid MakesDifferent ID"
                    })
                });
            }
            else {
                const makes_different = new HomeMakesDifferent({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                })
                makes_different.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "MakesDifferent added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

exports.getSingleMakesDifferent = async (req, res) => {
    try {
        await HomeMakesDifferent.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Makes Different, Please add your first."
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


// Makes Different Module

exports.createMakesDifferentImage = async (req, res) => {
    try {
        if (!req.body.image) {
            return res.status(400).send({
                message: "Image cannot be empty"
            });
        }
        else {

            let get_makes_different_Image = await HomeMakesDifferentImage.findOne({});

            if (get_makes_different_Image) {
                await HomeMakesDifferentImage.findOneAndUpdate({ _id: get_makes_different_Image._id }, {
                    image: req.body.image,
                    isactive: req.body.isactive
                }).then(data => {
                    res.status(200).send({
                        "message": "Images Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid MakesDifferentImage ID"
                    })
                });
            }
            else {
                const makes_different_image = new HomeMakesDifferentImage({
                    image: req.body.image,
                    isactive: req.body.isactive
                })
                makes_different_image.save().then(data => {
                    res.send(
                        {
                            success: true,
                            message: "Images added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

exports.getSingleMakesDifferentImage = async (req, res) => {
    try {
        await HomeMakesDifferentImage.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Makes Different Images, Please add your first."
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


// Makes Different 1 Module

exports.createMakesDifferent1 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_makes_different = await HomeMakesDifferent1.findOne({});

            if (get_makes_different) {
                await HomeMakesDifferent1.findOneAndUpdate({ _id: get_makes_different._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                }).then(data => {
                    res.status(200).send({
                        "message": "MakesDifferent1 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid MakesDifferent1 ID"
                    })
                });
            }
            else {
                const makes_different = new HomeMakesDifferent1({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                })
                makes_different.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "MakesDifferent1 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

exports.getSingleMakesDifferent1 = async (req, res) => {
    try {
        await HomeMakesDifferent1.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Makes Different, Please add your first."
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

// Makes Different 2 Module


exports.createMakesDifferent2 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_makes_different = await HomeMakesDifferent2.findOne({});

            if (get_makes_different) {
                await HomeMakesDifferent2.findOneAndUpdate({ _id: get_makes_different._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                }).then(data => {
                    res.status(200).send({
                        "message": "MakesDifferent2 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid MakesDifferent2 ID"
                    })
                });
            }
            else {
                const makes_different = new HomeMakesDifferent2({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                })
                makes_different.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "MakesDifferent2 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

exports.getSingleMakesDifferent2 = async (req, res) => {
    try {
        await HomeMakesDifferent2.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Makes Different, Please add your first."
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

// Makes Different 3 Module


exports.createMakesDifferent3 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_makes_different = await HomeMakesDifferent3.findOne({});

            if (get_makes_different) {
                await HomeMakesDifferent3.findOneAndUpdate({ _id: get_makes_different._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                }).then(data => {
                    res.status(200).send({
                        "message": "MakesDifferent3 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid MakesDifferent3 ID"
                    })
                });
            }
            else {
                const makes_different = new HomeMakesDifferent3({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                })
                makes_different.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "MakesDifferent3 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

exports.getSingleMakesDifferent3 = async (req, res) => {
    try {
        await HomeMakesDifferent3.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Makes Different, Please add your first."
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

// Makes Different 4 module


exports.createMakesDifferent4 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_makes_different = await HomeMakesDifferent4.findOne({});

            if (get_makes_different) {
                await HomeMakesDifferent4.findOneAndUpdate({ _id: get_makes_different._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                }).then(data => {
                    res.status(200).send({
                        "message": "MakesDifferent4 Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid MakesDifferent4 ID"
                    })
                });
            }
            else {
                const makes_different = new HomeMakesDifferent4({
                    title: req.body.title,
                    isactive: req.body.isactive,
                    description: req.body.description
                })
                makes_different.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "MakesDifferent4 added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}

exports.getSingleMakesDifferent4 = async (req, res) => {
    try {
        await HomeMakesDifferent4.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Makes Different, Please add your first."
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

// HomeSlider Module

exports.createHomeSlider= async(req,res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {
                const home_slider = new HomeSlider({
                    title: req.body.title,
                    isactive: req.body.isactive
                })
                home_slider.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Home Slider added successfully",
                            data: data
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


exports.getHomeSlider = async (req, res) => {
    try {
        await HomeSlider.find({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Home Slider, Please add your first."
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


exports.deleteHomeSlider=async(req,res)=>{
    try{
        //Delete FAQ
      await HomeSlider.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Homeslider not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Homeslider deleted successfully." });
            }
        }).catch(err=>{
            res.status(500).send({
                success:false,
                "message":"Something went wrong"
            })
        })
    }
    catch(err){
    res.status(400).send({  
                            success:false,
                            message: `Something is wrong with faq!`
                         });
                              return;
                            }
                        
                        };

// Timeline 1 Module

exports.createTimeline1= async(req,res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_home_timeline1 = await HomeTimeline1.findOne({});

            if (get_home_timeline1) {
                await HomeTimeline1.findOneAndUpdate({ _id: get_home_slider._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive
                }).then(data => {
                    res.status(200).send({
                        "message": "Home Slider Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid Home Slider ID"
                    })
                });
            }
            else {
                const home_timeline1 = new HomeTimeline1({
                    title: req.body.title,
                    isactive: req.body.isactive
                })
                home_timeline1.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Timeline added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.getSingleTimeline1 = async (req, res) => {
    try {
        await HomeTimeline1.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Timeline, Please add your first."
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

// Timeline 2 Module


exports.createTimeline2= async(req,res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_home_timeline2 = await HomeTimeline2.findOne({});

            if (get_home_timeline2) {
                await HomeTimeline2.findOneAndUpdate({ _id: get_home_slider._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive
                }).then(data => {
                    res.status(200).send({
                        "message": "Home Slider Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid Home Slider ID"
                    })
                });
            }
            else {
                const home_timeline1 = new HomeTimeline2({
                    title: req.body.title,
                    isactive: req.body.isactive
                })
                home_timeline1.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Timeline added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.getSingleTimeline2 = async (req, res) => {
    try {
        await HomeTimeline2.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Timeline, Please add your first."
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

// Timeline 3 Module

exports.createTimeline3= async(req,res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_home_timeline3 = await HomeTimeline3.findOne({});

            if (get_home_timeline3) {
                await HomeTimeline3.findOneAndUpdate({ _id: get_home_slider._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive
                }).then(data => {
                    res.status(200).send({
                        "message": "Timeline Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid Timeline ID"
                    })
                });
            }
            else {
                const home_timeline1 = new HomeTimeline3({
                    title: req.body.title,
                    isactive: req.body.isactive
                })
                home_timeline1.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Timeline added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.getSingleTimeline3 = async (req, res) => {
    try {
        await HomeTimeline3.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Timeline, Please add your first."
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

// Timeline 4 Module


exports.createTimeline4= async(req,res)=>{
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Title cannot be empty"
            });
        }
        else {

            let get_home_timeline4 = await HomeTimeline4.findOne({});

            if (get_home_timeline4) {
                await HomeTimeline4.findOneAndUpdate({ _id: get_home_slider._id }, {
                    title: req.body.title,
                    isactive: req.body.isactive
                }).then(data => {
                    res.status(200).send({
                        "message": "Timeline Detail Updated",
                        "data": data
                    })
                }).catch(ex => {
                    res.status(500).send({
                        "message": "Invalid Timeline ID"
                    })
                });
            }
            else {
                const home_timeline1 = new HomeTimeline4({
                    title: req.body.title,
                    isactive: req.body.isactive
                })
                home_timeline1.save().then(data => {

                    res.send(
                        {
                            success: true,
                            message: "Timeline added successfully",
                            "data": data
                        });
                }).catch(err => {
                    console.log("error" + err)
                    res.status(500).send(err)
                })
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.getSingleTimeline4 = async (req, res) => {
    try {
        await HomeTimeline4.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Timeline, Please add your first."
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
        });
    } catch (err) {
        res.status(500).send(err)
    }
}


  