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
  getF1List(formId, params) {
    // formId
    const db = storageService.getTopNav().projectDB;
    return api.get(`records/${db}/${formId}`, { params }).then((resp) => {
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
  getF1Detail(formId, dataId) {
    const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.get(`records/${db}/${formId}/${dataId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 获取表数据接结构
  getF1Structure(formId) {
    const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}
    return api.get(`struct-form-table/${db}/${formId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 获取表数据结构 list用
  getF2StructureList(formId) {
    const db = storageService.getTopNav().projectDB;
    return api.get(`struct-form-view/${db}/${formId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 增加数据非CRF表
  postF1(formId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.post(`records/${db}/${formId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 编辑新增受试者
  putF1(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.put(`records/${db}/${formId}/${dataId}`, params).then((resp) => {
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
  getPermissonsCRF(formId) {
    // formId
    const db = storageService.getTopNav().projectDB;
    return api.get(`permissions/${db}/${formId}`).then((resp) => {
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

