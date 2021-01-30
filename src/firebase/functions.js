import { auth, db, storage } from "./config";
import { subjectDegrees, subjectName } from "../degrees.js";

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

// Obtener todas las tutorías de una carrera determinada
export const getTutoringsByDegree = (degree, func) => {
  return db
    .collection("tutorings")
    .where("degrees", "array-contains", degree)
    .onSnapshot((snapshot) => {
      const tutorings = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      func(tutorings);
    });
};

// Obtener los detalles de una tutoría
export const getTutoringById = async (id) => {
  console.log(id);
  const tutoringDoc = await db.collection("tutorings").doc(id).get();
  if (!tutoringDoc.exists) {
    return null;
  }
  const tutoring = tutoringDoc.data();
  return tutoring;
};

// Crear una tutoría nueva
export const createTutoring = (tutor, tutoring) => {
  const data = {
    name: subjectName(tutoring.subjectID),
    tutor: {
      id: tutor.uid,
      name: tutor.name,
      phone: tutor.phone,
    },
    subjectID: tutoring.subjectID,
    degrees: subjectDegrees(tutoring.subjectID),
    classRoom: tutoring.classRoom,
    groupLink: tutoring.groupLink,
    studentsIDs: [],
    students: [],
    day: tutoring.day,
    startTime: tutoring.startTime,
  };

  const promise = db.collection("tutorings").add(data);
  return promise;
};
