import api from '@/service/http';
import storageService from '@/service/storage';
import { MessageBox } from 'element-ui';

export default {
  getVisitProcess(subjectId) {
    const db = storageService.getTopNav().projectDB;
    return api.get(`visit-process/${db}`, { params: { subjectId } }).then((resp) => {
      if (resp.code !== 200) {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
        return null;
      }
      return resp.result;
    });
  },
  getVisitList(subjectId) {
    const db = storageService.getTopNav().projectDB;
    // type: 0：all；1：next
    return api.get(`visit-next/${db}`, { params: { subjectId } }).then((resp) => {
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
    const db = storageService.getTopNav().projectDB;
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
    // 删除罪行访视
  delVisit(val) {
    const db = storageService.getTopNav().projectDB;
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
