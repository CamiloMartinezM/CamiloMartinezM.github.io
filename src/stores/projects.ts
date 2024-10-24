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
        }
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
            summary:
                'A collection of academic publications and research papers in computer science and related fields.'
        },
        {
            id: 'stringstosequences',
            title: 'Acoustic Guitar Chords Recognition',
            component: defineAsyncComponent(() => import('../views/projects/StringsToSequencesView.vue')),
            githubUrl: 'https://github.com/dhimitriosduka1/hlcv',
            iconPath: '/images/strings-to-sequences/icon.jpg',
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
                }
            ],
            summary:
                'An innovative automated system for recognizing <strong> guitar chords</strong> in acoustic guitar videos. Our approach combines <strong>YOLO</strong> <a href="https://arxiv.org/abs/1506.02640" class="link" target="_blank" rel="noopener">[Redmon et al., 2016]</a> for fretboard detection and <strong>DINOv2</strong> <a href="https://arxiv.org/abs/2304.07193" class="link" target="_blank" rel="noopener">[Oquab et al.]</a> with a <strong>ViT</strong> backbone <a href="https://arxiv.org/abs/2010.11929" class="link" target="_blank" rel="noopener">[Dosovitskiy et al., 2020]</a> for chord classification. We investigate <strong>hand pose estimation</strong> using <a href="https://github.com/google-ai-edge/mediapipe" class="link" target="_blank" rel="noopener">MediaPipe</a> and extend the work of <a href="https://ph01.tci-thaijo.org/index.php/ecticit/article/view/254624" class="link" target="_blank" rel="noopener">[Kristian et al., 2024]</a> by integrating modern deep learning techniques and proposing an audio generation component.'
        },
        {
            id: 'multilingual-lm',
            title: 'Multilingual Language Models Representations and Fine-Tuning',
            component: defineAsyncComponent(
                () => import('../views/projects/MultilingualLMRepresentations.vue')
            ),
            githubUrl: 'https://github.com/Kanakanajm/nnti/tree/main',
            iconPath: '/images/multilingual-lm-representations/icon.png',
            authors: [
                {
                    name: 'Camilo Martínez',
                    linkedinUrl: 'https://linkedin.com/in/camilo-martinez'
                },
                {
                    name: 'Honglu Ma',
                    linkedinUrl: 'https://github.com/Kanakanajm'
                }
            ],
            summary:
                'This study evaluates multilingual representation spaces using <a href="https://huggingface.co/facebook/xglm-564M" class="link" target="_blank" rel="noopener">XGLM-564M</a> and <a href="https://huggingface.co/openai-community/gpt2" class="link" target="_blank" rel="noopener">GPT-2</a> on the <strong><a href="https://huggingface.co/datasets/facebook/flores" class="link" target="_blank" rel="noopener">FLORES-200</a></strong> dataset, focusing on <strong>English, Spanish, German, Arabic, Tamil, and Quechua</strong>. We analyze hidden representations using PCA with <a href="https://scikit-learn.org/dev/modules/generated/sklearn.decomposition.PCA.html" class="link" target="_blank" rel="noopener">scikit-learn</a> and t-SNE with <a href="https://opentsne.readthedocs.io/en/stable/" class="link" target="_blank" rel="noopener">openTSNE</a> to visualize and interpret these high-dimensional spaces. We then fine-tune XGLM-564M on the <strong><a href="https://huggingface.co/datasets/Llamacha/monolingual-quechua-iic" class="link" target="_blank" rel="noopener">Monolingual-Quechua-IIC</a></strong> corpus, comparing four approaches: full fine-tuning, BitFit <a href="https://arxiv.org/abs/2106.10199" class="link" target="_blank" rel="noopener">[Zaken et al., 2022]</a>, LoRA <a href="https://arxiv.org/abs/2106.09685" class="link" target="_blank" rel="noopener">[Hu et al., 2021]</a>, and IA³ <a href="https://arxiv.org/abs/2205.05638" class="link" target="_blank" rel="noopener">[Liu et al., 2022]</a>. Our analysis examines both performance improvements on Quechua and cross-lingual transfer effects.'
        },
        {
            id: 'rendapixel',
            title: '<span class="font-normal">Rend-a-Pixel</span> <em>Raytracer</em>',
            component: defineAsyncComponent(() => import('../views/projects/RendAPixelView.vue')),
            githubUrl: 'https://github.com/CamiloMartinezM/rend-a-pixel',
            iconPath: '/images/rend-a-pixel/icon.png',
            authors: [
                {
                    name: 'Camilo Martínez',
                    linkedinUrl: 'https://linkedin.com/in/camilo-martinez'
                }
            ],
            summary:
                'A physically-based renderer implementing various ray tracing techniques. Features include image denoising, normal mapping, multiple importance sampling, support for various material, texture types and lighting conditions, and many more.'
        }
    ])

    // Combine overview and projects for navigation
    const allNavigationItems = computed(() => [
        ...navigationItems.value,
        ...projects.value.map((p) => ({ id: p.id, title: p.title }))
    ])

    return {
        projects,
        allNavigationItems
    }
})
