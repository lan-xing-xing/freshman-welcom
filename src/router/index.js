import Vue from 'vue'
import Router from 'vue-router'

// 1.安装vue-router插件
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import gjjyRouter from './modules/gjjy'
import jtRouter from './modules/jt'
import tmgcRouter from './modules/tmgc'
import qdRouter from './modules/qd'
import ysRouter from './modules/ys'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 所有权限通用路由表
// 登录页，首页，404
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/主页',
    children: [{
      path: '主页',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  // 全校学生信息（权限super-admin）
  {
    path: '/schoolStudent',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'schoolStudent',
        component: () => import('@/views/schoolstudent/index'),
        meta: {
          title: '全校学生信息',
          icon: 'form',
          roles: ['super-admin']
        }
      }
    ]
  },

  // 全院学生信息（权限college-admin）
  {
    path: '/collegeStudent',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'collegeStudent',
        component: () => import('@/views/collegestudent'),
        meta: {
          title: '全院学生信息',
          icon: 'form',
          roles: ['college-admin']
        }
      }
    ]
  },

  // 各全院学生信息（权限super-admin）
  {
    path: '/allCollegeStudent',
    component: Layout,
    redirect: '/allCollegeStudent/guojiao',
    meta: {
      title: '各学院学生信息',
      icon: 'form',
      roles: ['super-admin']
    },
    children: [
      gjjyRouter,
      jtRouter,
      qdRouter,
      ysRouter,
      tmgcRouter
    ]
  },

  // 各专业学生信息（权限college-admin）
  {
    path: '/allMajorStudent',
    component: Layout,
    redirect: '/allMajorStudent/guojiao',
    meta: {
      title: '各专业学生信息',
      icon: 'form',
      roles: ['college-admin']
    },
    children: [
      gjjyRouter,
      jtRouter,
      qdRouter,
      ysRouter,
      tmgcRouter
    ]
  },

  // 某专业学生信息（权限professional-admin）
  {
    path: '/studentInformation',
    component: Layout,
    redirect: '/studentInformation/majorStudent',
    name: 'studentInformation',
    meta: {
      title: '学生基本信息',
      icon: 'example',
      roles: ['professional-admin']
    },
    children: [
      {
        path: 'majorStudent',
        name: 'majorStudent',
        component: () => import('@/views/majorstudent'),
        meta: { title: '全部学生信息', icon: 'table' }
      },
      {
        path: 'classManagement',
        name: 'classManagement',
        component: () => import('@/views/classmanagement'),
        meta: { title: '班级管理', icon: 'table' }
      },
      {
        path: 'tutorManagement',
        name: 'tutorManagement',
        component: () => import('@/views/tutormanagement'),
        meta: { title: '班主任管理', icon: 'table' }
      },
      {
        path: 'notReport',
        name: 'notReport',
        component: () => import('@/views/notreport'),
        meta: { title: '未报到学生', icon: 'table' }
      },
      {
        path: 'loanCheck',
        name: 'loanCheck',
        component: () => import('@/views/loancheck'),
        meta: { title: '贷款审核', icon: 'documentation' }
      }
    ]
  },

  // 迎新现场（权限professional-admin）
  {
    path: '/offline',
    component: Layout,
    redirect: '/offline/registerCheck',
    name: 'offline',
    meta: {
      title: '迎新现场',
      icon: 'guide',
      roles: ['professional-admin']
    },
    children: [
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/pay'),
        meta: { title: '财务缴费', icon: 'money' }
      },
      {
        path: 'registerCheck',
        name: 'registerCheck',
        component: () => import('@/views/registercheck'),
        meta: { title: '注册核验', icon: 'people' }
      }
    ]
  },

  // 数据统计（权限三种权限管理员）
  {
    path: '/dataStatistics',
    component: Layout,
    redirect: '/dataStatistics/reportRate',
    name: 'dataStatistics',
    meta: { title: '数据统计', icon: 'chart' },
    children: [
      {
        path: 'reportRate',
        name: 'reportRate',
        component: () => import('@/views/reportrate'),
        meta: { title: '新生报到率', icon: 'chart' }
      },
      {
        path: 'provincesRate',
        name: 'provincesRate',
        component: () => import('@/views/provincesrate'),
        meta: { title: '各省比例', icon: 'example' }
      },
      {
        path: 'genderRate',
        name: 'genderRate',
        component: () => import('@/views/genderrate'),
        meta: { title: '男女生比例', icon: 'peoples' }
      }
    ]
  },

  // 404页面，必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // 使用html5中的history，去掉url中的#
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: '/freshman-welcome',
  routes: constantRoutes // 实例化vue时只挂载通用路由表
})

// 2.创建一个router
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 3.导出router
export default router
