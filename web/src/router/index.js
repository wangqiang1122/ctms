import Vue from 'vue';
import Router from 'vue-router';

/* main  -  主页面
 *
 * Admin和项目的第一层功能列表页
 *
 * */
import Main from '@/views/Main';
/* f0  - 主页
 *
 * 类似用户管理的功能，比较单纯的表结构，最常规的增删改查
 *
 * */
import F0Index from '@/views/f0/index';

/* f1  - 功能块1
 *
 * 类似用户管理的功能，比较单纯的表结构，最常规的增删改查
 *
 * */
import F1List from '@/views/f1/List';
import F1Add from '@/views/f1/Add';
import F1View from '@/views/f1/View';
import F1Edit from '@/views/f1/Edit';

/* f2  - 功能块2
 *
 * 类似CRF管理的功能，在f1的基础上，增加了对列的数据类型的控制，行的合并显示
 *
 * */
import F2List from '@/views/f2/List';
import F2View from '@/views/f2/View';
import F2Edit from '@/views/f2/Edit';
import F2Audit from '@/views/f2/Audit';

/* f3  - 功能块3
 *
 *
 *
 * */
import F3Index from '@/views/f3/Index';

/* f4  - 功能块4
 *
 *
 *
 * */
import F4List from '@/views/f4/Index';

/*
 * 开发文档
 * */
import DocIndex from '@/views/doc/Index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'F0_index',
      component: F0Index,
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
    },
    /* *********************** f1 ***************************** */
    {
      path: '/main/f1/list',
      name: 'F1_List',
      component: F1List,
    },
    {
      path: '/main/f1/add',
      name: 'F1_Add',
      component: F1Add,
    },
    {
      path: '/main/f1/view/:id',
      name: 'F1_View',
      component: F1View,
    },
    {
      path: '/main/f1/edit/:id',
      name: 'F1_Edit',
      component: F1Edit,
    },
    /* *********************** f2 ***************************** */
    {
      path: '/main/f2/list',
      name: 'F2_List',
      component: F2List,
    },
    {
      path: '/main/f2/view',
      name: 'CRFList', // F2_View
      component: F2View,
    },
    {
      path: '/main/f2/edit',
      name: 'F2_Edit',
      component: F2Edit,
    },
    {
      path: '/main/f2/audit',
      name: 'F2_Audit',
      component: F2Audit,
    },
    /* *********************** f3 访视日程表 ***************************** */
    {
      path: '/main/f3/index',
      name: 'VisitSchedule',
      component: F3Index,
    },
    /* *********************** f4 访视进程表 ***************************** */
    {
      path: '/main/f4/index',
      name: 'VisitProcess',
      component: F4List,
    },
    /* *********************** 开发文档 ***************************** */
    {
      path: '/doc',
      name: 'DocIndex',
      component: DocIndex,
    },
  ],
});

export default router;
