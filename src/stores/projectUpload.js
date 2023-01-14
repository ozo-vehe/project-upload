import { defineStore } from 'pinia';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../firebaseInit';
import { getFirestore, doc, deleteDoc, setDoc, getDocs, collection } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

export const useProjectUpload = defineStore('projectUpload', {
  state: () => ({
    projects: [],
    imageURL: null,
  }),
  actions: {
    // Upload project image to firebase
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
      
      // Get image URL to use in the project object to be stored
      await getDownloadURL(storageRef).then((url) => {
        console.log(url);
        this.imageURL = url;
      }).catch((error) => {
        console.log(error);
      })
    },
    // Upload project to firebase
    async saveProject(project) {
      console.log("yes")
      console.log(project);

      const db = getFirestore(app);
      const docName = Date.now();
      console.log(docName.toString());
      const docRef = doc(db, "projects", docName.toString())
      try {
        console.log("Sending...")
        await setDoc(docRef, project)
        console.log("Doc added")
      } catch(error) {
        console.log(error);
      }
    },
    // Get stored projects from firebase
    async getProjects() {
      const db = getFirestore(app);
      const docs = await getDocs(collection(db, "projects"));
      this.projects = [];
      docs.forEach((doc) => {
        this.projects.push({id: doc.id, ...doc.data()});
        console.log(doc);
        console.log(this.projects);
      });
    },
    // Delete a project
    async delProject(id) {
      console.log("Deleting...");
      const db = getFirestore(app);
      await deleteDoc(doc(db, "projects", id));
      console.log("deleted");
      await this.getProjects();
      console.log(this.projects)
    }
  }
})
