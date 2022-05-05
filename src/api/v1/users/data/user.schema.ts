import * as bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { ApplicationModules } from 'src/common/enums';

export const UserCollectionName = ApplicationModules.USERS;

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Do not return password in response.
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on .create() and .save() and not .findOneAndUpdate()
        // If this has to be used on update, use separate methods for find and update
        validator: function (pwConfirmValue) {
          return pwConfirmValue === this.password;
        },
        message: 'Passwords do not match!',
      },
    },
    isActive: Boolean,
  },
  {
    collection: UserCollectionName,
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  // isModified is a method from mongoose available for all documents
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12 that indicates how CPU intensive this process will be
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field as it's not needed to be saved in DB after the same password's validation in model
  this.passwordConfirm = undefined;
  next();
});
