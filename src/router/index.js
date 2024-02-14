import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    cnName: '404',
    hidden: true,
    meta: {
      name: '404页面'
    },
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/',
    name: 'MainPage',
    cnName: '首页',
    component: Layout,
    children: [
      {
        path: '',
        name: 'MainPage',
        meta: {
          name: '详情'
        },
        props: true,
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/Detailpage/:id',
    name: 'DetailPage',
    cnName: '详情页',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Detail',
        cnName: '详情页',
        meta: {
          name: '详情页'
        },
        props: true,
        component: () => import('../views/Pages/Port/Detailpage.vue')
      }
    ]
  },
  {
    path: '/thematicknowledge',
    name: 'thematicknowledge',
    cnName: '专题知识',
    component: Layout,
    children: [
      {
        path: '',
        name: 'thematicknowledge',
        meta: {
          name: '专题知识'
        },
        component: () => import('../views/Pages/ThematicKnowledge.vue')
      }
    ]
  },
  {
    path: '/experimentalGuides',
    name: 'experimentalGuides',
    cnName: '实验指南',
    component: Layout,
    children: [
      {
        path: '',
        name: 'experimentalGuides',
        meta: {
          name: '实验指南'
        },
        component: () => import('../views/main.vue')
      }
    ]
  },
  {
    path: '/database',
    name: 'database',
    cnName: '资料库',
    component: Layout,
    children: [
      {
        path: 'database3',
        name: 'database',
        cnName: '数据库3',
        meta: {
          name: '资料库'
        },
        component: () => import('../views/404/404.vue')
      }
    ]
  },
  {
    path: '/doexperiment',
    name: 'doexperiment',
    cnName: '做实验',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'doexperiment',
        cnName: '做实验',
        meta: {
          name: '做实验'
        },
        component: () => import('../views/404/404.vue')
      }
    ]
  },
  {
    path: '/teacher',
    name: 'teacher',
    cnName: '学生管理',
    needRole: '1',
    component: Layout,
    children: [
      {
        path: 'StudentListMaintenance',
        name: 'StudentListMaintenance',
        cnName: '学生名单维护',
        meta: {
          name: '学生名单维护'
        },
        component: () => import('../views/404/404.vue')
      },
      {
        path: 'CourseMaintenance',
        name: 'CourseMaintenance',
        cnName: '实验管理',
        meta: {
          name: '实验管理'
        },
        component: () => import('../views/Pages/TeacherView/Main.vue')
      }
    ]
  },
  {
    path: '/teacher',
    name: 'CourseMain',
    cnName: '学科管理',
    needRole:"1",
    component: Layout,
    hidden:true,
    children: [
      {
        path: 'CourseMain',
        name: 'CourseMain',
        cnName: '做实验',
        meta: {
          name: '做实验'
        },
        component: () => import('../views/Pages/TeacherView/checkStudentExp.vue')
      }
    ]
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    cnName: '个人信息',
    component: Layout,
    hidden:true,
    children: [
      {
        path: '',
        name: 'userinfo',
        cnName: '个人信息',
        meta: {
          name: '个人信息'
        },
        component: () => import('../views/Pages/GeneralView/UserInfo.vue')
      }
    ]
  },
  {
    path: '/student',
    name: 'student',
    cnName: '做实验',
    needRole: '0',
    component: Layout,
    children: [
      {
        path: 'StudentListMaintenance',
        name: 'StudentListMaintenance',
        cnName: '学生名单维护',
        meta: {
          name: '学生名单维护'
        },
        component: () => import('../views/Pages/StudentView/studentView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    cnName: '登陆页面',
    hidden: true,
    component: () => import('../views/Pages/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const notNeedLogin = [
  'thematicknowledge',
  'Home',
  'MainPage',
  'Detail',
  'LoginPage',
  'database'
]

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('loginData')
  if (to.name === 'NotFound') {
    next()
    return
  }
  if (!notNeedLogin.includes(to.name) && !isLoggedIn) {
    ElMessage({
      message: '请先登录',
      type: 'warning'
    })
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = to.meta.name
})

export default router
