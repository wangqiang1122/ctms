import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  getSiteSubjectList() {
    const db = storageService.getTopNav().project_db;
    return api.get(`f1/listSubject/db/${db}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF1List(formId, params) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f1/listRecord/db/${db}/form/${formId}`, { params }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF1Detail(formId, dataId) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f1/viewRecord/db/${db}/form/${formId}/data/${dataId}`).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getF1Structure(formId) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f1/formStruct/db/${db}/form/${formId}`).then((resp) => {
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
};

