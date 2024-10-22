import { defineStore } from 'pinia'
import { computed, defineAsyncComponent, ref } from 'vue'

export interface Author {
    name: string
    linkedinUrl: string
}

export interface Project {
    id: string
    title: string
    component: ReturnType<typeof defineAsyncComponent>
    githubUrl: string | null
    iconPath: string
    authors: Author[]
    summary: string
}

export const useProjectsStore = defineStore('projects', () => {
    // Add overview as a special navigation item
    const navigationItems = ref([
        {
            id: 'overview',
            title: 'Overview'
        },
        // Projects will be added after this
    ])

    const projects = ref<Project[]>([
        {
            id: 'publications',
            title: 'Publications',
            component: defineAsyncComponent(() => import('../views/projects/MyPublications.vue')),
            githubUrl: null,
            iconPath: '',
            authors: [],
            summary: 'A collection of academic publications and research papers in computer science and related fields.'
        },
        {
            id: 'stringstosequences',
            title: 'Acoustic Guitar Chords Recognition',
            component: defineAsyncComponent(() => import('../views/projects/StringsToSequencesView.vue')),
            githubUrl: 'https://github.com/dhimitriosduka1/hlcv',
            iconPath: '/src/assets/images/strings-to-sequences/icon.jpg',
            authors: [
                {
                    name: 'Camilo Martínez',
                    linkedinUrl: 'https://linkedin.com/in/camilo-martinez'
                },
                {
                    name: 'Dhimitrios Duka',
                    linkedinUrl: 'https://linkedin.com/in/dhimitrios-duka'
                },
                {
                    name: 'Honglu Ma',
                    linkedinUrl: 'https://github.com/Kanakanajm'
                },
            ],
            summary: 'An innovative system for recognizing guitar chords using computer vision and deep learning techniques. The project processes video input of guitar playing to identify and classify chord patterns in real-time.',
        },
        {
            id: 'rendapixel',
            title: '<span class="font-normal">Rend-a-Pixel</span> <em>Raytracer</em>',
            component: defineAsyncComponent(() => import('../views/projects/RendAPixelView.vue')),
            githubUrl: 'https://github.com/CamiloMartinezM/rend-a-pixel',
            iconPath: '/src/assets/images/rend-a-pixel/icon.png',
            authors: [
                {
                    name: 'Camilo Martínez',
                    linkedinUrl: 'https://linkedin.com/in/camilo-martinez'
                },
            ],
            summary: 'A physically-based renderer implementing various ray tracing techniques. Features include global illumination, multiple importance sampling, and support for various material types and lighting conditions.'
        },
    ])

    // Combine overview and projects for navigation
    const allNavigationItems = computed(() => [
        ...navigationItems.value,
        ...projects.value.map(p => ({ id: p.id, title: p.title }))
    ])

    return {
        projects,
        allNavigationItems
    }
})