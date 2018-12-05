<template>
  <div class="f1-view">
    <!------ title ----->
    <div class="title">
      <!--查看{{currAction.form_des}} #{{dataId}}-->
    </div>
    <div class="btn">
      <el-button class="btn el-button" size="mini" type="primary" @click="goBack">列表</el-button>
      <el-button class="btn el-button btnright" size="mini" v-if="btnRights.isEdit === 1" type="primary" @click="edit">编辑</el-button>
    </div>
    <!------ 输入框 ----->
    <el-table :data="tableStructure" border stripe style="width: 100%" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column prop="fieldName" label="名称" align="center" min-width="80px" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="fieldType" label="输入结果" min-width="200px">
        <template slot-scope="scope">
          <!--{{scope.row}}-->
          <!-- 0静态文本 -->
          <div v-if="scope.row.fieldType.typeId == 0" size="small">{{scope.row.fieldType.value.value}}{{scope.row.fieldType.tail}}</div>
          <!-- 2文本输入 -->
          <el-input disabled style="width: 250px;" v-if="scope.row.fieldType.typeId == 2" size="small" v-model="scope.row.value.value"><el-button slot="append" v-if="scope.row.fieldType.tail">{{scope.row.fieldType.tail}}</el-button></el-input>
          <!-- 1数字类型 -->
          <div  v-if="scope.row.fieldType.typeId == 1">
            <el-input-number disabled size="small" :value="scope.row.value.value"></el-input-number> <span>{{scope.row.fieldType.tail}}</span>
          </div>
          <!-- 4日期 -->
          <el-date-picker
            disabled
            v-if="scope.row.fieldType.typeId == 4"
            size="small"
            v-model="scope.row.value.value"
            type="date"
            placeholder="选择日期"
            :format="scope.row.fieldType.content"
            :value-format="scope.row.fieldType.content">
          </el-date-picker>
          <!-- 6单选 -->
          <el-checkbox-group disabled class="new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length < 3" @change="changeRadio(scope.row, scope.$index)" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group disabled class="endways new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 7下拉 -->
          <el-select disabled v-if="scope.row.fieldType.typeId == 7" size="small" v-model="scope.row.value.value" placeholder="请选择">
            <el-option
              v-for="item in scope.row.fieldType.content"
              :key="item.codeId"
              :label="item.codeValue1+item.codeValue2+item.remark"
              :value="item.codeId">
            </el-option>
          </el-select>
          <!-- 8多选 -->
          <el-checkbox-group disabled v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length < 3" size="small" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group class="endways" disabled v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length >= 3" size="small" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 11自动生成 -->
          <div v-if="scope.row.fieldType.typeId == 11" size="small">{{scope.row.value.value}}{{scope.row.fieldType.tail}}</div>
          <!-- 9文件 -->
          <!-- 3长文本 -->
          <el-input disabled v-if="scope.row.fieldType.typeId == 3" type="textarea"  size="small" maxlength="200" v-model="scope.row.value.value" :rows="3" placeholder="限制200字"></el-input>
          <!-- 5时间 -->
          <el-time-picker
            disabled
            v-if="scope.row.fieldType.typeId == 5"
            size="small"
            v-model="scope.row.value.value"
            :format="scope.row.fieldType.content"
            :value-format="scope.row.fieldType.content">
          </el-time-picker>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f1Service from '@/service/f1';
  import bus from '@/utils/bus';

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
      bus.$emit('TITLE_HEAD', { sub_menu_name: this.currAction.menuName, tag: '查看:' });
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
              if (!isNaN(this.tableValue[v1].value)) {
                this.tableValue[v1].value = this.tableValue[v1].value === null ? this.tableValue[v1].value : Number(this.tableValue[v1].value);
              }
              if (v.fieldCode === v1) {
                v.value = this.tableValue[v1];
                if (v.fieldType.typeId === 6) {
                  v.value.value = v.value.value || v.value.value === 0 ? [null, v.value.value] : [null];
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
        this.JumpOuterPage('NoCRFEdit', this.routeParams);
      },
      goBack() {
        this.JumpPage('NoCRFList');
        // this.$router.back(-1);
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
  .btnright{
    margin-right: 20px;
  }
</style>
