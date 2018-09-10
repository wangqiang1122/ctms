import api from '@/service/http';
import storage from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  // 登陆
  login(params) {
    return api.post('f0/login', params).then((resp) => {
      if (resp.code === 200 && resp.result) {
        storage.setAccount(resp.result);
        window.location.href = `http://${window.location.host}/console/#/`;
      } else {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp;
    });
  },
  // 登出
  logout() {
    api.put('f0/logout').then((resp) => {
      if (resp.code === 200) {
        storage.clearAccount();
        storage.clearPrivilege();
        if (process.env.NODE_ENV === 'development') {
          window.location.href = `http://${window.location.host}/login.html`;
        } else if (process.env.NODE_ENV === 'production') {
          window.location.href = `http://${window.location.host}`;
        }
      } else {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
      }
    });
  },
  logoutErr() {
    storage.clearAccount();
    storage.clearPrivilege();
    if (process.env.NODE_ENV === 'development') {
      window.location.href = `http://${window.location.host}/login.html`;
    } else if (process.env.NODE_ENV === 'production') {
      window.location.href = `http://${window.location.host}`;
    }
  },
  // 菜单
  getPermissionList() {
    const accountId = storage.getAccount().id;
    return api.get('f0/menu', { params: { accountId } }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 获取项目信息
  getProjects() {
    return api.get('projects').then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
};

