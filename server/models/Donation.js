const { Schema, model } = require("mongoose");

const donationSchema = new Schema({
  donationAmount: {
    type: Number,
    required: true,
  },
  donatorName: {
    type: String,
  },
  isAnonymous: {
    type: Boolean,
  },
  stripePaymentInfo: {
    type: String,
    // need to research how payment system is added in and what info needs to pass back and forth
  },
  commentBody: {
    type: String,
    required: false,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  createdBy: {
    type: String,
    required: true,
    //only show this on front end if anonymousCheck is false
  },
  createdByID: {
     type: Schema.Types.ObjectId,
     ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Donation = model("Donation", donationSchema);

module.exports = Donation;
