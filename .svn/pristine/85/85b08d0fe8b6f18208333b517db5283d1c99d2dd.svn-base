import Layout from '@/views/layout/Layout';

const baseRouter = {
  path: '/basic',
  component: Layout,
  meta: { title: '基础管理', icon: 'nested' },
  children: [
    {
      path: '/basic/category',
      name: 'Category',
      component: () => import('@/views/basic/categoryManage'),
      meta: { title: '品类管理', icon: 'form' }
    },
    {
      path: '/basic/siteManage',
      name: 'SiteManage',
      component: () => import('@/views/basic/siteManage'),
      meta: { title: '场地管理', icon: 'form' }
    },
    {
      path: '/basic/storeType',
      name: 'StoreType',
      component: () => import('@/views/basic/storeType'),
      meta: { title: '商铺类型维护', icon: 'form' }
    },
    {
      path: '/basic/brand',
      name: 'Brand',
      component: () => import('@/views/basic/brand'),
      meta: { title: '品牌管理', icon: 'form' }
    },
    {
      path: 'addBrand',
      name: 'AddBrand',
      component: () => import('@/views/basic/addBrand'),
      meta: { title: '新增品牌', icon: 'form' }, hidden: true
    },
    {
      path: 'checkBrand',
      name: 'CheckBrand',
      component: () => import('@/views/basic/checkBrand'),
      meta: { title: '查看品牌', icon: 'form' }, hidden: true
    },
    {
      path: 'editBrand',
      name: 'EditBrand',
      component: () => import('@/views/basic/editBrand'),
      meta: { title: '编辑品牌', icon: 'form' }, hidden: true
    },
    {
      path: '/basic/commercialManage',
      name: 'CommercialManage',
      component: () => import('@/views/mall/index'),
      meta: { title: '商管公司维护', icon: 'form' }
    },
    {
      path: '/basic/mall',
      name: 'Mall',
      component: () => import('@/views/mall/mall'),
      meta: { title: '商业项目维护', icon: 'form' }

    },
    {
      path: '/basic/team',
      name: 'Team',
      component: () => import('@/views/basic/team'),
      meta: { title: '项目团队管理', icon: 'form' }
    }
  ]
};

export default baseRouter;
