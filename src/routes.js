import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

import LandingPage from './pages/LandingPage.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import FileGrid from './components/FileGrid.vue';
import ViewSummary from './components/ViewSummary.vue';
import ForgotPassword from './pages/ForgotPassword.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LandingPage },
        { path: '/login', component: Login },
        { path: '/forgot_password', component: ForgotPassword },
        { path: '/register', component: Register },
        { path: '/logout', redirect: '/login' },
        { path: '/about', componenent: null },
        { 
            path: '/home', 
            component: Home, 
            beforeEnter: (to,from,next) => {
                if(!localStorage.getItem('isAuthenticated') || localStorage.getItem('isAuthenticated') === false){
                    next('/login');
                }else{
                    next();
                }
            },
            children: [
                { path: ':folderName', component: FileGrid, props:true }, 
                { path: ':folderName/:fileId', component: ViewSummary, props:true}
            ]
        },
    ]
});

export default router;