import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/templates',
            name: 'templates',
            component: () => import('../views/ListTemplates.vue')
        },
        {
            path: '/templates/edit',
            name: 'create template',
            component: () => import('../views/NewTemplate.vue')
        },
        {
            path: '/members',
            name: 'members',
            component: () => import('../views/ListMembers.vue')
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: () => import('../views/ForgotPassword.vue')
        },
        {
            path: '/projects',
            name: 'projects',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ProjectsView.vue')
        },
    ]
})

export default router
