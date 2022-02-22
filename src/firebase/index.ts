import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const auth = firebaseAuth();
const db = firestore();

export {auth, db};
export type {FirebaseAuthTypes};
