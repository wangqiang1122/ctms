import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  getSiteSubjectList() {
    const db = storageService.getTopNav().projectDB;
    return api.get(`site-subject/${db}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 非crf表列表
  getF1List(params) {
    // formId
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}
    return api.get('recordslist2', { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 获取非crf制定数据
  getF1Detail() {
    // formId, dataId
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.get('records2').then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 数据结构
  getF1Structure() {
    // formId
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}
    return api.get('form-struct2').then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  postF1(formId, params) {
    const db = storageService.getTopNav().project_db;
    return api.post(`f1/addRecord/db/${db}/form/${formId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  putF1(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.put(`f1/editRecord/db/${db}/form/${formId}/data/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 非Crf表去权限
  getPermissonsCRF() {
    // formId
    // const db = storage.getTopNav().projectDB;
    return api.get('permissionsList').then((resp) => {
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

