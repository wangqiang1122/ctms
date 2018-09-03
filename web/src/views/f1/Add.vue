<template>
  <div class="f1-add">
    <!------ title ----->
    <div class="title">
      {{currAction.sub_menu_name}}
    </div>
    <!------ 输入框 ----->
    <el-table :data="tableStructure" border stripe style="width: 100%" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column prop="qName" label="名称" align="center" min-width="80px" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="valueType" label="输入结果" min-width="200px">
        <template slot-scope="scope">
          <!-- 1静态文本 -->
          <div v-if="scope.row.valueType.type == 1" size="small">{{scope.row.valueType.content}}{{scope.row.valueType.tail}}</div>
          <!-- 2文本输入 -->
          <el-input style="width: 250px;" v-if="scope.row.valueType.type == 2" size="small" v-model="scope.row.value"><el-button slot="append" v-if="scope.row.valueType.tail">{{scope.row.valueType.tail}}</el-button></el-input>
          <!-- 3数字类型 -->
          <el-input-number v-if="scope.row.valueType.type == 3" size="small" v-model="scope.row.value"></el-input-number>
          <!-- 4日期 -->
          <el-date-picker
            v-if="scope.row.valueType.type == 4"
            size="small"
            v-model="scope.row.value"
            type="date"
            placeholder="选择日期"
            :format="scope.row.valueType.content"
            :value-format="scope.row.valueType.content">
          </el-date-picker>
          <!-- 5单选 -->
          <el-checkbox-group class="new-radio" v-if="scope.row.valueType.type == 5 && scope.row.valueType.content.length < 3" @change="changeRadio(scope.row, scope.$index)" v-model="scope.row.value">
            <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group class="endways new-radio" v-if="scope.row.valueType.type == 5 && scope.row.valueType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value">
            <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 6下拉 -->
          <el-select v-if="scope.row.valueType.type == 6" size="small" v-model="scope.row.value" placeholder="请选择">
            <el-option
              v-for="item in scope.row.valueType.content"
              :key="item.code_id"
              :label="item.code_des"
              :value="item.code_des">
            </el-option>
          </el-select>
          <!-- 7多选 -->
          <el-checkbox-group v-if="scope.row.valueType.type == 7" size="small" v-model="scope.row.value">
            <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 8自动生成 -->
          <div v-if="scope.row.valueType.type == 8" size="small">{{scope.row.valueType.content}}{{scope.row.valueType.tail}}</div>
          <!-- 9文件 -->
          <!-- 10长文本 -->
          <el-input v-if="scope.row.valueType.type == 10" type="textarea"  size="small" maxlength="200" v-model="scope.row.value" :rows="1" placeholder="限制200字"></el-input>
          <!-- 11时间 -->
          <el-time-picker
            v-if="scope.row.valueType.type == 11"
            size="small"
            v-model="scope.row.value">
          </el-time-picker>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button size="small" @click="goBack">返 回</el-button>
      <el-button size="small" type="primary" @click="save">保 存</el-button>
    </div>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f1Service from '@/service/f1';

  export default {
    name: 'f1',
    data() {
      return {
        loading1: false,
        currAction: {},
        tableStructure: [],
        fileList: [],
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      this.getStructure(this.currAction.form_id);
    },
    methods: {
      getStructure(formId) {
        this.loading1 = true;
        f1Service.getF1Structure(formId).then((resp) => {
          this.loading1 = false;
          this.tableStructure = resp.fields;
          this.tableStructure.forEach((v) => {
            if (v.valueType.type === '5') {
              v.value = v.value ? [null, v.value] : [null];
            }
          });
        });
      },
      save() {
        const params = {};
        this.tableStructure.forEach((v) => {
          if (v.valueType.type === '1' || v.valueType.type === '8') {
            params[v.id] = v.valueType.content;
          } else if (v.valueType.type === '5') {
            if (v.value.length === 1) {
              params[v.id] = '';
            } else {
              params[v.id] = v.value[1];
            }
          } else {
            params[v.id] = v.value;
          }
        });
        f1Service.postF1(this.currAction.form_id, params).then((resp) => {
          if (resp) {
            this.$message({ message: '新增成功！', type: 'success' });
            this.JumpPage(this.currAction, 'List');
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      changeRadio(row, index) {
        /**
         * 将checkbox改造为可以反向选中的radio组件
         * */
          // checkbox以数组形式保存，第一个值为null，从第2个值开始存值
        const arr = row.value;
        if (arr.length === 3) {
          // 第二三个值不同，取后者
          this.tableStructure[index].value = [null, arr[2]];
        }
      },
    },
  };
</script>

<style scoped>
  .f1-add {
    position: relative;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }
</style>
