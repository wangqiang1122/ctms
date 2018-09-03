import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  getF2Structure(formId) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/formStruct/db/${db}/form/${formId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF2List(formId, params) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/listRecord/db/${db}/form/${formId}`, { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF2Detail(formId, dataId) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/viewRecord/db/${db}/form/${formId}/data/${dataId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF2HistoryDetail(formId, dataId) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/auditRecord/db/${db}/form/${formId}/data/${dataId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF2ChangeStatus(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/manageRecord/db/${db}/form/${formId}/data/${dataId}`, { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp;
    });
  },
  putF2(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.put(`f2/editRecord/db/${db}/form/${formId}/data/${dataId}`, params).then((resp) => {
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
  createQuery(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.post(`f2/createQuery/db/${db}/form/${formId}/data/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  responseQuery(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.post(`f2/responseQuery/db/${db}/form/${formId}/data/${dataId}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  closeQuery(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/closeQuery/db/${db}/form/${formId}/data/${dataId}`, { params }).then((resp) => {
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
  editQuery(formId, dataId, params) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/editQuery/db/${db}/form/${formId}/data/${dataId}`, { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  listQuery(formId, dataId) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f2/listQuery/db/${db}/form/${formId}/data/${dataId}`).then((resp) => {
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

