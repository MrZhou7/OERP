import Layout from '@/views/layout/Layout';

const saleRouter = {
  path: '/sale',
  component: Layout,
  meta: { title: '销售管理', icon: 'nested' },
  children: [
    {
      path: '/sale/paymentCategory',
      name: 'PaymentCategory',
      component: () => import('@/views/sale/pay/paymentCategory'),
      meta: { title: '支付类别管理', icon: 'form' }
    },
    {
      path: '/sale/paymentMethod',
      name: 'PaymentMethod',
      component: () => import('@/views/sale/pay/paymentMethod'),
      meta: { title: '支付方式管理', icon: 'form' }
    },
    {
      path: '/sale/shopManagement',
      name: 'ShopManagement',
      component: () => import('@/views/sale/shops/shopManagement'),
      meta: { title: '商铺管理', icon: 'form' }
    },
    {
      path: '/sale/shopPersonnel',
      name: 'ShopPersonnel',
      component: () => import('@/views/sale/shops/shopPersonnel'),
      meta: { title: '商铺人员管理', icon: 'form' }
    },
    {
      path: '/sale/shopTransfer',
      name: 'ShopTransfer',
      component: () => import('@/views/sale/shops/shopTransfer'),
      meta: { title: '商铺转移', icon: 'form' }
    },
    {
      path: '/sale/commodityManagement',
      name: 'CommodityManagement',
      component: () => import('@/views/sale/shops/commodityManagement'),
      meta: { title: '商品管理', icon: 'form' }
    }
  ]
};

export default saleRouter;
