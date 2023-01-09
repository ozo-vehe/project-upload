<script setup>
  import { ref } from 'vue';
  import { useProjectUpload } from '../stores/projectUpload';
  import { storeToRefs } from 'pinia';

  const store = useProjectUpload();
  const { imageURL } = storeToRefs(store);
  let disable = ref(false);
  let tags = ref(null);
  let type = ref(null);
  let name = ref(null);
  let description = ref(null);
  let link = ref(null);


  // Methods
  const uploadImage = async(e) => {
    const files = e.target.files[0];
    await store.upload(files);
    console.log(imageURL.value);
  }

  const uploadProject = async() => {
    // if(!name || !description || !imageURL || !link || !tags || !type) return false;
    const tagArr = tags.value.split(',');
    const typeArr = type.value.split(',');

    const project = {
      image: imageURL.value,
      name: name.value,
      description: description.value,
      link: link.value,
      tags: [...tagArr],
      type: [...typeArr],
    }
    await store.saveProject(project);
  }

    // console.log(project);
</script>

<template>
  <main class="flex flex-wrap items-center justify-center gap-4 h-screen">
    <form class="flex flex-col flex-wrap w-450 px-4 box-border">
      <div>
        <label for="name">Project Name</label>
        <input id="name" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="name" />
      </div>
      <div>
        <label for="desc">Project Description</label>
        <input id="desc" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="description" />
      </div>
      <div>
        <label for="link">Project Link</label>
        <input id="link" class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3" type="text" v-model="link" />
      </div>
      <div>
        <label for="tags">Project Tags</label>
        <input
          id="tags"
          class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3"
          type="text"
          placeholder="Tags seperated by a comma"
          v-model="tags" />
      </div>
      <div>
        <label for="type">Project Type</label>
        <input
          id="type"
          class="w-full border border-gray-400 rounded px-4 py-3 mt-2 mb-3"
          type="text"
          placeholder="Type(s) seperated by a comma"
          v-model="type" />
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