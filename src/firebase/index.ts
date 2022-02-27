import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const auth = firebaseAuth();
const db = firestore();

const usersRef = db.collection('users');

export {auth, db, usersRef};
export type {FirebaseAuthTypes};
