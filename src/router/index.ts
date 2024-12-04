import { createRouter, createWebHistory } from 'vue-router'
import DoctorsPage from '../views/DoctorsPage.vue'
import NursesPage from '../views/NursesPage.vue'

const routes = [
    {
        path: '/',
        redirect: '/doctors'
    },
    {
        path: '/doctors',
        name: 'Doctors',
        component: DoctorsPage
    },
    {
        path: '/nurses',
        name: 'Nurses',
        component: NursesPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
