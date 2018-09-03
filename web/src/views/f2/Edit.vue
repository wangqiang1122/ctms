<template>
  <div class="f2-view">
    <div class="head">
      <!--编辑: <span>{{routeParams.formId}} {{routeParams.formName}}</span>-->
    </div>
    <div class="el-table-wrap">
      <el-row>
        <el-col :span="6" class="title">CRF ID: {{tHead.CRFId}}</el-col>
        <el-col :span="10" class="title">{{tHead.formCode}} {{tHead.formDes}}</el-col>
        <el-col :span="4" class="title">Rule Status: {{tHead.ruleStatus}}</el-col>
        <el-col :span="4" class="title">DCR: {{tHead.queryStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">机构: {{tHead.siteDes}}</el-col>
        <el-col :span="10" class="title">
          <el-row>
            <el-col :span="8" class="title">受试者: {{tHead.subjectCode}}</el-col>
            <el-col :span="8" class="title">访视: {{tHead.visitDes}}</el-col>
            <el-col :span="8" class="title">提交: {{tHead.submitBy}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="title">Accept: {{tHead.acceptBy}}</el-col>
        <el-col :span="4" class="title">Verify: {{tHead.verifyBy}}</el-col>
      </el-row>
    </div>
    <!--  table CRF数据部分  -->
    <el-table :data="tableStructure" border stripe style="width: 100%" :span-method="objectSpanMethod" :show-header="false" :row-class-name="tableRowClassName" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column label="No." align="left" width="60px">
        <template slot-scope="scope">
          <span v-if="scope.row.rowSpan === '1'">{{scope.row.id}}</span>
          <span v-if="scope.row.rowSpan === '0'">{{scope.row.qName}}</span>
          <span v-if="scope.row.rowSpan === '0'" class="italic">{{scope.row.qIns}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="qName" label="问题" align="right">
        <template slot-scope="scope">
          <div>{{scope.row.qName}}</div>
          <div class="italic">{{scope.row.qIns}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="valueType" label="值">
        <template slot-scope="scope">
          <div v-show="scope.row.isShow">
            <!-- 1静态文本 -->
            <div v-if="scope.row.valueType.type == 1" size="small">{{scope.row.valueType.content}}{{scope.row.valueType.tail}}</div>
            <!-- 2文本输入 -->
            <el-input style="width: 250px;" v-if="scope.row.valueType.type == 2" size="small" v-model="scope.row.value.value" :disabled="false"><el-button slot="append" v-if="scope.row.valueType.tail">{{scope.row.valueType.tail}}</el-button></el-input>
            <!-- 3数字类型 -->
            <el-input-number v-if="scope.row.valueType.type == 3" size="small" v-model="scope.row.value.value"></el-input-number>
            <!-- 4日期 -->
            <el-date-picker
              v-if="scope.row.valueType.type == 4"
              size="small"
              v-model="scope.row.value.value"
              type="date"
              placeholder="选择日期"
              :format="scope.row.valueType.content"
              :value-format="scope.row.valueType.content">
            </el-date-picker>
            <!-- 5单选 -->
            <el-checkbox-group class="new-radio" v-if="scope.row.valueType.type == 5 && scope.row.valueType.content.length < 3" @change="changeRadio(scope.row, scope.$index)" v-model="scope.row.value.value">
              <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group class="endways new-radio" v-if="scope.row.valueType.type == 5 && scope.row.valueType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value.value">
              <el-radio :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-radio>
            </el-radio-group>
            <!-- 6下拉 -->
            <el-select v-if="scope.row.valueType.type == 6" size="small" v-model="scope.row.value.value" placeholder="请选择">
              <el-option
                v-for="item in scope.row.valueType.content"
                :key="item.code_id"
                :label="item.code_des"
                :value="item.code_des">
              </el-option>
            </el-select>
            <!-- 7多选 -->
            <el-checkbox-group v-if="scope.row.valueType.type == 7 && scope.row.valueType.content.length < 3" size="small" v-model="scope.row.value.value">
              <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group
              class="endways"
              v-if="scope.row.valueType.type == 7 && scope.row.valueType.content.length >= 3"
              size="small"
              v-model="scope.row.value.value">
              <el-checkbox :label="item.code_id" :key="item.code_id" v-for="item in scope.row.valueType.content">{{item.code_des}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <!-- 8自动生成 -->
            <div v-if="scope.row.valueType.type == 8" size="small">{{scope.row.valueType.content}}{{scope.row.valueType.tail}}</div>
            <!-- 9文件 -->
            <!-- 10长文本 -->
            <el-input v-if="scope.row.valueType.type == 10" type="textarea"  size="small" maxlength="200" v-model="scope.row.value.value" :rows="3" placeholder="限制200字"></el-input>
            <!-- 11时间 -->
            <el-time-picker
              v-if="scope.row.valueType.type == 11"
              size="small"
              v-model="scope.row.value.value"
              :format="scope.row.valueType.content"
              :value-format="scope.row.valueType.content">
            </el-time-picker>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button class="btn" size="mini" type="primary" @click="goBack">返回</el-button>
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
    },
    methods: {
      getStructure(formId) {
        this.loading1 = true;
        f2Service.getF2Structure(formId).then((resp) => {
          this.loading1 = false;
          if (resp) {
            this.tableStructure = resp.fields;
            this.tableStructure.forEach((v) => {
              v.isShow = true;
            });
            this.getDetail(this.routeParams.formId, this.routeParams.dataId);
          }
        });
      },
      getDetail(formId, dataId) {
        f2Service.getF2Detail(formId, dataId).then((resp) => {
          if (resp) {
            this.rights = resp.rights;
            this.tHead = resp.tHead;
            this.tBody = resp.tBody;
            this.tableStructure.forEach((v) => {
              Object.keys(this.tBody).forEach((v1) => {
                if (v.id === v1) {
                  v.value = this.tBody[v1];
                  if (v.valueType.type === '5') {
                    v.value.value = v.value.value ? [null, v.value.value] : [null];
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
          if (v.valueType.type === '1' || v.valueType.type === '8') {
            params[v.id] = v.valueType.content;
          } else if (v.valueType.type === '5') {
            if (v.value.value.length === 1) {
              params[v.id] = '';
            } else {
              params[v.id] = v.value.value[1];
            }
          } else {
            params[v.id] = v.value.value;
          }
        });
        f2Service.putF2(this.routeParams.formId, this.routeParams.dataId, params).then((resp) => {
          if (resp) {
            this.$message({ message: '保存成功！', type: 'success' });
            this.goBack();
          }
        });
      },
      goBack() {
        this.JumpOuterPage('F2_View');
      },
      objectSpanMethod({ row, columnIndex }) {
        const d = row.rowSpan;
        if (d === '0') {
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
        if (row.rowSpan === '0') {
          return 'warning-row';
        }
        return '';
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
            if (v.valueType.skip.length >= 0) {
              v.valueType.skip.forEach((v1) => {
                if (v1.checkValue === v.value.value[1]) {
                  this.tableStructure.forEach((v2) => {
                    const arr = v1.skipQno.split(',');
                    if (arr.indexOf(v2.id) >= 0) {
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
  };
</script>

<style scoped>

  .head {
    text-align: center;
    margin: 15px 0;
  }

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
