import AppMain from '@/layout/components/AppMain'

// 启迪学院
const qdRouter = {
  path: '/启迪学院',
  component: AppMain,
  redirect: 'noRedirect',
  name: '3',
  meta: {
    title: '启迪学院',
    noCache: true,
    roles: ['super-admin', 'qd']
  },
  children: [
    {
      path: '软件工程',
      component: () => import('@/views/majorstudent'),
      name: '/3/1',
      meta: { title: '软件工程', noCache: true }
    }, {
      path: '大数据',
      component: () => import('@/views/majorstudent'),
      name: '/3/5',
      meta: { title: '大数据', noCache: true }
    }, {
      path: '数字媒体技术',
      component: () => import('@/views/majorstudent'),
      name: '/3/6',
      meta: { title: '数字媒体技术', noCache: true }
    }, {
      path: '信息与计算机科学',
      component: () => import('@/views/majorstudent'),
      name: '/3/7',
      meta: { title: '信息与计算机科学', noCache: true }
    }
  ]
}

export default qdRouter
