import { ACCOUNT, TOKEN, PRIVILEGE, TOP_NAV, LV3_NAV, ROUTE_PARAMS, FirstLevel } from '@/data/constants';


export default {
  /*
   * 用户信息
   * */
  getAccount: () => JSON.parse(localStorage.getItem(ACCOUNT)),
  setAccount(obj) {
    localStorage.setItem(ACCOUNT, JSON.stringify(obj));
  },
  clearAccount() {
    localStorage.removeItem(ACCOUNT);
  },
  /*
   * PRIVILEGE
   * */
  getPrivilege: () => JSON.parse(localStorage.getItem(PRIVILEGE)),
  setPrivilege(obj) {
    localStorage.setItem(PRIVILEGE, JSON.stringify(obj));
  },
  clearPrivilege() {
    localStorage.removeItem(PRIVILEGE);
  },
  /*
   * top层路径信息
   * */
  getTopNav: () => JSON.parse(localStorage.getItem(TOP_NAV)),
  setTopNav(obj) {
    localStorage.setItem(TOP_NAV, JSON.stringify(obj));
  },
  clearTopNav() {
    localStorage.removeItem(TOP_NAV);
  },
  /*
   * third层actions
   * */
  getLv3Nav: () => JSON.parse(localStorage.getItem(LV3_NAV)),
  setLv3Nav(obj) {
    localStorage.setItem(LV3_NAV, JSON.stringify(obj));
  },
  clearLv3Nav() {
    localStorage.removeItem(LV3_NAV);
  },
  /*
   * 缓存参数
   * */
  getRouteParams: () => JSON.parse(localStorage.getItem(ROUTE_PARAMS)),
  setRouteParams(obj) {
    localStorage.setItem(ROUTE_PARAMS, JSON.stringify(obj));
  },
  clearRouteParams() {
    localStorage.removeItem(ROUTE_PARAMS);
  },
  /*
   * 一级菜单信息
   * */
  getFirstLevel: () => JSON.parse(localStorage.getItem(FirstLevel)),
  setFirstLevel: (obj) => {
    localStorage.setItem(FirstLevel, JSON.stringify(obj));
  },
  clearFirstLevel: () => {
    localStorage.removeItem(FirstLevel);
  },
  /*
   * token
   * */
  getToken: () => JSON.parse(localStorage.getItem(TOKEN)),
  setToken(token) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
  },
  clearToken() {
    localStorage.removeItem(TOKEN);
  },
};
