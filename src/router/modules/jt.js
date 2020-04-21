import AppMain from '@/layout/components/AppMain'

// 计通学院
const jtRouter = {
  path: '/计算机与通信学院',
  component: AppMain,
  redirect: 'noRedirect',
  name: '2',
  meta: {
    title: '计算机与通信学院',
    noCache: true,
    roles: ['super-admin', 'jt']
  },
  children: [
    {
      path: '软件工程',
      component: () => import('@/views/majorstudent'),
      name: '/2/1',
      meta: { title: '软件工程', noCache: true }
    }, {
      path: '通信工程',
      component: () => import('@/views/majorstudent'),
      name: '/2/3',
      meta: { title: '通信工程', noCache: true }
    }, {
      path: '大数据',
      component: () => import('@/views/majorstudent'),
      name: '/2/5',
      meta: { title: '大数据', noCache: true }
    }, {
      path: '数字媒体技术',
      component: () => import('@/views/majorstudent'),
      name: '/2/6',
      meta: { title: '数字媒体技术', noCache: true }
    }, {
      path: '信息与计算机科学',
      component: () => import('@/views/majorstudent'),
      name: '/2/7',
      meta: { title: '信息与计算机科学', noCache: true }
    }
  ]
}

export default jtRouter
