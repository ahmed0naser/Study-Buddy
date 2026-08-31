import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
userSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return;
    else {
        this.password = await bcrypt.hash(this.password, 12);
        return;
    }
});
userSchema.method("correctPassword", async function (loggedpass, correctPass) {
    return await bcrypt.compare(loggedpass, correctPass);
});
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map