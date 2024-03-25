import { User } from "../schemas/usersShemas.js";

async function registerUser({ password, email, subscription, avatarURL }) {
  const newUser = {
    password,
    email,
    subscription,
    avatarURL
  };
  const registerUser = await User.create(newUser);
  return registerUser;
}
async function loginUser(userId, token) {
  const updateUser = await User.findByIdAndUpdate(userId, token, {
    new: true,
  });
  return updateUser;
}

async function logoutUser(userId) {
  await User.findByIdAndUpdate(userId, { token: null });
}

async function findOneUser(email) {
  const oneUser = await User.findOne({ email });
  return oneUser;
}

async function updateSubscription(userId, data) {
  const userSubscription = await User.findByIdAndUpdate(userId, data, {new: true});
 return userSubscription;
}

async function updateAvatar(userId, avatarURL){

  const userAvatar = await User.findByIdAndUpdate(userId, {avatarURL}, {new: true})
  return userAvatar
}

export { registerUser, loginUser, logoutUser, findOneUser, updateSubscription, updateAvatar };
