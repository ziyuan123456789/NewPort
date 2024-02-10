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
      },
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
        component: () => import('../views/main.vue')
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
        cnName:'数据库3',
        meta: {
          name: '资料库'
        },
        component: () => import('../views/404/404.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    cnName: '登陆页面',
    hidden: true,
    component: () => import('../views/Pages/LoginPage.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const notNeedLogin = ['Home', 'MainPage', 'Detail', 'LoginPage','database']

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
