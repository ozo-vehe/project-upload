<script setup>
  import { ref } from 'vue';
  import { useProjectUpload } from '../stores/projectUpload';
  import { storeToRefs } from 'pinia';

  const store = useProjectUpload();
  const { imageURL } = storeToRefs(store);
  let disable = ref(true);
  let tags = ref(null);
  let type = ref("All");
  let name = ref(null);
  let description = ref(null);
  let link = ref(null);

  // Methods
  const uploadImage = async(e) => {
    const files = e.target.files[0];
    await store.upload(files);
    enableBtn();
  }

  const enableBtn = () => {
    if(!name.value || !description.value || !imageURL.value || !link.value || !tags.length > 1 || !type.value) disable.value = true;
    else disable.value = false;
  }

  const uploadProject = async() => {
    // if(!name || !description || !imageURL || !link || !tags || !type) return false;
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
    await store.getProjects();

    // Resset values to their default values
    tags.value = null;
    type.value = "All";
    name.value = null;
    description.value = null;
    link.value = null;
    disable.value = true;
  }

</script>

<template>
  <main class="flex flex-wrap items-center justify-center gap-4 h-screen">
    <form class="flex flex-col flex-wrap w-450 px-4 box-border">
      <div>
        <label for="name">Project Name</label>
        <input id="name" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="name" @change="enableBtn"/>
      </div>
      <div>
        <label for="desc">Project Description</label>
        <input id="desc" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="description" @change="enableBtn" />
      </div>
      <div>
        <label for="link">Project Link</label>
        <input id="link" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="link" @change="enableBtn" />
      </div>
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
      <div class="flex flex-col">
        <label for="image">Project Image</label>
        <input id="image" class="my-2" type="file" accept="image/*" @change="uploadImage($event)"/>
      </div>
      <button
        @click.prevent="uploadProject"
        :disabled="disable"
        class="border w-52 mx-auto my-4 rounded-md py-2 mt-8 bg-gray-700 text-gray-200"
      >
        Upload
      </button>
    </form>
  </main>
</template>

<style scope>
  button:disabled {
    background-color: #c0bebe;
    color: #141414;
  }
</style>