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
const User =db.User;
const RoleType = db.RoleType;
const Blog=db.Blog;
const Testimonial=db.Testimonial;
const Pricing=db.Pricing;
const FAQ=db.FAQ;
const HomeSliderImage = db.HomeSliderImage;
const SettingSocial = db.SettingSocial;
const SettingMetaTag = db.SettingMetaTag;
const Logo=db.Logo;


exports.getHomePage = async (req, res) => {

    try {

        var getBanner = await HomeBanner.findOne({ isactive: true });
        var getHomeAbout = await HomeAbout.findOne({ isactive: true });
        var getHomeOffer = await HomeOffer.findOne({ isactive: true });
        var getHomeOfferImage1 = await HomeOfferImage1.findOne({ isactive: true });
        var getHomeOfferImage2 = await HomeOfferImage2.findOne({ isactive: true });
        var getHomeOfferImage3 = await HomeOfferImage3.findOne({ isactive: true });
        var getHomeOfferImage4 = await HomeOfferImage4.findOne({ isactive: true });
        var getHomeOfferImage5 = await HomeOfferImage5.findOne({ isactive: true });
        var getHomeOfferImage6 = await HomeOfferImage6.findOne({ isactive: true });
        var getHomeOfferImage7 = await HomeOfferImage7.findOne({ isactive: true });
        var getHomeOfferImage8 = await HomeOfferImage8.findOne({ isactive: true });
        var getHomeMakesDifferent = await HomeMakesDifferent.findOne({ isactive: true });
        var getHomeMakesDifferentImage = await HomeMakesDifferentImage.findOne({ isactive: true });
        var getHomeMakesDifferent1 = await HomeMakesDifferent1.findOne({ isactive: true });
        var getHomeMakesDifferent2 = await HomeMakesDifferent2.findOne({ isactive: true });
        var getHomeMakesDifferent3 = await HomeMakesDifferent3.findOne({ isactive: true });
        var getHomeMakesDifferent4 = await HomeMakesDifferent4.findOne({ isactive: true });
        var getHomeSlider = await HomeSlider.findOne({ isactive: true });
        var getHomeTimeline1 = await HomeTimeline1.findOne({ isactive: true });
        var getHomeTimeline2 = await HomeTimeline2.findOne({ isactive: true });
        var getHomeTimeline3 = await HomeTimeline3.findOne({ isactive: true });
        var getHomeTimeline4 = await HomeTimeline4.findOne({ isactive: true });

        res.status(200).json({
            data: {
                Banner: getBanner,
                HomeAbout: getHomeAbout,
                HomeOffer: getHomeOffer,
                HomeOfferImage1: getHomeOfferImage1,
                HomeOfferImage2: getHomeOfferImage2,
                HomeOfferImage3: getHomeOfferImage3,
                HomeOfferImage4: getHomeOfferImage4,
                HomeOfferImage5: getHomeOfferImage5,
                HomeOfferImage6: getHomeOfferImage6,
                HomeOfferImage7: getHomeOfferImage7,
                HomeOfferImage8: getHomeOfferImage8,
                HomeMakesDifferent: getHomeMakesDifferent,
                HomeMakesDifferentImage:getHomeMakesDifferentImage,
                HomeMakesDifferent1: getHomeMakesDifferent1,
                HomeMakesDifferent2: getHomeMakesDifferent2,
                HomeMakesDifferent3: getHomeMakesDifferent3,
                HomeMakesDifferent4: getHomeMakesDifferent4,
                HomeSlider: getHomeSlider,
                HomeTimeline1: getHomeTimeline1,
                HomeTimeline2: getHomeTimeline2,
                HomeTimeline3: getHomeTimeline3,
                HomeTimeline4: getHomeTimeline4,
            }
        });

    }
    catch (err) {
        console.log(err);
    }
};

exports.getCoaches = async (rq, res) => {
try{
    const roleObject=await RoleType.findOne({name:"Coach"});
    const users = await User.find({
        role:roleObject._id,
        active:true
      }).sort('-created_at').populate("sports")
      .exec(function(err, data) {
        res.status(200).json({
            data: data.map(function (value) {
              return {
                id: value._id,
                name: value.name,
                email: value.email,
                sports:value.sports? {
                    id:value.sports.id,
                    name:value.sports.name
                  }:{},
                  profile_pic:value.profile_pic!=null?value.profile_pic:'',
                  gender:value.gender!=null?value.gender:'',
                  contact:value.contact,
                  biography:value.biography!=null?value.biography:"",
                  skills:value.skills
              }
            })
        })
    });
}
catch(err){
    console.log(err);
}
};

exports.getCoachUser = async (req, res, next) => {
    try {
     const userId = req.params.id;
     const user = await User.findById(userId).populate('role').populate("sports")
     .exec((err, user) => {
       if (err) {
         res.status(500).send({ message: err });
         return;
       }

       if (!user) return next( res.status(401).json({
        message: 'user does not exist'
       }));
        res.status(200).json({
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt:user.createdAt,
          username:user.username,
          role:user.role? {
            id:user.role.id,
            name:user.role.name
          }:{},
          sports:user.sports? {
            id:user.sports.id,
            name:user.sports.name
          }:{},
          profile_pic:user.profile_pic!=null?user.profile_pic:'',
          gender:user.gender!=null?user.gender:'',
          contact:user.contact,
          biography:user.biography!=null?user.biography:"",
          skills:user.skills
      }
       });
      });
     
    } catch (error) {
     next(error)
    }
   }

exports.getAllBlogs= async (req,res)=>{
    try{
        const blogs = await Blog.find({ isactive: true })
        if(!blogs){
            res.status(500).send({
                "message": "There are no Blogs"
            })
        } else {
            res.status(200).send({
                data: blogs.map(function (value) {
                    return {
                      id: value._id,
                      title: value.title,
                      description: value.description,
                      image:value.image!=null?value.image:''
                    }
                  })
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
};


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
                    data: {
                        _id:data._id,
                        title:data.title,
                        description:data.description,
                        image:data.image!=null?data.image:''
                    }
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



exports.getAllTestimonials= async (req,res)=>{
    try{
        const testimonials = await Testimonial.find({isactive:true})
        if(!testimonials){
            res.status(500).send({
                "message":"There are no Testimonials"
            })
        } else {
            res.status(200).send({
                data: testimonials.map(function (value) {
                    return {
                      id: value._id,
                      name: value.name,
                      testimonial: value.testimonial,
                      image:value.image!=null?value.image:''
                    }
                  })
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getAllPricings= async (req,res)=>{
    try{
        const pricings = await Pricing.find({isactive:true})
        if(!pricings){
            res.status(500).send({
                "message":"There are no pricings"
            })
        } else {
            res.status(200).send({
                data: pricings.map(function (value) {
                    return {
                      id: value._id,
                      title: value.title,
                      description: value.description,
                      price:value.price,
                      plan_id:value.plan_id
                    }
                  })
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getAllFAQs= async (req,res)=>{
    try{
        const faq = await FAQ.find({isactive:true})
        if(!faq){
            res.status(500).send({
                "message":"There are no FAQs"
            })
        } else {
            res.status(200).send({
                "data": faq
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getAllHomeSliderImage= async (req,res)=>{
    try{
        const sliders = await HomeSliderImage.find({ isactive: true })
        if(!sliders){
            res.status(500).send({
                "message": "There are no slider images"
            })
        } else {
            res.status(200).send({
                data: sliders.map(function (value) {
                    return {
                      id: value._id,
                      title: value.title,
                      image:value.image!=null?value.image:''
                    }
                  })
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
};


exports.getSingleMetaTag = async (req, res) => {
    try {
        await SettingMetaTag.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Metatags, Please add your first."
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
};


exports.getSingleSocial = async (req, res) => {
    try {
      await SettingSocial.findOne({})
        .then((data) => {
          if (!data) {
            res.status(404).send({
              success: false,
              message: "There is no Soacials, Please add your first.",
            });
          } else {
            res.status(200).send({
              success: true,
              data: data,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Something went wrong",
          });
        });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  
  exports.getSingleLogo = async (req, res) => {
    try {
        await Logo.findOne({}).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "There is no Logo, Please add your first."
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