import { auth } from "./config";

export const userLogin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
