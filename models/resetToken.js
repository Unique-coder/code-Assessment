import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const resetTokenSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 1800, //Token expires in 3600 seconds,
    default: new Date(),
  },
});

resetTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

resetTokenSchema.methods.compareToken = async function (token) {
  const result = bcrypt.compareSync(token, this.token);
  return result;
};

export default mongoose.model("ResetToken", resetTokenSchema);
