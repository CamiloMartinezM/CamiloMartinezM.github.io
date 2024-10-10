import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ProjectsResearchView from '../views/ProjectsResearchView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'about',
            component: AboutView
        },
        {
            path: '/projects-and-research',
            name: 'projects-and-research',
            component: ProjectsResearchView
        }
    ]
})

export default router
