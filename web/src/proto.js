/* eslint-disable no-inner-declarations,arrow-body-style,no-undef */
import Vue from 'vue';
import { PAGINATION_SIZE, PAGINATION_SIZES, PAGINATION_LAYOUT } from '@/data/constants';

/* 分页组件常量 */
Vue.prototype.PAGINATION_SIZE = PAGINATION_SIZE;
Vue.prototype.PAGINATION_SIZES = PAGINATION_SIZES;
Vue.prototype.PAGINATION_LAYOUT = PAGINATION_LAYOUT;

/* 根据routerName跳转 */
Vue.prototype.JumpPage = function a(currAction, routerName, params) {
  const name = `${currAction.router_name.substr(0, currAction.router_name.indexOf('_'))}_${routerName}`;
  this.$router.push({ name, params });
};
Vue.prototype.JumpOuterPage = function b(routerName, params) {
  this.$router.push({ name: routerName, params });
};
