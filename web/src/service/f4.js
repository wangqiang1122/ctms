import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  getVisitProcess(subjectCode) {
    const db = storageService.getTopNav().project_db;
    return api.get(`f4/listVisitProcess/db/${db}`, { params: { subjectCode } }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getVisitList(subjectCode, type) {
    const db = storageService.getTopNav().project_db;
    // type: 0：all；1：next
    return api.get(`f4/listVisit/db/${db}`, { params: { subjectCode, type } }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  addVisit(params) {
    const db = storageService.getTopNav().project_db;
    return api.post(`f4/addVisit/db/${db}`, params).then((resp) => {
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
