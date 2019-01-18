import Vue from 'vue'
import Router from 'vue-router'
import Recetas from '@/views/Recetas'
import Receta from '@/views/Receta'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'recetas',
            component: Recetas
        },
        {
            path: '/receta/:recetaId',
            name: 'receta',
            component: Receta,
            props: true
        }
    ]
})

export default router
