<template>
  <div class="flex justify-center min-h-screen text-justify dark:bg-body dark:text-white">
    <div class="container flex max-w-6xl relative">
      <!-- Sidebar Navigation -->
      <nav
        :class="{
          'w-1/4 border-r border-gray-200 dark:border-gray-700': !isSidebarFolded,
          'w-0': isSidebarFolded
        }"
        class="sticky top-0 h-screen transition-all duration-300 ease-in-out bg-white dark:bg-body text-xs md:text-sm"
      >
        <div class="h-full overflow-hidden">
          <ul class="space-y-4 pt-16 pr-4" :class="{ 'opacity-0': isSidebarFolded }">
            <li v-for="item in allNavigationItems" :key="item.id">
              <a
                :href="`#${item.id}`"
                @click.prevent="scrollTo(item.id)"
                :class="{
                  'text-highlighted font-semibold': currentSection === item.id,
                  'text-secondary dark:text-secondary-white': currentSection !== item.id
                }"
                class="block py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 relative"
              >
                <span
                  v-if="currentSection === item.id"
                  class="absolute left-0 top-0 bottom-0 w-1 bg-highlighted rounded-full"
                ></span>
                <span v-html="item.title"></span>
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
        <!-- <h1 class="text-4xl font-bold mb-4 border-b-2 dark:border-gray-500">
          Projects &amp; Research
        </h1> -->

        <!-- Overview section with id -->
        <div id="overview" ref="overviewSection">
          <ProjectOverview @projectClick="scrollTo" />
        </div>

        <!-- Project sections -->
        <div v-for="project in projects" :key="project.id" :id="project.id" class="mb-8">
          <h2
            v-if="project.id !== 'publications'"
            class="text-3xl font-semibold mb-6 flex items-center border-b-2 dark:border-gray-500"
          >
            Projects
          </h2>
          <h2
            class="font-semibold flex items-center"
            :class="{
              'text-3xl border-b-2 dark:border-gray-500': project.id === 'publications',
              'text-2xl mb-2': project.id !== 'publications'
            }"
          >
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
          <Suspense>
            <component :is="project.component" />
            <template #fallback>
              <div class="flex justify-center items-center p-8">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"
                ></div>
              </div>
            </template>
          </Suspense>
          <p v-if="project.githubUrl" class="text-sm mt-4 text-gray-700 italic dark:text-gray-400">
            For more details, please refer to the project's
            <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="link"
              >GitHub repository</a
            >.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore } from '../stores/projects'
import ProjectOverview from './ProjectsOverview.vue'

const route = useRoute()
const router = useRouter()
const projectsStore = useProjectsStore()
const { projects, allNavigationItems } = storeToRefs(projectsStore)

const currentSection = ref('overview') // Default to overview
const isSidebarFolded = ref(false)
const overviewSection = ref<HTMLElement | null>(null)

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
    currentSection.value = id
    router.replace({ hash: `#${id}` }) // Update the URL without navigating
  }
}

const updateCurrentSection = () => {
  const windowHeight = window.innerHeight
  let maxVisibleSection = null
  let maxVisiblePercentage = 0

  // Check overview section first
  if (overviewSection.value) {
    const rect = overviewSection.value.getBoundingClientRect()
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const visiblePercentage = visibleHeight / overviewSection.value.offsetHeight
    if (visiblePercentage > maxVisiblePercentage) {
      maxVisiblePercentage = visiblePercentage
      maxVisibleSection = 'overview'
    }
  }

  // Then check project sections
  for (const project of projects.value) {
    const element = document.getElementById(project.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
      const visiblePercentage = visibleHeight / element.offsetHeight

      if (visiblePercentage > maxVisiblePercentage) {
        maxVisiblePercentage = visiblePercentage
        maxVisibleSection = project.id
      }
    }
  }

  if (maxVisibleSection) {
    currentSection.value = maxVisibleSection
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateCurrentSection)
  window.addEventListener('resize', updateCurrentSection)

  // If there's a hash in the URL, scroll to that section
  if (route.hash) {
    const id = route.hash.slice(1)
    scrollTo(id)
  } else {
    // Otherwise, start at overview
    currentSection.value = 'overview'
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateCurrentSection)
  window.removeEventListener('resize', updateCurrentSection)
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
  /* position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0; */
}
</style>
