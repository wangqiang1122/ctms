import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  getVisitProcess(subjectId) {
    const db = storageService.getTopNav().projectId;
    return api.get(`visit-process1/${db}`, { params: { subjectId } }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getVisitList(subjectId, type) {
    const db = storageService.getTopNav().projectId;
    // type: 0：all；1：next
    return api.get(`visits-next/${db}`, { params: { subjectId, type } }).then((resp) => {
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
    const db = storageService.getTopNav().projectId;
    return api.post(`visits/${db}`, params).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return true;
    });
  },
  delVisit(val) {
    const db = storageService.getTopNav().projectId;
    return api.delete(`visits/${db}`, { params: val }).then((resp) => {
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
