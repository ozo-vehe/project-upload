<script setup>
  import { useProjectUpload } from '../stores/projectUpload';
  import { storeToRefs} from 'pinia'
  import { ref, onMounted } from 'vue';

  const store = useProjectUpload();
  const { projects } = storeToRefs(store);
  const length = ref(projects.value.length);
  console.log(projects.value.length);
  
  onMounted(async () => {
    await store.getProjects();
  })
</script>

<template>
  <main class="text-center">
    <h1 class="text-4xl font-bold underline">Project List</h1>
    <div class="my-2" v-if="length > 0">
      <ul v-for="(project, index) in projects" :key="index">
        <li class="text-xl py-2 my-2">{{ index + 1 }}. {{ project.name }}</li>
      </ul>
    </div>
    <p v-else class="text-2xl my-4">Loading, please wait...</p>
  </main>
</template>