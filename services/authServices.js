import { User } from "../schemas/usersShemas.js";

async function registerUser({ password, email, subscription }) {
  const newUser = {
    password,
    email,
    subscription,
  };
  const registerUser = await User.create(newUser);
  return registerUser;
}
async function loginUser(userId, token) {
  const updateUser = await User.findByIdAndUpdate(contactId, token, {
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

export { registerUser, loginUser, logoutUser, findOneUser, updateSubscription };
