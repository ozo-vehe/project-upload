<script setup>
  import { ref } from 'vue';
  import { useProjectUpload } from '../stores/projectUpload';
  import { storeToRefs } from 'pinia';
  import ProjectList from './ProjectList.vue';

  // Data
  const store = useProjectUpload();
  const { imageURL, projects } = storeToRefs(store);
  let disable = ref(true);
  let tags = ref(null);
  let type = ref("All");
  let name = ref(null);
  let description = ref(null);
  let link = ref(null);
  let loader = ref(false);
  let projectList = ref(false);
  let length = ref(projects.value.length);
  let spinner = ref(false);

  // Methods
  const uploadImage = async(e) => {
    loader.value = true;
    const files = e.target.files[0];
    await store.upload(files);
    enableBtn();
    loader.value = false;
  }

  const enableBtn = () => {
    if(!name.value || !description.value || !imageURL.value || !link.value || !tags.length > 1 || !type.value) disable.value = true;
    else disable.value = false;
  }

  const uploadProject = async() => {
    loader.value = true;
    const tagArr = tags.value.split(',');

    const project = {
      image: imageURL.value,
      name: name.value,
      description: description.value,
      link: link.value,
      tags: [...tagArr],
      type: type.value,
    }
    await store.saveProject(project);

    // Resset values to their default values
    tags.value = null;
    type.value = "All";
    name.value = null;
    description.value = null;
    link.value = null;
    disable.value = true;
    loader.value = false;
  }

  const showProjects = async() => {
    spinner.value = true;
    await store.getProjects();    
    length = projects.value.length;
    projectList.value = true;
    spinner.value = false;
  }

</script>

<template>
  <main class="pt-8 bg-white flex flex-wrap w-screen box-border">
    <div v-if="loader" class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/40 z-10">
      <p class="opacity-100 border border-r-black rounded-full animate-spin inline-block h-24 w-24 ml-4 text-center loader">
      </p>
    </div>
    <form class="mx-auto px-4 box-border w-400">
      <!-- Project name -->
      <div class="box-border">
        <label for="name">Project Name</label>
        <input id="name" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="name" @change="enableBtn"/>
      </div>
      <!-- Project description -->
      <div>
        <label for="desc">Project Description</label>
        <input id="desc" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="description" @change="enableBtn" />
      </div>
      <!-- Project link -->
      <div>
        <label for="link">Project Link</label>
        <input id="link" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="link" @change="enableBtn" />
      </div>
      <!-- Project tags -->
      <div>
        <label for="tags">Project Tags</label>
        <input
          id="tags"
          class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3"
          type="text"
          placeholder="Tags seperated by a comma"
          v-model="tags"
          @change="enableBtn" />
      </div>
      <!-- Select project type -->
      <div>
        <label for="type">Project Type</label>
        <select
          id="type"
          class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3"
          v-model="type"
          @change="enableBtn"
        >
          <option value="All">All</option>
          <option value="brand design">Brand Design</option>
          <option value="product design">Product Design</option>
        </select>
      </div>
      <!-- Upload project image -->
      <div>
        <label class="block" for="image">Project Image</label>
        <input id="image" class="my-2 w-full" type="file" accept="image/*" @change="uploadImage($event)"/>
      </div>
      <!-- Upload project button -->
      <button
        @click.prevent="uploadProject"
        :disabled="disable"
        class="border w-52 flex items-center justify-center gap-4 mx-auto my-4 rounded-md py-2 mt-8 bg-gray-700 text-gray-200"
      >
        <p>Upload</p>
      </button>
    </form>
  </main>
  <button 
    class="border w-52 h-12 flex items-center justify-center gap-4 mx-auto my-4 rounded-md py-2 mt-8 bg-gray-700 text-gray-200"
    @click="showProjects"
  >
    <p v-if="!spinner">Show Project Lists</p>
    <p v-if="spinner" class="border border-black border-r-white rounded-full animate-spin h-5 w-5 text-center loader">
    </p>
  </button>
  <ProjectList v-if="projectList" :projects="projects" :length="length" />
</template>

<style scope>
  button:disabled {
    background-color: #c0bebe;
    color: #141414;
  }
</style>