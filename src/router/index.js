import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewTemplate from '@/views/NewTemplate.vue'
import ListTemplates from '@/views/ListTemplates.vue'
import ListMembers from '@/views/ListMembers.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    }*/
  ]
})

export default router
