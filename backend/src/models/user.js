const mongoose = require("mongoose");
const crypto = require("crypto");
const v4 = require("uuid").v4;

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        default: v4,
    },
    email: {
        type: String,
        trim: true,
        unique: [true, "Email already exists"],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please fill a valid email address",
        ],
        required: [true, "Email is required"],
    },
    created: {
        type: Date,
        default: Date.now,
    },
    resetPasswordEmailSent: {
        type: Number,
        default: Date.now,
    },
    resetToken: {
        type: String,
        default: "",
    },
    resetTokenExpiration: {
        type: String,
        default: "",
    },
    upadated: Date,
    hashed_password: {
        type: String,
        required: [true, "Password is required"],
    },
    salt: String,
    firstTime: {
        type: Boolean,
        default: true,
    },
});

// using function instead of arrow because of this keyword
UserSchema.virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },
};

UserSchema.path("hashed_password").validate(function() {
    if (this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.");
    }
    if (this.isNew && !this._password) {
        this.invalidate("password", "Password is required");
    }
}, null);

module.exports = mongoose.model("User", UserSchema);
