<template>
  <div class="f2-view">
    <div class="head">
      <!--编辑: <span>{{routeParams.formId}} {{routeParams.formName}}</span>-->
    </div>
    <div class="el-table-wrap">
      <el-row>
        <el-col :span="6" class="title">CRF ID: {{tHead.CRFId}}</el-col>
        <el-col :span="10" class="title">{{tHead.formCode}} {{tHead.formName}}</el-col>
        <el-col :span="4" class="title">通过规则: {{tHead.ruleState}}</el-col>
        <el-col :span="4" class="title">通过质疑: {{tHead.queryStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">机构: {{tHead.siteName}}</el-col>
        <el-col :span="10" class="title">
          <el-row>
            <el-col :span="8" class="title">受试者: {{tHead.subjectCode}}</el-col>
            <el-col :span="8" class="title">访视: {{tHead.visitName}}</el-col>
            <el-col :span="8" class="title">数据提交: {{tHead.submitBy}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="title">数据接受: {{tHead.acceptOn}}</el-col>
        <el-col :span="4" class="title">数据审核: {{tHead.verifyOn}}</el-col>
      </el-row>
    </div>
    <!--  table CRF数据部分  -->
    <el-table :data="tableStructure" border stripe style="width: 100%" :span-method="objectSpanMethod" :show-header="false" :row-class-name="tableRowClassName" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column label="No." align="left" width="60px">
        <template slot-scope="scope">
          <span v-if="scope.row.rowSpan === 1" :class="scope.row.isBold==0?'':'bold'">{{scope.row.fieldCode}}</span>
          <span v-if="scope.row.rowSpan === 0" :class="scope.row.isBold==0?'':'bold'">{{scope.row.fieldName}}</span>
          <span v-if="scope.row.rowSpan === 0" class="italic" :class="scope.row.isBold==0?'':'bold'">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fieldName" label="问题" align="right">
        <template slot-scope="scope">
          <div>{{scope.row.fieldName}}</div>
          <div class="italic">{{scope.row.remark}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="valueType" label="值">
        <template slot-scope="scope">
          <div v-show="scope.row.isShow">
            <!--{{scope.row}}-->
            <!-- 0静态文本 -->
            <div v-if="scope.row.fieldType.typeId == 0" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
            <!-- 2文本输入 -->
            <el-input style="width: 250px;" v-if="scope.row.fieldType.typeId == 2" size="small" v-model="scope.row.value.value" :disabled="false"><el-button slot="append" v-if="scope.row.fieldType.tail">{{scope.row.fieldType.tail}}</el-button></el-input>
            <!-- 1数字类型 -->
            <el-input-number v-if="scope.row.fieldType.typeId == 1" size="small" v-model="scope.row.value.value"  @change="numberChange(scope.row.value)"></el-input-number>
            <!-- 4日期 -->
            <el-date-picker
              v-if="scope.row.fieldType.typeId == 4"
              size="small"
              v-model="scope.row.value.value"
              type="date"
              placeholder="选择日期"
              :format="scope.row.fieldType.content"
              :value-format="scope.row.fieldType.content">
            </el-date-picker>
            <!-- 6单选 -->
            <el-checkbox-group class="new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length < 3" @change="changeRadio(scope.row, scope.$index)" v-model="scope.row.value.value">
              <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group class="endways new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value.value">
              <el-radio :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-radio>
            </el-radio-group>
            <!-- 7下拉 -->
            <el-select v-if="scope.row.fieldType.typeId == 7" size="small" v-model="scope.row.value.value" placeholder="请选择">
              <el-option
                v-for="item in scope.row.fieldType.content"
                :key="item.codeId"
                :label="item.codeValue1+item.codeValue2+item.remark"
                :value="item.codeId">
              </el-option>
            </el-select>
            <!-- 8多选 -->
            <el-checkbox-group v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length < 3" size="small" v-model="scope.row.value.value">
              <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group
              class="endways"
              v-if="scope.row.fieldType.typeId == 7 && scope.row.fieldType.content.length >= 3"
              size="small"
              v-model="scope.row.value.value">
              <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <!-- 11自动生成 -->
            <div v-if="scope.row.fieldType.typeId == 11" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
            <!-- 9文件 -->
            <!-- 3长文本 -->
            <el-input v-if="scope.row.fieldType.typeId == 3" type="textarea"  size="small" maxlength="200" v-model="scope.row.value.value" :rows="3" placeholder="限制200字"></el-input>
            <!-- 5时间 -->
            <el-time-picker
              v-if="scope.row.fieldType.typeId == 5"
              size="small"
              v-model="scope.row.value.value"
              :format="scope.row.fieldType.content"
              :value-format="scope.row.fieldType.content">
            </el-time-picker>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button class="btn" size="mini" type="primary" @click="goBack">取消保存</el-button>
      <el-button class="btn" size="mini" type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f2Service from '@/service/f2';
  import bus from '@/utils/bus';

  export default {
    name: 'f2',
    data() {
      return {
        // input 数字输入
        num: null,
        // -------- 缓存信息
        currAction: {},
        // -------- route params
        routeParams: {
          formId: '',
          formName: '',
          dataId: '',
        },
        // -------- 表结构
        tableStructure: [],
        tHead: {},
        fileList: [],
        isInput: false, // 文本输入框是否被禁止
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      if (Object.keys(this.$route.params).length === 0) {
        this.routeParams = storageService.getRouteParams();
      } else {
        this.routeParams = this.$route.params;
        storageService.setRouteParams(this.$route.params);
      }
      this.getStructure(this.routeParams.formId);
      bus.$emit('TITLE_HEAD', { sub_menu_name: this.routeParams.formId + this.routeParams.formName, tag: '编辑:' });
      bus.$emit('indexClass', true);
    },
    methods: {
      getStructure(formId) {
        this.loading1 = true;
        f2Service.getF2Structure(formId).then((resp) => {
          this.loading1 = false;
          if (resp) {
            this.tableStructure = resp.fieldList;
            this.tableStructure.forEach((v) => {
              v.isShow = true;
              if (v.fieldType.typeId === 1) {
                v.value = { value: 0 };
              }
            });
            this.getDetail(this.routeParams.formId, this.routeParams.recordId);
          }
        });
      },
      getDetail(formId, dataId) {
        f2Service.getF2Detail(formId, dataId).then((resp) => {
          if (resp) {
            this.rights = resp.rights;
            this.tHead = resp.CRFHeader;
            this.tBody = resp.body;
            this.tableStructure.forEach((v) => {
              Object.keys(this.tBody).forEach((v1) => {
                if (v.fieldCode === v1) {
                  if (!isNaN(this.tBody[v1].value)) {
                    this.tBody[v1].value = this.tBody[v1].value === null ? this.tBody[v1].value : Number(this.tBody[v1].value);
                  }
                  v.value = this.tBody[v1];
                  if (v.fieldType.typeId === 6 && v.fieldType.typeId !== null) {
                    if (v.fieldType.content.length <= 3) {
                      v.value.value = v.value.value || v.value.value === 0 ? [null, v.value.value] : [null];
                    }
                  }
                }
              });
            });
          }
        });
      },
      save() {
        const params = {};
        this.tableStructure.forEach((v) => {
          if (v.fieldType.typeId === 0 || v.fieldType.typeId === 11) {
            params[v.fieldCode] = v.fieldType.content;
          } else if (v.fieldType.typeId === 6) {
            if (!v.value.value) {
              v.value.value = '';
            }
            if (v.value.value.length === 1) {
              params[v.fieldCode] = '';
            } else {
              params[v.fieldCode] = v.value.value[1];
            }
            if (!(v.value.value instanceof Array)) {
              params[v.fieldCode] = v.value.value;
            }
          } else {
            params[v.fieldCode] = v.value.value;
          }
        });
        alert('需要返回给我recordId 结构看rap');
        f2Service.putF2(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
          if (resp) {
            this.$message({ message: '保存成功！', type: 'success' });
            this.JumpOuterPage('F2_View', { formId: this.routeParams.formId, recordId: resp.recordId });
            this.goBack();
          }
        });
      },
      goBack() {
        this.JumpOuterPage('F2_View', { formId: this.routeParams.formId, recordId: this.routeParams.recordId });
        // this.$router.back(-1);
      },
      objectSpanMethod({ row, columnIndex }) {
        const d = row.rowSpan;
        if (d === 0) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 3,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
      tableRowClassName({ row }) {
        if (row.rowSpan === 0) {
          return 'warning-row';
        }
        return '';
      },
      numberChange() {
      },
      changeRadio(row, index) {
        /**
         * 将checkbox改造为可以反向选中的radio组件
         * */
        // checkbox以数组形式保存，第一个值为null，从第2个值开始存值
        const arr = row.value.value;
        if (arr.length === 3) {
          // 第二三个值不同，取后者
          this.tableStructure[index].value.value = [null, arr[2]];
        }
      },
    },
    watch: {
      tableStructure: {
        handler(newValue) {
          this.tableStructure.forEach((v) => {
            v.isShow = true;
          });
          newValue.forEach((v) => {
            if (v.fieldType.skip === null) {
              v.fieldType.skip = [];
            }
            if (v.fieldType.skip.length >= 0) {
              v.fieldType.skip.forEach((v1) => {
                if (!v.value.value) return;
                if (v.value.value.length === 1) {
                  this.tableStructure.forEach((v2) => {
                    const arr = v1.skipFieldCode.split(',');
                    if (arr.indexOf(v2.fieldCode) >= 0) {
                      v2.isShow = false;
                      v2.value.value = '';
                    }
                  });
                  return;
                }
                if (v.value && v1.conditionValue === v.value.value[1].toString()) {
                  this.tableStructure.forEach((v2) => {
                    const arr = v1.skipFieldCode.split(',');
                    if (arr.indexOf(v2.fieldCode) >= 0) {
                      v2.isShow = false;
                      v2.value.value = '';
                    }
                  });
                }
              });
            }
          });
        },
        deep: true,
      },
    },
    beforeRouteLeave(to, from, next) {
      bus.$emit('indexClass', false);
      next();
    },
  };
</script>

<style scoped>

  .head {
    text-align: center;
    margin: 15px 0;
  }
  /*.f2-view {*/
    /*background-color: burlywood;*/
  /*}*/
  .head span {
    font-weight: 500;
    font-size: 18px;
    color: #2B97EF;
  }

  .italic {
    font-style:italic;
    font-weight: normal;
  }

  .el-table-wrap {
    margin-bottom: 10px;
  }

  .el-table-wrap .el-row{
    background: #FAFAFA;
    border: 1px solid #EBEBEB;
    border-radius: 0;
    height: 50px;
    line-height: 50px;
  }

  .el-table-wrap .el-row .el-row {
    border: none;
    height: 48px;
    line-height: 48px;
  }

  .el-table-wrap .title {
    padding: 0 10px;
  }
  .el-table-wrap .el-row .el-col{
    height: 50px;
    border-right: 1px solid #EBEBEB;
  }
  .el-table-wrap .el-row .el-col:last-child{
    border-right: none;
  }

  .btn {
    text-align: right;
    margin-bottom: 10px;
  }
</style>
