import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/news',
            name: 'News',
            component: () => import('../views/News.vue')
        },
        {
            path: '/foods',
            name: 'Foods',
            component: () => import('../views/Foods.vue')
        }
    ]
})

export default router