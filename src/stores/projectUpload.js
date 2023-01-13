import { defineStore } from 'pinia';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebaseInit';
import { getFirestore, doc, addDoc, setDoc, getDocs, collection } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

export const useProjectUpload = defineStore('projectUpload', {
  state: () => ({
    projects: [],
    imageURL: null,
  }),
  actions: {
    async upload(files) {
      const storage = getStorage(app);
      const imageName = files.name;
      console.log(imageName);
      const storageRef = ref(storage, imageName);

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
    async saveProject(project) {
      console.log("yes")
      console.log(project);

      const db = getFirestore(app);
      const docName = Date.now();
      console.log(docName.toString());
      const collectionRef = collection(db, "projects");
      const docRef = doc(db, "projects", docName.toString())
      try {
        console.log("Sending...")
        await setDoc(docRef, project)
        console.log("Doc added")
      } catch(error) {
        console.log(error);
      }
    },
    async getProjects() {
      const db = getFirestore(app);
      const docs = await getDocs(collection(db, "projects"));
      this.projects = [];
      docs.forEach((doc) => {
        this.projects.push(doc.data());
      });
    }
  }
})
