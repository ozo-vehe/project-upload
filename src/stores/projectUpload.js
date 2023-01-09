import { defineStore } from 'pinia';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebaseInit';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore/lite';

export const useProjectUpload = defineStore('projectUpload', {
  state: () => ({
    projects: [],
    imageURL: null,
  }),
  actions: {
    async upload(files) {
      const storage = getStorage(app);
      const storageRef = ref(storage, "images");

      await uploadBytes(storageRef, files).then((snapshot) => {
        console.log("successfully uploaded")
        console.log(snapshot);
      }).catch((error) => {
        console.log(error);
      })
  
      await getDownloadURL(storageRef).then((url) => {
        console.log(url);
        this.imageURL = url;
      }).catch((error) => {
        console.log(error);
      })
    },
    async uploadProject(project) {
      console.log("yes")
    }
  }
})
