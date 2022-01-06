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
        path: '/login-register',
        name: 'LoginRegister',
        component: () => import('@/views/LoginRegister.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: lazyLoadLogin('Login'),
        meta: {
            layout: AuthLayout
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: lazyLoadLogin('Register'),
        meta: {
            layout: AuthLayout
        }
    },

    // student routes 
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: lazyLoadExam('Dashboard'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/exam-pack',
        name: 'Exam_Pack',
        component: lazyLoadExam('Exam_Pack'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/exam-pack/:packTitle',
        name: 'ExamUnpack',
        component: lazyLoadExam('ExamUnpack'),
        props: true,
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/exam/:examId',
        name: 'ExamPage',
        component: lazyLoadExam('ExamPage'),
        props: true,
    },
    
    {
        path: '/reporting',
        name: 'Reporting',
        component: lazyLoadExam('Reporting'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/reporting/:examId',
        name: 'SpecificExamReport',
        component: lazyLoadExam('SpecificExamReport'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/student-management',
        name: 'StudentManagement',
        component: lazyLoadExam('StudentManagement'),
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

    {
        path: '/edit-profile',
        name: 'EditProfile',
        component: lazyLoadExam('EditProfile'),
        meta: {
            layout: AppLayout
        }
    },
    // admin routes
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: lazyLoadAdmin('AdminDashboard'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/admin/exam-pack',
        name: 'AdminExam_Pack',
        component: lazyLoadAdmin('AdminExam_Pack'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/admin/exam-management',   
        name: 'AdminExamManagement',
        component: lazyLoadAdmin('AdminExamManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/admin/student-management',   
        name: 'AdminStudentManagement',
        component: lazyLoadAdmin('AdminStudentManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/admin/reporting',   
        name: 'AdminReporting',
        component: lazyLoadAdmin('AdminReporting'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/admin/user-management',
        name: 'AdminUserManagement',
        component: lazyLoadAdmin('AdminUserManagement'),
        meta: {
            layout: AppLayout
        }
    },
    {
        path: '/admin/account-management',
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