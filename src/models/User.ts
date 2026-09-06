import mongoose from "mongoose";
import bcrypt from "bcrypt";
interface IUser {
  _id: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
}
interface IUserMethods {
  correctPassword(
    loggedPassword: string,
    userPassword: string,
  ): Promise<boolean>;
}
export type UserDocument = IUser & IUserMethods;
const userSchema = new mongoose.Schema<UserDocument>(
  {
    userName: {
      type: String,
      required: [true, "user name must be provided"],
    },
    email: {
      type: String,
      required: [true, "email must be provided"],
      unique: true,
      lowercase: true,
      //validate later
    },
    password: {
      type: String,
      required: [true, "password must be provided"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.correctPassword = async function (
  loggedpass: string,
  correctPass: string,
) {
  return await bcrypt.compare(loggedpass, correctPass);
};

export const User = mongoose.model<UserDocument>("User", userSchema);
