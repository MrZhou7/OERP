import Layout from '@/views/layout/Layout';

const orderRouter = {
  path: '/order',
  component: Layout,
  name: 'Order',
  meta: { title: '订单管理', icon: 'nested' },
  children: [
    {
      path: '/order/index',
      name: 'Index',
      meta: { title: '订单管理' },
      component: () => import('@/views/order/index')
    },
    {
      path: '/order/refund',
      name: 'Refund',
      meta: { title: '订单退货管理' },
      component: () => import('@/views/order/refund')
    },
    {
      path: '/order/gathering',
      name: 'Gathering',
      meta: { title: '订单收款' },
      component: () => import('@/views/order/gathering')
    },
    {
      path: '/order/gatheringList',
      name: 'GatheringList',
      meta: { title: '订单收款列表' },
      component: () => import('@/views/order/gatheringList')
    },
    {
      path: '/order/qrcode',
      name: 'Qrcode',
      meta: { title: '扫码枪收款' },
      component: () => import('@/views/order/qrcode')
    }
  ]
};

export default orderRouter;
