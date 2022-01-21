import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue';
// const lazyLoadExam = (view) => () => import(`@/views/Exam Management/${view}.vue`);
const lazyLoadLogin = (view) => () => import(`@/views/${view}.vue`);
const lazyLoadAdmin = (view) => () => import(`@/views/Admin/${view}.vue`);
const routes = [
    // general routes
    
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    { 
        path: "/:pathMatch(.*)*", 
        name: 'PageNotFound',
        component: () => import('@/components/ui/PageNotFound.vue')
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: lazyLoadLogin('Login'),
    // },

    {
        path: '/logout',
        name: 'Logout',
        component: () => import('@/views/Logout.vue'),
    },

    // student routes 
    {
        path: '/reporting/:examId',
        name: 'SpecificExamReport',
        component: lazyLoadAdmin('AdminSpecificExamReport'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/student-management/:studentId',
        name: 'SpecificStudent',
        component: lazyLoadAdmin('AdminSpecificStudent'),
        meta: {
            layout: AppLayout
        }
    },

    // admin routes
    {
        path: '/dashboard',
        name: 'AdminDashboard',
        component: lazyLoadAdmin('AdminDashboard'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/exam-pack',
        name: 'AdminExam_Pack',
        component: lazyLoadAdmin('AdminExam_Pack'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/exam-management',   
        name: 'AdminExamManagement',
        component: lazyLoadAdmin('AdminExamManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/student-management',   
        name: 'AdminStudentManagement',
        component: lazyLoadAdmin('AdminStudentManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/reporting',   
        name: 'AdminReporting',
        component: lazyLoadAdmin('AdminReporting'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/user-management',
        name: 'AdminUserManagement',
        component: lazyLoadAdmin('AdminUserManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/account-management',
        name: 'AdminAccountManagement',
        component: lazyLoadAdmin('AdminAccountManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/batch-settings',
        name: 'AdminBatchSettings',
        component: lazyLoadAdmin('AdminBatchSettings'),
        meta: {
            layout: AppLayout
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = false;
//     const loginViews = () => to.name === 'Login';
//     if (!loginViews() && !isAuthenticated) next({ name: 'Login' })
//     else next()
// })


export default router