import AppMain from '@/layout/components/AppMain'

// 国际教育学院
const gjjyRouter = {
  path: '/国际教育学院',
  component: AppMain,
  redirect: 'noRedirect',
  name: '1',
  meta: {
    title: '国际教育学院',
    noCache: true,
    roles: ['super-admin', 'gjjy']
  },
  children: [
    {
      path: '软件工程',
      component: () => import('@/views/majorstudent'),
      // 学院id/专业id
      name: '/1/1',
      meta: { title: '软件工程', noCache: true }
    }, {
      path: '机械工程',
      component: () => import('@/views/majorstudent'),
      name: '/1/2',
      meta: { title: '机械工程', noCache: true }
    }
  ]
}

export default gjjyRouter
