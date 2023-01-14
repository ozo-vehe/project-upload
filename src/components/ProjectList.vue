<script setup>
  defineProps({
    projects: Array
  })
</script>

<template>
  <main class="text-center">
    <h1 class="text-4xl font-bold underline">Project List</h1>
    <div class="my-2 w-550 border mx-auto text-left" v-if="projects">
      <ul>
        <li
          v-for="(project, index) in projects"
          :key="index"
          class="list-decimal text-xl my-1"
        >
          {{ project.name }}
          <span
            class="border border-red-600 ml-2 px-3 py-1 text-sm bg-red-600 cursor-pointer rounded text-white">delete</span>
        </li>
      </ul>
    </div>
    <p v-else class="text-2xl my-4">Loading, please wait...</p>
  </main>
</template>