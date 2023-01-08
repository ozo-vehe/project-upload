<script setup>
  import { reactive, ref } from 'vue';
  import { useProjectUplaod } from '../stores/projectUpload';

  const store = useProjectUplaod();

  const project = reactive({
    image: "image link",
    name: "",
    tags: [
      "Art Direction",
      "Brand Identity",
      "UI Design"
    ],
    description: "Holzarbeit is a small business that provides luxury interior decor services for individuals and firms on a tight budget.",
    link: "https://www.google.com",
    type: [ "Brand Design" ],
  })

  const disable = ref(false);


  // Methods
  const uploadImage = async(e) => {
    const files = e.target.files[0];
    const url = await store.upload(files);
    console.log(url)
  }

  const uploadProject = async() => {
    if(!project.name || project.description || project.image || project.link || project.tags || project.type) return false;
    
  }

    // console.log(project);
</script>

<template>
  <main class="flex flex-wrap items-center justify-center gap-4 h-screen">
    <form class="flex flex-col flex-wrap w-450 px-4 box-border">
      <div>
        <label for="name">Project Name</label>
        <input id="name" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="project.name" />
      </div>
      <div>
        <label for="desc">Project Description</label>
        <input id="desc" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="project.name" />
      </div>
      <div>
        <label for="tags">Project Tags</label>
        <input
          id="tags"
          class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3"
          type="text"
          placeholder="Tags seperated by a comma"
          v-model="project.name" />
      </div>
      <div>
        <label for="type">Project Type</label>
        <input
          id="type"
          class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3"
          type="text"
          placeholder="Type(s) seperated by a comma"
          v-model="project.name" />
      </div>
      <div class="flex flex-col">
        <label for="image">Project Image</label>
        <input id="image" class="my-2" type="file" accept="image/*" @change="uploadImage($event)"/>
      </div>
      <button
        @click.prevent="uploadProject"
        :disabled="disable"
        class="border w-52 mx-auto my-4 rounded-md py-2 mt-8 bg-gray-200 text-black"
      >
        Upload
      </button>
    </form>
  </main>
</template>