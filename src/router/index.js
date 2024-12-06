import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: { hideHeader: true }
        },
        {
            path: '/templates',
            name: 'templates',
            component: () => import('../views/ListTemplates.vue'),
            meta: { hideHeader: false }
        },
        {
            path: '/templates/edit',
            name: 'create template',
            component: () => import('../views/NewTemplate.vue'),
            meta: { hideHeader: false }
        },
        {
            path: '/members',
            name: 'members',
            component: () => import('../views/ListMembers.vue'),
            meta: { hideHeader: false }
        },
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: () => import('../views/ForgotPassword.vue'),
            meta: { hideHeader: false }
        },
        {
            path: '/projects',
            name: 'projects',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ProjectsView.vue'),
            meta: { hideHeader: false }
        },
        {
            path: '/groups',
            name: 'groups',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/ListMembers.vue'),
            meta: { hideHeader: false }
        },
    ]
})

export default router
