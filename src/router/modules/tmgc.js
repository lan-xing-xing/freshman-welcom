import AppMain from '@/layout/components/AppMain'

// 土木工程学院
const tmgcRouter = {
  path: '/土木工程学院',
  component: AppMain,
  redirect: 'noRedirect',
  name: '5',
  meta: {
    title: '土木工程学院',
    noCache: true,
    roles: ['super-admin', 'tmgc']
  },
  children: [
    {
      path: '工程力学',
      component: () => import('@/views/majorstudent'),
      name: '/5/9',
      meta: { title: '工程力学', noCache: true }
    }, {
      path: '工程管理',
      component: () => import('@/views/majorstudent'),
      name: '/5/10',
      meta: { title: '工程管理', noCache: true }
    }
  ]
}

export default tmgcRouter
