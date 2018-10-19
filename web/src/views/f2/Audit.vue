<template>
  <div class="f2-audit">
    <!--<div class="head">-->
      <!--查看历史: <span>{{routeParams.formId}} {{routeParams.formName}}</span>-->
    <!--</div>-->
    <div class="btn">
      <el-button class="btn" size="mini" type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="el-table-wrap">
      <el-row>
        <el-col :span="6" class="title">CRF ID: {{tHead.CRFID}}</el-col>
        <el-col :span="10" class="title">{{tHead.formCode}} {{tHead.formName}}</el-col>
        <el-col :span="4" class="title">Rule Status: {{tHead.ruleStatus}}</el-col>
        <el-col :span="4" class="title">DCR: {{tHead.queryStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">机构: {{tHead.siteDes}}</el-col>
        <el-col :span="10" class="title">
          <el-row>
            <el-col :span="8" class="title">受试者: {{tHead.acceptBy}}</el-col>
            <el-col :span="8" class="title">访视: {{tHead.visitName}}</el-col>
            <el-col :span="8" class="title">提交: {{tHead.submitBy}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="title">Accept: {{tHead.acceptBy}}</el-col>
        <el-col :span="4" class="title">Verify: {{tHead.verifyBy}}</el-col>
      </el-row>
    </div>
    <!--  table CRF数据部分  -->
    <el-table :data="tableStructure" border stripe style="width: 100%" :span-method="objectSpanMethod" :row-class-name="tableRowClassName" @cell-click="cellClick" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column label="#" align="left" width="60px" fixed>
        <template slot-scope="scope">
          <span v-if="scope.row.rowSpan === 1">{{scope.row.fieldCode}}</span>
          <span v-if="scope.row.rowSpan === 0">{{scope.row.fieldName}}</span>
          <span v-if="scope.row.rowSpan === 0" class="italic">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="qName" label="问题" align="right" min-width="200px" fixed>
        <template slot-scope="scope">
          <div>{{scope.row.fieldName}}</div>
          <div class="italic">{{scope.row.remark}}</div>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" v-for="(value, key) in editHistoryFields" :key="key" :prop="key" :label="value.updateOn">
        <el-table-column :prop="key" :label="value.updateBy">
          <template slot-scope="scope">
            <!--{{key}}-->
            <!--{{scope.row}}-->
            <div>{{scope.row[key]}}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column min-width="280px" prop="valueType" label="最后提交值">
        <template slot-scope="scope">
          <!-- 0静态文本 -->
          <div v-if="scope.row.fieldType.typeId == 0" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
          <!-- 2文本输入 -->
          <el-input disabled style="width: 250px;" v-if="scope.row.fieldType.typeId == 2" size="small" v-model="scope.row.value.value"><el-button slot="append" v-if="scope.row.fieldType.tail">{{scope.row.fieldType.tail}}</el-button></el-input>
          <!-- 1数字类型 -->
          <el-input-number disabled v-if="scope.row.fieldType.typeId == 1" size="small" v-model="scope.row.value.value"></el-input-number>
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
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group disabled class="endways new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 7下拉 -->
          <el-select disabled v-if="scope.row.fieldType.typeId == 7" size="small" v-model="scope.row.value.value" placeholder="请选择">
            <el-option
              v-for="item in scope.row.fieldType.content"
              :key="item.codeId"
              :label="item.codeValue1"
              :value="item.codeValue1">
            </el-option>
          </el-select>
          <!-- 8多选 -->
          <el-checkbox-group disabled v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length < 3" size="small" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group class="endways" disabled v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length >= 3" size="small" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 11自动生成 -->
          <div v-if="scope.row.fieldType.typeId == 11" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
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
        tHead: {
          CRFId: '',
          formCode: '',
          queryStatus: '',
          ruleStatus: '',
          siteCode: '',
          siteDes: '',
          subjectCode: '',
          updateby: '',
          updateon: '',
        },
        editHistoryFields: [],
        editHistoryData: [],
        fileList: [],
        loading1: false,
        rowLen: 3,
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
      bus.$emit('TITLE_HEAD', { sub_menu_name: `${this.routeParams.formId}${this.routeParams.formName}`, tag: 'Audit:' });
    },
    methods: {
      getStructure(formId) {
        this.loading1 = true;
        f2Service.getF2Structure(formId).then((resp) => {
          this.loading1 = false;
          if (resp) {
            this.tableStructure = resp.fieldList;
            this.getDetail(this.routeParams.formId, this.routeParams.recordId);
          }
        });
      },
      getDetail(formId, dataId) {
        f2Service.getF2Detail(formId, dataId).then((resp) => {
          if (resp) {
            this.tHead = resp.CRFHeader;
            this.tableValue = resp.body;
            this.tableStructure.forEach((v) => {
              Object.keys(this.tableValue).forEach((v1) => {
                if (v.fieldCode === v1) {
                  if (!isNaN(this.tableValue[v1].value)) {
                    this.tableValue[v1].value = Number(this.tableValue[v1].value);
                  }
                  v.value = this.tableValue[v1];
                  if (v.fieldType.typeId === 6) {
                    v.value.value = v.value.value || v.value.value === 0 ? [null, v.value.value] : [null];
                  }
                }
              });
            });
            this.getHistory(this.routeParams.formId, this.routeParams.recordId, { subjectId: this.tHead.subjectCode });
          }
        });
      },
      getHistory(formId, dataId, params) {
        f2Service.getF2HistoryDetail(formId, dataId, params).then((resp) => {
          if (resp) {
            this.editHistoryFields = resp.head;
            this.editHistoryData = resp.body;
            this.tableStructure.forEach((v) => {
              // 历史数据的个数
              if (v.rowSpan === 1) {
                if (!this.editHistoryData[v.fieldCode]) return;
                const l = this.editHistoryData[v.fieldCode].length;
                this.rowLen += l;
                for (let i = 1; i <= l; i += 1) {
                  // 将每个历史数据的值，横向寻找对应的key。付给该字段值
                  v[`auditValue${i - 1}`] = this.editHistoryData[v.fieldCode][i - 1];
                }
              }
            });
          }
        });
      },
      goBack() {
        // this.JumpOuterPage('F2_View');
        this.$router.back(-1);
      },
      objectSpanMethod({ row, columnIndex }) {
        const d = row.rowSpan;
        if (d === 0) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: this.rowLen,
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
      cellClick(row, column) {
        if (column.property === 'rule') {
          this.ruleConfirm(row.value, row);
        }
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
