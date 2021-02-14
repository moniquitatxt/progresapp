import { auth, db, storage } from "./config";
import { subjectDegrees, subjectName } from "../degrees.js";
import { add } from "date-fns";

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
    idDocument: user.idDocument,
    degree: user.degree,
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

  await fileRef.put(file);
  const url = await fileRef.getDownloadURL();
  return url;
};

// Obtener las tutorías de un estudiante dado su uid
export const getStudentTutorings = (uid, func) => {
  return db
    .collection("tutorings")
    .where("studentsIDs", "array-contains", uid)
    .onSnapshot((snapshot) => {
      const tutorings = snapshot.docs.map((doc) => {
        const tutoring = doc.data();
        tutoring.id = doc.id;
        tutoring.startTime = new Date(tutoring.startTime * 1000);
        tutoring.endingTime = add(tutoring.startTime, { hours: 2 });
        return tutoring;
      });
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
        const tutoring = doc.data();
        tutoring.id = doc.id;
        tutoring.startTime = new Date(tutoring.startTime * 1000);
        tutoring.endingTime = add(tutoring.startTime, { hours: 2 });
        return tutoring;
      });
      func(tutorings);
    });
};

// Obtener los detalles de una tutoría
export const getTutoringById = (id, func) => {
  return db
    .collection("tutorings")
    .doc(id)
    .onSnapshot((tutoringDoc) => {
      if (!tutoringDoc.exists) {
        return null;
      }
      const tutoring = tutoringDoc.data();
      tutoring.id = tutoringDoc.id;
      tutoring.startTime = new Date(tutoring.startTime * 1000);
      tutoring.endingTime = add(tutoring.startTime, { hours: 2 });
      func(tutoring);
    });
};

// Crear una tutoría nueva
export const createTutoring = (tutor, tutoring) => {
  const data = {
    name: subjectName(tutoring.subjectID),
    tutor: {
      id: tutor.uid,
      name: tutor.name,
      phone: tutor.phone,
      email: tutor.email,
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

// Unirse a una tutoría
export const joinTutoring = async (tutoring, user) => {
  await db
    .collection("tutorings")
    .doc(tutoring.id)
    .update({
      studentsIDs: [...tutoring.studentsIDs, user.uid],
      students: [...tutoring.students, { ...user, attendances: 0 }],
    });

  const notification = {
    title: "Nuevo estudiante",
    message: `${user.name} se unió a tu tutoría de ${tutoring.name}`,
    date: new Date(),
    read: false,
  };

  await db
    .collection("students")
    .doc(tutoring.tutor.id)
    .collection("notifications")
    .add(notification);

  if (tutoring.students.length == 15) {
    const notification = {
      title: "Tutoría llena",
      message: `Se llenó tu tutoría de ${tutoring.name}`,
      date: new Date(),
      read: false,
    };

    await db
      .collection("students")
      .doc(tutoring.tutor.id)
      .collection("notifications")
      .add(notification);
  }
};

// Obtener todas las tutorías de un tutor
export const getTutorTutorings = (tutorID, func) => {
  return db
    .collection("tutorings")
    .where("tutor.id", "==", tutorID)
    .onSnapshot((snapshot) => {
      const tutorings = snapshot.docs.map((doc) => {
        const tutoring = doc.data();
        tutoring.id = doc.id;
        tutoring.startTime = new Date(tutoring.startTime * 1000);
        tutoring.endingTime = add(tutoring.startTime, { hours: 2 });
        return tutoring;
      });
      func(tutorings);
    });
};

// Actualizar los datos de una tutoría
export const updateTutoring = async (tutoring, newData, type, student) => {
  await db.collection("tutorings").doc(tutoring.id).update(newData);

  if (type === "leave") {
    const notification = {
      title: "Cambio de estudiante",
      message: `${student.name} abandonó tu tutoría de ${tutoring.name}`,
      date: new Date(),
      read: false,
    };

    await db
      .collection("students")
      .doc(tutoring.tutor.id)
      .collection("notifications")
      .add(notification);
  } else if (type === "tutorChange") {
    const notification = {
      title: "Cambio en tutoría",
      message: `La tutoría de ${tutoring.name} fue modificada`,
      date: new Date(),
      read: false,
    };

    tutoring.studentsIDs.forEach((id) => {
      db.collection("students")
        .doc(id)
        .collection("notifications")
        .add(notification);
    });
  }
};

// Obtener los notificaciones
export const getNotifications = (userID, func) => {
  return db
    .collection("students")
    .doc(userID)
    .collection("notifications")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      const notifications = snapshot.docs.map((doc) => {
        const notification = doc.data();
        notification.id = doc.id;
        return notification;
      });
      func(notifications);
    });
};

export const markAsRead = async (userID) => {
  const notifications = await db
    .collection("students")
    .doc(userID)
    .collection("notifications")
    .get();

  notifications.forEach((doc) => {
    db.collection("students")
      .doc(userID)
      .collection("notifications")
      .doc(doc.id)
      .update({ read: true });
  });
};
