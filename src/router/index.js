import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
const lazyLoadExam = (view) => () => import(`@/views/Exam Management/${view}.vue`);
const lazyLoadLogin = (view) => () => import(`@/views/Login Register/${view}.vue`);
const lazyLoadAdmin = (view) => () => import(`@/views/Admin/${view}.vue`);
const routes = [
    // general routes
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: lazyLoadLogin('Login'),
        meta: {
            layout: AuthLayout
        }
    },

    // student routes 
    {
        path: '/reporting/:examId',
        name: 'SpecificExamReport',
        component: lazyLoadExam('SpecificExamReport'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/student/:studentId',
        name: 'SpecificStudent',
        component: lazyLoadExam('SpecificStudent'),
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
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router