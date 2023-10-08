const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
});
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  .eyJpZCI6IjY1MjI3YzNiMzBkMzQ0NzQ5YTg5M2M1NSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk2NzU4ODQzfQ
  .jNAlgqSQLurbsbbJO8fMdoQkENwYYrqFrMaXZnqSeAI;
const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model("Order", orderSchema);
