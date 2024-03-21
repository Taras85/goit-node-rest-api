import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
dotenv.config();
const { SECRET_KEY } = process.env;

import HttpError from "../helpers/HttpError.js";

import {
  findOneUser,
  loginUser,
  logoutUser,
  registerUser,
  updateAvatar,
  updateSubscription,
} from "../services/authServices.js";
import path from "path";
import fs from "fs/promises";

const avatarsDir = path.resolve("public", "avatars");


export const register = async (req, res, next) => {
  
  try {
    const { path: tempUpload, originalname } = req.file;
    // const filename = `${id}_${originalname}`
    const { email, password } = req.body;
    // let avatarURL
    // if (tempUpload.length ===0) {
    //   avatarURL = gravatar.url(email);
    // }else{ avatarURL = path.join( "avatars", originalname)}
    

    // const avatarURL = gravatar.url(email);
    // console.log('avatarURL:', avatarURL)
    const resultUpload = path.join(avatarsDir, originalname);
    const avatarURL = path.join( "avatars", originalname)

    await fs.rename(tempUpload, resultUpload);
    const user = await findOneUser(email);
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await registerUser({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
       },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findOneUser(email);

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    const result = await loginUser(user.id, { token });

    res.status(200).json({
      token: result.token,
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res, next) => {
  const { id } = req.user;

  await logoutUser(id);
  res.status(204).json();
};

export const updateUserSubscription = async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await updateSubscription(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      user: { emailemail: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  const { id } = req.user;
  try {
    const { path: tempUpload, originalname } = req.file;
    const filename = `${id}_${originalname}`

  const resultUpload = path.join(avatarsDir, filename);
  
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join( "avatars", filename)
  
    const result = await updateAvatar(id, { avatarURL });
    
    res.json({avatarURL:result.avatarURL})
  } catch (error) {
    next(error)
  }



}
