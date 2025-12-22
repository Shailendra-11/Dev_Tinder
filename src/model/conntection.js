const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
     {
          fromUserId: {
               type: mongoose.Schema.Types.ObjectId,
               require: true,
          },
          toUserId: {
               type: mongoose.Schema.Types.ObjectId,
               required: true,
          },
          status: {
               type: String,
               required: true,
               enum: {
                  values : ["ignored" ,"accepted" , "reject" , "intrested"],
                  message : `{values} is incorrect status type`
               }
          },

     },
     {
          timestamps: true,
     }
)