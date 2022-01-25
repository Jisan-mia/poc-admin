import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue';
import { computed } from 'vue';
import store from '../store';

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
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/student-management/:studentId',
        name: 'SpecificStudent',
        component: lazyLoadAdmin('AdminSpecificStudent'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },

    // admin routes
    {
        path: '/dashboard',
        name: 'AdminDashboard',
        component: lazyLoadAdmin('AdminDashboard'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/exam-pack',
        name: 'AdminExam_Pack',
        component: lazyLoadAdmin('AdminExam_Pack'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/exam-management',   
        name: 'AdminExamManagement',
        component: lazyLoadAdmin('AdminExamManagement'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/question-editor',   
        name: 'MainQuestionEditor',
        component: lazyLoadAdmin('MainQuestionEditor'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/student-management',   
        name: 'AdminStudentManagement',
        component: lazyLoadAdmin('AdminStudentManagement'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/reporting',   
        name: 'AdminReporting',
        component: lazyLoadAdmin('AdminReporting'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/user-management',
        name: 'AdminUserManagement',
        component: lazyLoadAdmin('AdminUserManagement'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/account-management',
        name: 'AdminAccountManagement',
        component: lazyLoadAdmin('AdminAccountManagement'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
    {
        path: '/batch-settings',
        name: 'AdminBatchSettings',
        component: lazyLoadAdmin('AdminBatchSettings'),
        meta: {
            layout: AppLayout,
            requireLogin: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = computed(() => store.state.adminState.user.isAuthenticated)
    
    if (to.matched.some(record => record.meta.requireLogin) && !isAuthenticated.value) {
        next('/')
    } else {
        next()
    }
})


export default router