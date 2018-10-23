<template>
  <div class="f2-view">
    <!--<div class="head">-->
      <!--查看: <span>{{routeParams.formId}} {{routeParams.formName}}</span>-->
    <!--</div>-->
    <div class="btn">
      <el-button class="btn" size="mini" type="primary" @click="goBack">返回</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isEdit === 1" type="primary" @click="edit">编辑CRF</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isRead" type="primary" @click="jump">查看历史</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isManage=== 1" type="primary" @click="queryOpen(0)">DM质疑</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isManageAccept=== 1" type="primary" @click="queryOpen(1)">审核质疑</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.analyze=== 1" type="primary">分析</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isSubmit === 1" type="primary" @click="changeStatus(0)">提交</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isVerify=== 1" type="primary" @click="changeStatus(1)">DM接受</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isVerifyAccept === 1" type="primary" @click="changeStatus(2)">审核接受</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isUnlock=== 1" type="primary"  @click="changeStatus(4)">解锁</el-button>
      <el-button class="btn" size="mini" v-if="btnRights.isLock=== 1" type="primary"  @click="changeStatus(3)">锁定</el-button>
      <!--<el-button class="btn" size="mini" v-if="btnRights.delete=== 1" type="primary">删除</el-button>-->
    </div>
    <div class="el-table-wrap">
      <el-row>
        <el-col :span="6" class="title">CRF ID: {{tHead.CRFId}}</el-col>
        <el-col :span="10" class="title">{{tHead.formCode}} {{tHead.formName}}</el-col>
        <el-col :span="4" class="title">Rule Status: {{tHead.ruleState}}</el-col>
        <el-col :span="4" class="title">DCR: {{tHead.queryStatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">机构: {{tHead.siteName}}</el-col>
        <el-col :span="10" class="title">
          <el-row>
            <el-col :span="8" class="title">受试者: {{tHead.subjectCode}}</el-col>
            <el-col :span="8" class="title">访视: {{tHead.visitName}}</el-col>
            <el-col :span="8" class="title">提交: {{tHead.submitBy}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="title">Accept: {{tHead.acceptOn}}</el-col>
        <el-col :span="4" class="title">Verify: {{tHead.verifyOn}}</el-col>
      </el-row>
    </div>
    <!--  table CRF数据部分  -->
    <el-table :data="tableStructure" border stripe style="width: 100%" :span-method="objectSpanMethod" :show-header="false" :row-class-name="tableRowClassName" @cell-click="cellClick" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column label="No." align="left" width="60px">
        <template slot-scope="scope">
          <span v-if="scope.row.rowSpan === 1">{{scope.row.fieldCode}}</span>
          <span v-if="scope.row.rowSpan === 0">{{scope.row.fieldName}}</span>
          <span v-if="scope.row.rowSpan === 0" class="italic">{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fieldName" label="问题" align="right">
        <template slot-scope="scope">
          <div>{{scope.row.fieldName}}</div>
          <div class="italic">{{scope.row.remark}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="fieldType" label="值">
        <template slot-scope="scope">
          <!--{{scope.row}}-->
          <!-- 0静态文本 -->
          <div v-if="scope.row.fieldType.typeId == 0" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
          <!-- 2文本输入 -->
          <el-input disabled style="width: 250px;" v-if="scope.row.fieldType.typeId == 2" size="small" v-model="scope.row.value.value"><el-button slot="append" v-if="scope.row.fieldType.tail">{{scope.row.fieldType.tail}}</el-button></el-input>
          <!-- 1数字类型 -->
          <el-input-number disabled v-if="scope.row.fieldType.typeId == 1" size="small" value="scope.row.value.value"></el-input-number>
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
              :value="item.codeValue1">
            </el-option>
          </el-select>
          <!-- 8多选 -->
          <el-checkbox-group disabled v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length < 3" size="small" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group class="endways" disabled v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length >= 3" size="small" v-model="scope.row.value.value">
            <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.codeValue2}}{{item.remark}}</el-checkbox>
          </el-checkbox-group>
          <!-- 8自动生成 -->
          <div v-if="scope.row.fieldType.typeId == 8" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
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
      <el-table-column v-if="hasViolation" prop="rule" label="违反规则" align="left">
        <template slot-scope="scope">
          <span v-if="scope.row.value.ruleLevel === 1" class="el-icon-document" style="color: #E4A147"></span>
          <span v-if="scope.row.value.ruleLevel === 2" class="el-icon-document" style="color: #E4A147"></span>
          <span v-if="scope.row.value.ruleLevel === 3" class="el-icon-document" style="color: #F56C6C"></span>
          <span>{{scope.row.value.ruleMessage}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <div class="subHead" v-if="queryList.length>0">
      质疑对话
    </div>
    <el-table v-if="queryList.length>0" :data="queryList" @cell-click="cellClick" border stripe v-loading="loading1"
              element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column prop="queryType" label="类型" align="left">
        <template slot-scope="scope">
          <span>{{queryTypeArr[scope.row.queryType]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="queryStatus" label="状态" align="left">
        <template slot-scope="scope">
          <span>{{queryStateIdArr[scope.row.queryType]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="queryContent" label="质疑" align="left" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.queryContent}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="response" label="回答" align="left" min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.responseContent}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isResponse === 1" @click="handleClick(scope.row, 0)" type="text" size="small">回复</el-button>
          <el-button v-if="scope.row.isEdit === 1" @click="handleClick(scope.row, 1)" type="text" size="small">编辑</el-button>
          <el-button v-if="scope.row.isClose === 1" @click="handleClick(scope.row, 2)" type="text" size="small">关闭</el-button>
          <el-button v-if="scope.row.isDelete === 1" @click="handleClick(scope.row, 3)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
    <el-dialog title="质疑" :visible.sync="dialogVisible" width="40%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3}"
        placeholder="请输入内容"
        v-model="queryContent">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="query">确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog title="回复" :visible.sync="dialogVisible2" width="40%">
      <span style="font-weight: bold">质疑：</span>
      <pre>{{queryContentRow}}</pre>
      <span style="font-weight: bold">回复：</span>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3}"
        placeholder="请输入内容"
        v-model="responseContent">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="responseQuery">确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog title="编辑" :visible.sync="dialogVisible5" width="40%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3}"
        placeholder="请输入内容"
        v-model="queryContentRow">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="editQuery">确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog title="关闭" :visible.sync="dialogVisible3" width="40%">
      <div>确定要关闭该质疑吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="closeQuery">确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog title="删除" :visible.sync="dialogVisible4" width="40%">
      <div>确定要删除该质疑吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="deleteQuery">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f2Service from '@/service/f2';
  import bus from '@/utils/bus';
  import authService from '@/service/auth';
  import { queryStateId, queryType } from '@/data/constants';


  export default {
    name: 'f2',
    data() {
      return {
        // 数字输入
        num: '100',
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
        btnRights: {
          write: false,             // 编辑
          audit: false,             // 查看历史
          DMQuery: false,           // DM质疑
          verifyQuery: false,       // 审核质疑
          unlock: false,            // 解锁
          lock: false,              // 锁定
          analyze: false,           // 分析
          sumbit: false,            // 提交
          DMAccept: false,           // 接受
          verifyAccept: false,       // 接受
          delete: false,            // 删除
        },
        tHead: {},
        hasViolation: false,
        fileList: [],
        // -------- new query
        dialogVisible: false,
        queryType: null,
        queryContent: '',
        queryList: [],
        // -------- query dailoge
        dialogVisible2: false,
        responseContent: '',
        queryContentRow: '',
        queryId: '',
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        queryStateIdArr: queryStateId,
        queryTypeArr: queryType,
        operateTypeId: '',
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
      this.getStructure(this.routeParams.formId, this.routeParams.recordId);
      bus.$emit('TAB_CHANGED');
      bus.$emit('TITLE_HEAD', { sub_menu_name: this.routeParams.formId + this.routeParams.formName, tag: 'View:' });
      this.listQuery();
      this.getRight(this.routeParams.formId, this.routeParams.recordId);
    },
    methods: {
      getStructure(formId, dataId) {
        this.loading1 = true;
        f2Service.getF2Structure(formId, dataId).then((resp) => {
          this.loading1 = false;
          if (resp) {
            this.tableStructure = resp.fieldList;
            this.getDetail(this.routeParams.formId, this.routeParams.recordId);
          }
        });
      },
      getRight(formId, recordId) {
        authService.getPermissons(formId, recordId).then((resp) => {
          this.btnRights = resp;
        });
      },
      getDetail(formId, dataId) {
        f2Service.getF2Detail(formId, dataId).then((resp) => {
          if (resp) {
            this.tHead = resp.CRFHeader;
            this.tableValue = resp.body;
            this.hasViolation = false;
            // 值
            this.tableStructure.forEach((v) => {
              Object.keys(this.tableValue).forEach((v1) => {
                if (v.fieldCode === v1) {
                  if (!isNaN(this.tableValue[v1].value)) {
                    this.tableValue[v1].value = this.tableValue[v1].value === null ? this.tableValue[v1].value : Number(this.tableValue[v1].value);
                  }
                  v.value = this.tableValue[v1];
                  if (v.value.ruleLevel !== null) {
                    this.hasViolation = true;
                  }
                  if (v.fieldType.typeId === 6) {
                    v.value.value = v.value.value || v.value.value === 0 ? [null, v.value.value] : [null];
                  }
                  if (!v.fieldType.content) {
                    v.fieldType.content = [];
                  }
                  // if (v.fieldType.content.length > 0) {
                  //   v.fieldType.content.forEach((item) => {
                  //     item.codeId = item.codeId.toString();
                  //   });
                  // }
                }
              });
            });
          }
        });
      },
      confirmRule(formId, dataId, params) {
        f2Service.confirmRule(formId, dataId, params).then((resp) => {
          if (resp) {
            this.$message({
              type: 'success',
              message: '您通过了规则',
            });
          }
        });
      },
      ruleConfirm(ruleObj, row) {
        if (ruleObj.ruleLevel === 3) {
          this.$message({
            type: 'error',
            message: '该违反规则无法通过',
          });
        }
        if (ruleObj.ruleLevel === 1 || ruleObj.ruleLevel === 2) {
          // 1常识性逻辑 2协议书逻辑 3警告逻辑 0无
          this.$prompt(`输入内容违反了${row.id}的规则，您确定是这个值吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: false,
            inputPlaceholder: '如确认该值无误，请给出解释',
          }).then(({ value }) => {
            const obj = {
              violationId: ruleObj.violationId,
              response: value,
            };
            this.getStructure(this.routeParams.formId);
            this.confirmRule(this.routeParams.formId, this.routeParams.recordId, obj);
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            });
          });
        }
      },
      changeStatus(status) {
        const params = {
          stateTypeId: status,
          reasonForChange: '',
        };
        this.$confirm('请再次确认该操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          f2Service.getF2ChangeStatus(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
            if (resp) {
              this.getStructure(this.routeParams.formId);
              this.getRight(this.routeParams.formId, this.routeParams.recordId);
              this.$message({
                type: 'success',
                message: '提交成功',
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
        });
      },
      edit() {
        this.JumpOuterPage('F2_Edit', this.routeParams);
      },
      goBack() {
        // console.log(this.currAction);
        // this.JumpPage(this.currAction, 'List');
        this.$router.back(-1);
      },
      jump() {
        this.JumpOuterPage('F2_Audit');
      },
      objectSpanMethod({ row, columnIndex }) {
        const d = row.rowSpan;
        if (d === 0) {
          if (columnIndex === 0) {
            return {
              rowspan: 1,
              colspan: 4,
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
      queryOpen(type) {
        this.dialogVisible = true;
        this.queryContent = '';
        this.queryType = type;
      },
      query() {
        const params = {
          queryType: this.queryType,
          queryContent: this.queryContent,
        };
        f2Service.createQuery(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
          if (resp) {
            this.dialogVisible = false;
            this.$message({
              type: 'success',
              message: '提交质疑',
            });
            this.listQuery();
            this.getStructure(this.routeParams.formId);
          }
        });
      },
      listQuery() {
        f2Service.listQuery(this.routeParams.formId, this.routeParams.recordId).then((resp) => {
          if (resp) {
            this.queryList = resp.queryList;
          }
        });
      },
      handleClick(row, type) {
        if (type === 0) {
          // 回复
          this.responseQueryOpen(row.id);
          this.queryContentRow = row.queryContent;
          this.operateTypeId = type;
        }
        if (type === 1) {
          // 编辑
          this.editQueryOpen(row.id);
          this.queryContentRow = row.queryContent;
          this.operateTypeId = type;
        }
        if (type === 2) {
          // 关闭
          this.closeQueryOpen(row.id);
          this.operateTypeId = type;
        }
        if (type === 3) {
          // 删除
          this.deleteQueryOpen(row.id);
          this.operateTypeId = type;
        }
      },
      responseQueryOpen(queryId) {
        this.dialogVisible2 = true;
        this.responseContent = '';
        this.queryId = queryId;
      },
      responseQuery() {
        const params = {
          queryId: this.queryId,
          responseContent: this.responseContent,
          operateTypeId: this.operateTypeId,
        };
        f2Service.responseQuery(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
          if (resp) {
            this.dialogVisible2 = false;
            this.listQuery();
            this.getStructure(this.routeParams.formId);
            this.$message({
              type: 'success',
              message: '已回复',
            });
          }
        });
      },
      closeQueryOpen(queryId) {
        this.dialogVisible3 = true;
        this.queryId = queryId;
      },
      closeQuery() {
        const params = {
          queryId: this.queryId,
          operateTypeId: this.operateTypeId,
        };
        f2Service.closeQuery(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
          if (resp) {
            this.dialogVisible3 = false;
            this.listQuery();
            this.getStructure(this.routeParams.formId);
            this.$message({
              type: 'success',
              message: '已关闭',
            });
          }
        });
      },
      deleteQueryOpen(queryId) {
        this.dialogVisible4 = true;
        this.queryId = queryId;
      },
      deleteQuery() {
        const params = {
          queryId: this.queryId,
          operateTypeId: this.operateTypeId,
        };
        f2Service.deleteQuery(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
          if (resp) {
            this.dialogVisible4 = false;
            this.listQuery();
            this.getStructure(this.routeParams.formId);
            this.$message({
              type: 'success',
              message: '已删除',
            });
          }
        });
      },
      editQueryOpen(queryId) {
        this.dialogVisible5 = true;
        this.queryId = queryId;
      },
      editQuery() {
        const params = {
          queryId: this.queryId,
          queryContent: this.queryContentRow,
          operateTypeId: this.operateTypeId,
        };
        f2Service.editQuery(this.routeParams.formId, this.routeParams.recordId, params).then((resp) => {
          if (resp) {
            this.dialogVisible5 = false;
            this.listQuery();
            this.getStructure(this.routeParams.formId);
            this.$message({
              type: 'success',
              message: '保存成功',
            });
          }
        });
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

  .subHead {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
  }
  .italic {
    font-style:italic;
    font-weight: normal;
  }

  .el-table-wrap .el-row{
    background: #FAFAFA;
    border: 1px solid #EBEBEB;
    border-radius: 0;
    height: 50px;
    line-height: 50px;
  }

  .el-table-wrap {
    margin-bottom: 10px;
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
