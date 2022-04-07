const mongoose = require("mongoose");
Schema = mongoose.Schema,
bcrypt = require('bcryptjs');

    // 2. Define the MongoDB schema for the people collection
    var RoleSchema  = new Schema({
        name     :   {type: String, required: 'role name cannot be empty'},
        isactive :   { type: Boolean, default: true },
        created_at:      {type: Date,default: Date.now()},
        roles:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        coach:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        athlete:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        program:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        package:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        sport:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        faq:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        testimonial:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        blog:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
        home:{
          add:{type:Boolean,default:false},
          edit:{type:Boolean,default:false},
          view:{type:Boolean,default:false},
          delete:{type:Boolean,default:false},
        },
      });

module.exports = mongoose.model('RoleType', RoleSchema);