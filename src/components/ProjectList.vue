<script setup>
  import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useProjectUpload } from '../stores/projectUpload';

  const store = useProjectUpload();
  const { delProject } = store;
  defineProps({
    projects: Array,
    length: Number
  })
  // console.log(projects);
</script>

<template>
  <main class="text-center">
    <h1 class="text-4xl font-bold underline">Project List</h1>
    <div class="my-2 w-550 border mx-auto text-left" v-if="length > 0">
      <ul>
        <li
          v-for="(project, index) in projects"
          :key="index"
          class="list-decimal text-xl my-1"
        >
          {{ project.name }}
          <span
            class="border border-red-600 ml-2 px-3 py-1 text-sm bg-red-600 cursor-pointer rounded text-white"
            @click="delProject(project.id)"
          >
            delete
          </span>
        </li>
      </ul>
    </div>
    <p v-else class="text-lg my-4">No project uploaded</p>
  </main>
</template>