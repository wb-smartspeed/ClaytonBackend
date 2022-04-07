const db = require('../models')
const RoleType = db.RoleType;
const User = db.User;


exports.createRole = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    else {
        var isRoleExist = await RoleType.findOne({
            name: req.body.name,
            isactive: true
        })

        if (!isRoleExist) {
            const role = new RoleType({
                name: req.body.name,
                isactive: true,
                roles: {
                    add:  req.body.roles?req.body.roles.add:false,
                    edit: req.body.roles? req.body.roles.edit:false,
                    view:  req.body.roles?req.body.roles.view:false,
                    delete:  req.body.roles?req.body.roles.delete:false,
                },
                coach: {
                    add:req.body.coach? req.body.coach.add:false,
                    edit:req.body.coach? req.body.coach.edit:false,
                    view:req.body.coach? req.body.coach.view:false,
                    delete:req.body.coach? req.body.coach.delete:false,
                },
                athlete: {
                    add: req.body.athlete? req.body.athlete.add:false,
                    edit: req.body.athlete? req.body.athlete.edit:false,
                    view: req.body.athlete? req.body.athlete.view:false,
                    delete:req.body.athlete?  req.body.athlete.delete:false,
                },
                program: {
                    add: req.body.program?req.body.program.add:false,
                    edit:req.body.program? req.body.program.edit:false,
                    view:req.body.program? req.body.program.view:false,
                    delete: req.body.program?req.body.program.delete:false,
                }, package: {
                    add:req.body.package? req.body.package.add:false,
                    edit:req.body.package? req.body.package.edit:false,
                    view:req.body.package? req.body.package.view:false,
                    delete:req.body.package? req.body.package.delete:false,
                }, sport: {
                    add:req.body.sport? req.body.sport.add:false,
                    edit:req.body.sport? req.body.sport.edit:false,
                    view:req.body.sport?  req.body.sport.view:false,
                    delete:req.body.sport?  req.body.sport.delete:false,
                }, faq: {
                    add: req.body.faq? req.body.faq.add:false,
                    edit: req.body.faq?req.body.faq.edit:false,
                    view: req.body.faq?req.body.faq.view:false,
                    delete:req.body.faq? req.body.faq.delete:false,
                }, testimonial: {
                    add: req.body.testimonial? req.body.testimonial.add:false,
                    edit:req.body.testimonial? req.body.testimonial.edit:false,
                    view:req.body.testimonial? req.body.testimonial.view:false,
                    delete:req.body.testimonial? req.body.testimonial.delete:false,
                },
                blog: {
                    add: req.body.blog? req.body.blog.add:false,
                    edit: req.body.blog? req.body.blog.edit:false,
                    view:  req.body.blog?req.body.blog.view:false,
                    delete:req.body.blog? req.body.blog.delete:false,
                },
                home: {
                    add: req.body.home? req.body.home.add:false,
                    edit:req.body.home? req.body.home.edit:false,
                    view: req.body.home?req.body.home.view:false,
                    delete:req.body.home? req.body.home.delete:false,
                },
                query: {
                    add: req.body.query ? req.body.query.add : false,
                    edit: req.body.query ? req.body.query.edit : false,
                    view: req.body.query ? req.body.query.view : false,
                    delete: req.body.query ? req.body.query.delete : false,
                }
            })
            role.save().then(data => {
                res.send({
                    "message": "Role added successfully",
                    "data": data
                })
            }).catch(err => {
                res.status(500).send(err)
            })
        }
        else {
            res.send({
                "message": "Role already exist!"
            })
        }

    }
}

exports.updateRole = async (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Role can not be empty"
        });
    }
    else {
        await RoleType.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            isactive: req.body.isactive,
            roles: {
                add: req.body.roles.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.roles.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.roles.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.roles.delete == true ? "Allowed" : "NotAllowed",
            },
            coach: {
                add: req.body.coach.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.coach.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.coach.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.coach.delete == true ? "Allowed" : "NotAllowed",
            },
            athlete: {
                add: req.body.athlete.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.athlete.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.athlete.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.athlete.delete == true ? "Allowed" : "NotAllowed",
            },
            program: {
                add: req.body.program.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.program.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.program.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.program.delete == true ? "Allowed" : "NotAllowed",
            }, package: {
                add: user.role.package.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.package.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.package.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.package.delete == true ? "Allowed" : "NotAllowed",
            }, sport: {
                add: req.body.sport.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.sport.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.sport.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.sport.delete == true ? "Allowed" : "NotAllowed",
            }, faq: {
                add: req.body.faq.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.faq.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.faq.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.faq.delete == true ? "Allowed" : "NotAllowed",
            }, testimonial: {
                add: req.body.testimonial.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.testimonial.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.testimonial.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.testimonial.delete == true ? "Allowed" : "NotAllowed",
            },
            blog: {
                add: req.body.blog.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.blog.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.blog.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.blog.delete == true ? "Allowed" : "NotAllowed",
            },
            home: {
                add: req.body.home.add == true ? "Allowed" : "NotAllowed",
                edit: req.body.home.edit == true ? "Allowed" : "NotAllowed",
                view: req.body.home.view == true ? "Allowed" : "NotAllowed",
                delete: req.body.home.delete == true ? "Allowed" : "NotAllowed",
            },
            query: {
                add: req.body.query ? req.body.query.add : false,
                edit: req.body.query ? req.body.query.edit : false,
                view: req.body.query ? req.body.query.view : false,
                delete: req.body.query ? req.body.query.delete : false,
            }
        }).then(data => {
            res.status(200).send({
                "message": "Role Detail Updated",
                "data": req.body
            })
        }).catch(ex => {
            winston.debug(`Invalid role id ${ex}`)
            res.status(500).send({
                "message": "Invalid role ID"
            })
        })
    }
}

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await RoleType.find().sort({ created_at: -1 })
        if (!roles) {
            res.status(500).send({
                "message": "There are no roles"
            })
        } else {
            res.status(200).send({
                "data": roles
            })
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getSingleRole = async (req, res) => {
    try {
        await RoleType.findOne({ _id: req.params.id }).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "Role not found"
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

exports.deleteRole = async (req, res) => {
    try {
        // check this role exist or not for user
        User.findOne({
            role: req.params.id
        }).exec((err, role) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    message: `Something is wrong with role!`
                });
                return;
            }

            if (role) {
                res.status(400).send({
                    success: false,
                    message: "Sorry, we are already using this role for user."
                });
                return;
            }

            // Delete Role
            RoleType.findByIdAndRemove(req.params.id)
                .then(role => {
                    if (!role) {
                        res.status(404).send({
                            success: false,
                            "message": "Role not found"
                        })
                    } else {
                        res.status(200).send({
                            success: true,
                            message: "Role deleted successfully."
                        });
                    }
                }).catch(err => {
                    res.status(500).send({
                        success: false,
                        "message": "Something went wrong"
                    })
                })
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: `Something is wrong with role!`
        });
        return;
    }
};