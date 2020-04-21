import AppMain from '@/layout/components/AppMain'

// 艺术学院
const ysRouter = {
  path: '/艺术学院',
  component: AppMain,
  redirect: 'noRedirect',
  name: '4',
  meta: {
    title: '艺术学院',
    noCache: true,
    roles: ['super-admin', 'ys']
  },
  children: [
    {
      path: '服装设计',
      component: () => import('@/views/majorstudent'),
      name: '/4/4',
      meta: { title: '服装设计', noCache: true }
    }, {
      path: '纺织工程',
      component: () => import('@/views/majorstudent'),
      name: '/4/8',
      meta: { title: '纺织工程', noCache: true }
    }
  ]
}

export default ysRouter
