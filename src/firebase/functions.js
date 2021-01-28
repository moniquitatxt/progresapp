import { auth, db, storage } from "./config";

// Inicio de sesión de estudiantes con correo y contraseña
export const studentLogin = (email, password) => {
  const promise = auth.signInWithEmailAndPassword(email, password);
  return promise;
};

// Cerrar Sesión
export const signOut = () => {
  auth.signOut();
};

// Registro de estudiantes
export const studentSignUp = async (user) => {
  const response = await auth.createUserWithEmailAndPassword(
    user.email,
    user.password
  );

  const uid = response.user.uid;

  const data = {
    uid,
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

// Subir archivo al storage
export const uploadFile = async (file, path) => {
  const fileRef = storage.ref().child(path);

  // TODO: Tener cuidado con los posibles errores y colocar metadata
  await fileRef.put(file);
  const url = await fileRef.getDownloadURL();
  return url;
};

// Obtener las tutorías de un estudiante dado su uid
export const getStudentTutorings = (uid, func) => {
  return db
    .collectionGroup("tutorings")
    .where("studentsUIDs", "array-contains", uid)
    .onSnapshot((snapshot) => {
      const tutorings = snapshot.docs.map((doc) => doc.data());
      func(tutorings);
    });
};

// Obtener todas las tutorías de una carrera
// export const getTutoringsByDegree = (degree) => {
//   return db
//     .collectionGroup("tutorings")
//     .where("degrees", "array-contains", degree);
// };

export const getTutoringsByDegree = (degree, func) => {
  return db
    .collectionGroup("tutorings")
    .where("degrees", "array-contains", degree)
    .onSnapshot((snapshot) => {
      const tutorings = snapshot.docs.map((doc) => doc.data());
      func(tutorings);
    });
};
