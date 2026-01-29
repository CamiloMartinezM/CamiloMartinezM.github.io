<template>
    <div class="publications">
        <div v-for="year in sortedYears" :key="year">
            <h2 class="text-2xl font-semibold mb-2 mt-4 text-gray-300 dark:text-gray-600">{{ year }}</h2>
            <ol class="space-y-6">
                <li v-for="publication in groupedPublications[year]" :key="publication.id" class="publication">
                    <div class="flex">
                        <div class="w-[10%] flex justify-end items-start"></div>
                        <div class="w-full">
                            <div class="title text-lg font-medium flex items-center">
                                <span><a :href="publication.url" target="_blank" rel="noopener noreferrer" class="link"
                                        v-if="publication.url">{{ publication.title }}</a>
                                    <span v-else>{{ publication.title }}</span>
                                    <a v-if="publication.githubUrl" :href="publication.githubUrl" target="_blank"
                                        rel="noopener noreferrer"
                                        class="ml-1 text-gray-600 transition-colors ease-in-out dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 inline-block align-text-bottom" viewBox="0 0 496 512"
                                            fill="currentColor">
                                            <path
                                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                        </svg>
                                        <span class="sr-only">View on GitHub</span>
                                    </a>
                                </span>
                            </div>
                            <div class="author text-sm text-gray-600 dark:text-gray-400">
                                <span v-for="(author, index) in publication.authors" :key="index">
                                    <span :class="{ underline: author === 'Camilo Martínez' }">{{ author }}</span>
                                    <span v-if="index < publication.authors.length - 1">,&nbsp;</span>
                                </span>
                            </div>
                            <div class="periodical text-sm italic text-gray-600 dark:text-gray-400">
                                {{ publication.journal }}, {{ publication.year }}
                            </div>
                        </div>
                        <!-- <div class="w-1/3 flex justify-end items-start">
            </div> -->
                    </div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const publications = ref([
    {
        id: 'regenerativepump2026',
        title:
            'Numerical Study of Regenerative Pump Characteristics Operating under Different Fluid Viscosities and Multistage Arrangement',
        authors: [
            'Laura Peña',
            'Flor Calderon',
            'Camilo Martínez',
            'Jennifer Páez',
            'Miguel Asuaje',
            'Omar Lopez',
            'Nicolas Ratkovich'
        ],
        journal: 'Discover Mechanical Engineering (Springer Nature), Vol. 5, Article 4',
        year: 2026,
        githubUrl: null,
        url: 'https://link.springer.com/journal/44245'
    },
    {
        id: 'bachelorthesis',
        title:
            'Application of Computer Vision in the Analysis of Microstructures and Obtaining Structure-Property Relationships',
        authors: ['Camilo Martínez'],
        journal: 'Universidad de los Andes',
        year: 2021,
        githubUrl: 'https://github.com/CamiloMartinezM/supervised-micrograph-segmentation',
        url: 'http://hdl.handle.net/1992/51616'
    },
    {
        id: 'camilo2024',
        title:
            'Distinguishing Target and Non-Target Fixations with EEG and Eye Tracking in Realistic Visual Scenes',
        authors: [
            'Mansi Sharma',
            'Camilo Martínez',
            'Benedikt Emanuel Wirth',
            'Antonio Krüger',
            'Philipp Müller'
        ],
        journal:
            'Proceedings of the 26th International Conference on Multimodal Interaction (ICMI). ACM',
        year: 2024,
        githubUrl: null,
        url: null
    }
])

const groupedPublications = computed(() => {
    return publications.value.reduce(
        (acc, pub) => {
            if (!acc[pub.year]) {
                acc[pub.year] = []
            }
            acc[pub.year].push(pub)
            return acc
        },
        {} as Record<number, typeof publications.value>
    )
})

const sortedYears = computed(() => {
    return Object.keys(groupedPublications.value)
        .map(Number)
        .sort((a, b) => b - a)
})
</script>

<style scoped>
.publications {
    @apply space-y-8;
}

.publication {
    @apply border-b pb-4;
}
</style>
