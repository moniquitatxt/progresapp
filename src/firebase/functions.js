import { auth, db } from "./config";

export const userLogin = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const userSignUp = async (user) => {
  const response = await auth.createUserWithEmailAndPassword(
    user.email,
    user.password
  );

  const uid = response.user.uid;

  const data = {
    // TODO: Considerar luego si poner el uid aquí o no
    name: user.name,
    // TODO: Consirar alternativas para estos nombres
    idDocument: user.idDocument,
    degree:  user.degree,
    // TODO: Lo mismo del uid con el email
    email: user.email,
    phone: user.phone,
    isTutor: user.isTutor,
  };

  return db.collection("students").doc(uid).set(data);
};
