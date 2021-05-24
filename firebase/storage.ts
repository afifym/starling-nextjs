import firebase from './config';
import 'firebase/storage';

const storage = firebase.storage();

export const uploadImage = async (file) => {
  const ref = storage.ref();
  const fileRef = ref.child(file.name);
  await fileRef.put(file);
  const fileURL = await fileRef.getDownloadURL();
  return fileURL;
};
