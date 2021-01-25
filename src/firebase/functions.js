import { auth, db } from "./config";

// Inicio de sesión de estudiantes con correo y contraseña
export const studentLogin = (email, password) => {
  const promise = auth.signInWithEmailAndPassword(email, password);
  return promise;
};

// Cerrar Sesión
export const signOut = () => {
  auth.signOut();
}

// Registro de estudiantes
export const studentSignUp = async (user) => {
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
    degree: user.degree,
    // TODO: Lo mismo del uid con el email
    email: user.email,
    phone: user.phone,
    isTutor: false,
  };

  const promise = db.collection("students").doc(uid).set(data);
  return promise;
};

// Obtener las tutorías de un estudiante dado su uid
export const getStudentTutorings = (uid) => {
  return db
    .collectionGroup("tutorings")
    .where("students.uid", "array-contains", uid)
    .get();
};

// Obtener todas las tutorías de una carrera
export const getTutoringsByDegree = (degree) => {
  return db
    .collectionGroup("tutorings")
    .where("degrees", "array-contains", degree);
};
