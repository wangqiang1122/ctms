<template>
  <div class="f4">
    <div class="head">
      <!--<span>受试者 {{subjectCode}} CRF Binder</span>-->
    </div>
    <!-- title -->
    <div class="title">
      <span> 机构:
        <el-select size="small" v-model="siteCode" placeholder="请选择">
          <el-option
            v-for="(item, i) in siteList"
            :key="item.siteCode"
            :label="item.siteName"
            :value="item.siteCode">
          </el-option>
        </el-select>
      </span>
      <span>
        受试者:
        <el-select size="small" v-model="subjectCode" placeholder="请选择">
          <el-option
            v-for="(item, i) in subjectList"
            :key="item.subjectId"
            :label="item.subjectId"
            :value="item.subjectId">
          </el-option>
        </el-select>
      </span>
      <el-button class="btn" size="mini" type="primary" @click="addVisitOpen">新增访视</el-button>
      <el-button class="btn" size="mini" type="primary" @click="delVisitOpen">删除最新访视</el-button>
    </div>
    <!-- content -->
    <div class="content">
      <el-table :data="visitList" border stripe v-loading="loading1" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" style="width: 100%">
        <el-table-column v-for="(value, key) in visitFields"
                         :key="key" v-if="key === 'CRFInfo'"
                         :prop="key" :label="value.visitName" min-width="50px" align="left">
          <template slot-scope="scope">
            <span>{{scope.row[key]}}</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(value, key) in visitFields"
                         :key="key" v-if="key !== 'CRFInfo'" :prop="key" :label="value.visitName"
                         min-width="50px" align="center">
          <el-table-column :prop="key" :label="value.visitTime"
                           min-width="50px" align="center">
            <template slot-scope="scope">
              <div v-for="(value, index) in scope.row[key]" :key="index">
                <span @click="jumpCRFView(value)"><img v-if="value.state === 0" src="../../assets/img/wenjian1.png" height="20" width="20"/></span>
                <span @click="jumpCRFView(value)"><img v-if="value.state === 1" src="../../assets/img/wenjian2.png" height="20" width="20"/></span>
                <span @click="jumpCRFView(value)"><img v-if="value.state === 2" src="../../assets/img/wenjian3.png" height="20" width="20"/></span>
                <span @click="jumpCRFView(value)"><img v-if="value.state === 3" src="../../assets/img/wenjian4.png" height="20" width="20"/></span>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增访视 -->
    <el-dialog title="新增访视" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-form label-position="right" label-width="90px" :model="nextVisit">
        <el-form-item label="受试者:">
          <el-input disabled v-model="nextVisit.subjectId"></el-input>
        </el-form-item>
        <el-form-item label="下一个访视:">
          <el-select style="width: 100%" v-model="nextVisit.visitId" placeholder="请选择">
            <el-option
              v-for="item in nextVisitList"
              :key="item.visitId"
              :label="item.visitName"
              :value="item.visitId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="访视日期:">
          <el-date-picker
            style="width: 100%"
            v-model="nextVisit.date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addVisitPost">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f1Service from '@/service/f1';
  import f4Service from '@/service/f4';
  import bus from '@/utils/bus';

  export default {
    name: 'f4',
    data() {
      return {
        // ---------- 缓存信息
        topNav: {},
        currAction: {},

        loading1: false,
        dialogVisible: false,
        // ---------- site subject 下拉信息
        siteList: [],
        subjectList: [],
        subjects: [],
        siteCode: '',
        subjectCode: '',
        // ---------- visit table 信息
        visitFields: {},
        visitList: [],
        // ---------- next visit 信息
        nextVisitList: [],
        nextVisit: {
          subjectId: null,
          visitId: null,
          date: null,
        },
        // --------- del visit 信息
        delVisit: {
          subjectId: null,
          visitId: null,
        },
      };
    },
    created() {
      this.topNav = storageService.getTopNav();
      this.currAction = storageService.getLv3Nav();
      // 获取机构、受试者列表
      this.getSiteSubjectList();
    },
    methods: {
      getSiteSubjectList() {
        f1Service.getSiteSubjectList().then((resp) => {
          console.log(resp);
          if (resp) {
            this.siteList = resp.site;
            this.subjects = resp.subject;
            this.siteCode = this.siteList[0].siteCode;
          }
        });
      },
      getVisitProcess(subjectCode) {
        this.loading1 = true;
        f4Service.getVisitProcess(subjectCode).then((resp) => {
          console.log(resp);
          if (resp) {
            this.visitFields = resp.head;
            this.visitList = resp.body;
          }
          this.loading1 = false;
        });
      },
      getNextVisitList() {
        f4Service.getVisitList(this.subjectCode, 1).then((resp) => {
          if (resp) {
            this.nextVisitList = resp.nextVisit;
            this.nextVisit.visitId = this.nextVisitList[0].visitId;
          }
        });
      },
      addVisitOpen() {
        this.getNextVisitList();
        this.dialogVisible = true;
        this.nextVisit.subjectId = this.subjectCode;
        this.nextVisit.date = null;
      },
      addVisitPost() {
        if (!this.nextVisit.subjectId || !this.nextVisit.visitId || !this.nextVisit.date) {
          this.$message({ message: '请填写完整信息！', type: 'warning' });
          return;
        }
        f4Service.addVisit(this.nextVisit).then((resp) => {
          if (resp) {
            this.$message({ message: '访视新增成功！', type: 'success' });
            this.getVisitProcess(this.subjectCode);
            this.dialogVisible = false;
          }
        });
      },
      delVisitOpen() {
        const lastHead = Object.keys(this.visitFields)[Object.keys(this.visitFields).length - 1];
        const obj = this.visitFields[Object.keys(this.visitFields)[Object.keys(this.visitFields).length - 1]];
        const visitId = obj.visitId;
        if (lastHead === 'crf') {
          return;
        }
        this.$confirm('是否永久删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action) => {
            if (action === 'confirm') {
              this.delVisit.visitId = visitId;
              this.delVisit.subjectId = this.subjectCode;
              f4Service.delVisit(this.delVisit).then(() => {
                this.visitFields[Object.keys(this.visitFields)[Object.keys(this.visitFields).length - 1]] = {};
                delete this.visitFields[Object.keys(this.visitFields)[Object.keys(this.visitFields).length - 1]];
              });
            }
          },
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
      jumpCRFView(obj) {
        console.log(obj);
        this.JumpOuterPage('CRFList', obj);
      },
    },
    watch: {
      siteCode(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.subjectList = this.subjects[newVal];
          if (this.subjectList.length === 0) {
            this.subjectCode = null;
          } else {
            this.subjectCode = this.subjectList[0].subjectId;
            this.getVisitProcess(this.subjectCode);
          }
        }
      },
      subjectCode(newVal) {
        this.getVisitProcess(newVal);
        // 更改title
        bus.$emit('TITLE_HEAD', { sub_menu_name: `受试者 ${newVal} CRF Binder`, tag: '' });
      },
    },
  };
</script>

<style scoped>
  .content img {
    cursor: pointer;
  }

  .head {
    text-align: center;
    margin: 15px 0;
  }

  .head span {
    font-size: 18px;
    color: #2B97EF;
    font-weight: 500;
    margin-left: 15px;
  }

  .title {
    margin-bottom: 12px;
    padding-bottom: 10px;
    overflow: hidden;
    border-bottom: 1px solid #efefef;
  }

  .title span {
    margin-right: 20px;
  }
</style>
