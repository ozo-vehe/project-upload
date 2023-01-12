<script setup>
  import { useProjectUpload } from '../stores/projectUpload';
  import { storeToRefs} from 'pinia'

  const store = useProjectUpload();
  const { projects } = storeToRefs(store);
</script>

<template>
  <main>
    <h1>Project List</h1>
    <div v-if="projects">
      <ul v-for="(project, index) in projects" :key="index">
        <li>{{ project.name }}</li>
      </ul>
    </div>
    <p v-else>Loading...</p>
  </main>
</template>