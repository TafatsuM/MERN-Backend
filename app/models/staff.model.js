const mongoose = require('mongoose');

const schemaStaff = new mongoose.Schema(
      {	
        name:String,
        email:String,
        phone:Number,
        position:String,
        department:String,
        jobTitle: String,
        additionalInfo: String,
        isActive: Boolean
      },
      { timestamps: true }
    );
    schemaStaff.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });

    const Staff  = mongoose.model("staff", schemaStaff);
    module.exports = Staff;
  
