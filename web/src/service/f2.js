import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  // 获取表数据接结构
  getF2Structure(formId) {
    const db = storageService.getTopNav().projectDB;
    return api.get(`form-struct/${db}/${formId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 获取列表数据
  getF2List(params) {
    // formId
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}
    return api.get('recordslist1', { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 获取指定数据
  getF2Detail(formId, dataId) {
    const db = storageService.getTopNav().projectDB;
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
  // 获取历史数据
  getF2HistoryDetail() {
    // formId, dataId
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.get('audit-records1').then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 提交数据；1：接受数据；2：审核通过；3：锁定数据；4：解锁数据
  getF2ChangeStatus(params) {
    // formId, dataId,
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.get('crf-state', { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp;
    });
  },
  putF2(params) {
    // formId, dataId,
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.put('records', params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  confirmRule(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.post(`f2/confirmRule/db/${db}/form/${formId}/data/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 新建质疑
  createQuery(params) {
    // formId, dataId
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.post('queries', params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 回复
  responseQuery(params) {
    // formId, dataId,
    // const db = storageService.getTopNav().projectDB;
    // ${db}/${formId}/${dataId}
    return api.put('queries', params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 关闭
  closeQuery(params) {
    // formId, dataId,
    // const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.get('queries', { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  deleteQuery(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/deleteQuery/db/${db}/form/${formId}/data/${dataId}`, { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 编辑
  editQuery(params) {
    // formId, dataId,
    // const db = storageService.getTopNav().projectDB;
    // ${db}/${formId}/${dataId}
    return api.get('queries', { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 质疑列表
  listQuery(formId, dataId) {
    // formId, dataId
    const db = storageService.getTopNav().projectDB;
    return api.get(`queries/${db}/${formId}/${dataId}`).then((resp) => {
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

