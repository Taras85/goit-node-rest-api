import { User } from "../schemas/usersShemas.js";

async function registerUser({ password, email, subscription }) {
  const newUser = {
    password,
    email,
    subscription,
    // token,
  };
  const registerUser = await User.create(newUser);
  return registerUser;
}
async function loginUser(contactId, token) {
  console.log('token:', token)
  const updateUser = await User.findByIdAndUpdate(contactId, {token}, {new: true} );
  return updateUser;
}

export { registerUser, loginUser };
