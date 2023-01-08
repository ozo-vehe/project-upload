import { defineStore } from 'pinia'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../firebaseInit'

export const useProjectUplaod = defineStore("project", {
  state: () => ({
    project: {},
  }),
  actions: {
    async upload(files) {
      const storageRef = ref(storage, "images");
      let imageURL = null;

      await uploadBytes(storageRef, files).then((snapshot) => {
        console.log("successfully uploaded")
        console.log(snapshot);
      }).catch((error) => {
        console.log(error);
      })
  
      await getDownloadURL(storageRef).then((url) => {
        console.log(url);
        imageURL = url;
        return imageURL;
      }).catch((error) => {
        console.log(error);
      })
    },
    async uploadProject(project) {
      if(!project.name || project.description || project.image || project.link || project.tags || project.type) return false;
      
    }
  }
})
