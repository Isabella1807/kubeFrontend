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
            component: () => import('../views/Templates.vue')
        },
       {
      path:'/templates',
      name:'templates',
      component: ListTemplates
    },
    {
      path:'/templates/new',
      name: 'create template', 
      component: NewTemplate
    },
    {
      path:'/members',
      name:'members',
      component: ListMembers
    }
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
