import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  // 获取表数据接结构
  getF2Structure(formId) {
    const db = storageService.getTopNav().projectDB;
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
  // 获取列表数据
  getF2List(formId, params) {
    const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}
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
  getF2HistoryDetail(formId, dataId) {
    const db = storageService.getTopNav().projectDB;
    return api.get(`audit-records/${db}/${formId}/${dataId}`).then((resp) => {
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
  getF2ChangeStatus(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    // /${db}/${formId}/${dataId}
    return api.put(`crf-state/${db}/${formId}/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp;
    });
  },
  // 保存数据
  putF2(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.put(`records/${db}/${formId}/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  // 确认规则没有改
  confirmRule(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    // /${formId}/${dataId}
    return api.put(`violations/${db}`, params).then((resp) => {
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
  createQuery(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.post(`queries/${db}/${formId}/${dataId}`, params).then((resp) => {
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
  responseQuery(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.put(`queries/${db}/${formId}/${dataId}`, params).then((resp) => {
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
  closeQuery(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.put(`queries/${db}/${formId}/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  // 删除质疑
  deleteQuery(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.put(`queries/${db}/${formId}/${dataId}`, params).then((resp) => {
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
  editQuery(formId, dataId, params) {
    const db = storageService.getTopNav().projectDB;
    return api.put(`queries/${db}/${formId}/${dataId}`, params).then((resp) => {
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

