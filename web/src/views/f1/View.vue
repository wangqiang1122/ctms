<template>
  <div class="f1-view">
    <!------ title ----->
    <div class="title">
      查看{{currAction.form_des}} #{{dataId}}
    </div>
    <div class="btn">
      <el-button class="btn" size="mini" type="primary" @click="goBack">返回</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isEdit === 1" type="primary" @click="edit">编辑</el-button>
    </div>
    <!------ 输入框 ----->
    <el-table :data="tableStructure" border stripe style="width: 100%" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column prop="qName" label="名称" align="center" min-width="80px" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="valueType" label="输入结果" min-width="200px">
        <template slot-scope="scope">
          <!-- 1静态文本 -->
          <div v-if="scope.row.valueType.type == 1" size="small">{{scope.row.valueType.content}}{{scope.row.valueType.tail}}</div>
          <!-- 2文本输入 -->
          <el-input disabled style="width: 250px;" v-if="scope.row.valueType.type == 2" size="small" v-model="scope.row.value"><el-button v-if="scope.row.valueType.tail" slot="append">{{scope.row.valueType.tail}}</el-button></el-input>
          <!-- 3数字类型 -->
          <el-input-number disabled v-if="scope.row.valueType.type == 3" size="small" v-model="scope.row.value"></el-input-number>
          <!-- 4日期 -->
          <el-date-picker
            disabled
            v-if="scope.row.valueType.type == 4"
            size="small"
            v-model="scope.row.value"
            type="date"
            placeholder="选择日期"
            :format="scope.row.valueType.content"
            :value-format="scope.row.valueType.content">
          </el-date-picker>
          <!-- 5单选 -->
          <el-checkbox-group disabled class="new-radio" v-if="scope.row.valueType.type == 5 && scope.row.valueType.content.length < 3" @change="changeRadio(scope.row, scope.$index)" v-model="scope.row.value">
            <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group disabled class="endways new-radio" v-if="scope.row.valueType.type == 5 && scope.row.valueType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value">
            <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 6下拉 -->
          <el-select disabled v-if="scope.row.valueType.type == 6" size="small" v-model="scope.row.value" placeholder="请选择">
            <el-option
              v-for="item in scope.row.valueType.content"
              :key="item.code_id"
              :label="item.code_des"
              :value="item.code_des">
            </el-option>
          </el-select>
          <!-- 7多选 -->
          <el-checkbox-group disabled v-if="scope.row.valueType.type == 7" size="small" v-model="scope.row.value">
            <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 8自动生成 -->
          <div v-if="scope.row.valueType.type == 8" size="small">{{scope.row.valueType.content}}{{scope.row.valueType.tail}}</div>
          <!-- 9文件 -->
          <!-- 10长文本 -->
          <el-input disabled v-if="scope.row.valueType.type == 10" type="textarea"  size="small" maxlength="200" v-model="scope.row.value" :rows="1" placeholder="限制200字"></el-input>
          <!-- 11时间 -->
          <el-time-picker
            disabled
            v-if="scope.row.valueType.type == 11"
            size="small"
            v-model="scope.row.value"
            :format="scope.row.valueType.content"
            :value-format="scope.row.valueType.content">
          </el-time-picker>
        </template>
      </el-table-column>
    </el-table>
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
        dataId: '',
        btnRights: [],
        tableValue: [],
        tableStructure: [],
        fileList: [],
      };
    },
    created() {
      this.dataId = this.$route.params.id;
      this.currAction = storageService.getLv3Nav();
      this.getStructure(this.currAction.formId);
      this.getRight(this.currAction.formId);
    },
    methods: {
      getStructure(formId) {
        this.loading1 = true;
        f1Service.getF1Structure(formId).then((resp) => {
          this.tableStructure = resp.fieldList;
          this.getDetail(this.currAction.formId, this.dataId);
        });
      },
      getDetail(formId, dataId) {
        f1Service.getF1Detail(formId, dataId).then((resp) => {
          this.loading1 = false;
          // this.btnRights = resp.rights;
          this.tableValue = resp.body;
          this.tableStructure.forEach((v) => {
            Object.keys(this.tableValue).forEach((v1) => {
              if (v.id === v1) {
                v.value = this.tableValue[v1];
                if (v.valueType.type === '5') {
                  v.value = v.value ? [null, v.value] : [null];
                }
              }
            });
          });
        });
      },
      getRight(formId) {
        f1Service.getPermissonsCRF(formId).then((resp) => {
          this.btnRights = resp;
        });
      },
      edit() {
        this.JumpOuterPage('F1_Edit', this.routeParams);
      },
      goBack() {
        // this.JumpPage(this.currAction, 'List');
        this.$router.back(-1);
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
  .f1-view {
    position: relative;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }

  .btn {
    text-align: right;
    margin-bottom: 10px;
  }
</style>
