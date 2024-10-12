<template>
  <div class="flex justify-center min-h-screen text-justify dark:bg-body dark:text-white">
    <div class="container flex max-w-6xl relative">
      <!-- Sidebar Navigation -->
      <nav
        :class="{
          'w-1/4 border-r border-gray-200 dark:border-gray-700': !isSidebarFolded,
          'w-0': isSidebarFolded
        }"
        class="sticky top-0 h-screen transition-all duration-300 ease-in-out bg-white dark:bg-body"
      >
        <div class="h-full overflow-hidden">
          <ul class="space-y-4 pt-16 pr-4" :class="{ 'opacity-0': isSidebarFolded }">
            <li v-for="project in projects" :key="project.id">
              <a
                :href="`#${project.id}`"
                @click.prevent="scrollTo(project.id)"
                :class="{
                  'text-highlighted font-semibold': currentProject === project.id,
                  'text-secondary dark:text-secondary-white': currentProject !== project.id
                }"
                class="block py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 relative"
              >
                <span
                  v-if="currentProject === project.id"
                  class="absolute left-0 top-0 bottom-0 w-1 bg-highlighted rounded-full"
                ></span>
                <span v-html="project.title"></span>
              </a>
            </li>
          </ul>
        </div>
        <!-- Toggle button -->
        <button
          @click="toggleSidebar"
          class="absolute top-4 -right-3 bg-white dark:bg-gray-700 p-2 rounded-full z-10 transition-all duration-300 ease-in-out"
          :class="{
            'shadow-lg shadow-gray-200 dark:shadow-[0_0_10px_3px_rgba(255,255,255,0.1)]':
              !isSidebarFolded,
            'shadow-lg shadow-gray-400 dark:shadow-[0_0_10px_3px_rgba(255,255,255,0.3)]':
              isSidebarFolded
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 transform transition-transform duration-300 dark:text-white"
            :class="{ 'rotate-180': isSidebarFolded }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </nav>

      <!-- Main Content -->
      <main
        :class="{
          'w-3/4': !isSidebarFolded,
          'flex-1': isSidebarFolded
        }"
        class="p-8 transition-all duration-300 ease-in-out overflow-x-hidden"
      >
        <h1 class="text-4xl font-bold mb-8">Projects &amp; Research</h1>
        <div v-for="project in projects" :key="project.id" :id="project.id" class="mb-16">
          <h2 class="text-3xl font-semibold mb-4 flex items-center border-b-2 dark:border-gray-500">
            <span v-html="project.title"></span>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-3 text-gray-600 transition-colors ease-in-out dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 496 512"
                fill="currentColor"
              >
                <path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
              <span class="sr-only">View on GitHub</span>
            </a>
          </h2>
          <component :is="project.component" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const projects = ref([
  {
    id: 'rendapixel',
    title: '<span class="font-normal">Rend-a-Pixel</span> <em>Raytracer</em>',
    component: defineAsyncComponent(() => import('./projects/RendAPixelView.vue')),
    githubUrl: 'https://github.com/CamiloMartinezM/rend-a-pixel'
  },
  {
    id: 'publications',
    title: 'Publications',
    component: defineAsyncComponent(() => import('./projects/MyPublications.vue')),
    githubUrl: null
  }
  // Add more projects as needed
])

const currentProject = ref('')
const router = useRouter()
const isSidebarFolded = ref(false)

const toggleSidebar = () => {
  isSidebarFolded.value = !isSidebarFolded.value
}

const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    updateCurrentProject()
    // Update the URL without navigating
    router.replace({ hash: `#${id}` })
  }
}

const updateCurrentProject = () => {
  const windowHeight = window.innerHeight
  let maxVisibleProject = null
  let maxVisiblePercentage = 0

  for (const project of projects.value) {
    const element = document.getElementById(project.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      const visiblePercentage = visibleHeight / element.offsetHeight

      if (visiblePercentage > maxVisiblePercentage) {
        maxVisiblePercentage = visiblePercentage
        maxVisibleProject = project.id
      }
    }
  }

  if (maxVisibleProject) {
    currentProject.value = maxVisibleProject
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateCurrentProject)
  window.addEventListener('resize', updateCurrentProject)

  // If there's a hash in the URL, scroll to that project
  if (route.hash) {
    scrollTo(route.hash.slice(1))
  } else {
    // Otherwise, update based on initial scroll position
    updateCurrentProject()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateCurrentProject)
  window.removeEventListener('resize', updateCurrentProject)
})

// Watch for route changes
watch(
  () => route.hash,
  (newHash) => {
    if (newHash) {
      scrollTo(newHash.slice(1))
    }
  }
)
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
