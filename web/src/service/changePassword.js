import api from '@/service/http';
import { MessageBox } from 'element-ui';

export default {
  ChnagePassword(params) {
    api.put('changePwd', params).then((resp) => {
      if (resp.code === 200) {
        return true;
      } else {
        MessageBox(resp.message, '提示', {
          confirmButtonText: '确定',
        });
      }
    });
  },
};
