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
            :label="item.siteDes"
            :value="item.siteCode">
          </el-option>
        </el-select>
      </span>
      <span>
        受试者:
        <el-select size="small" v-model="subjectCode" placeholder="请选择">
          <el-option
            v-for="(item, i) in subjectList"
            :key="item.subjectCode"
            :label="item.subjectCode"
            :value="item.subjectCode">
          </el-option>
        </el-select>
      </span>
      <el-button class="btn" size="mini" type="primary" @click="addVisitOpen">新增访视</el-button>
    </div>
    <!-- content -->
    <div class="content">
      <el-table :data="visitList" border stripe v-loading="loading1" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" style="width: 100%">
        <el-table-column v-for="(value, key) in visitFields" :key="key" v-if="key === 'crf'" :prop="key" :label="value.vName" min-width="50px" align="left">
          <template slot-scope="scope">
            <span>{{scope.row[key]}}</span>
          </template>
        </el-table-column>
        <el-table-column v-for="(value, key) in visitFields" :key="key" v-if="key !== 'crf'" :prop="key" :label="value.vName"
                         min-width="50px" align="center">
          <el-table-column :prop="key" :label="value.vTime"
                           min-width="50px" align="center">
            <template slot-scope="scope">
              <span @click="jumpCRFView(scope.row[key])"><img v-if="scope.row[key].status === 0" src="../../assets/img/wenjian1.png" height="20" width="20"/></span>
              <span @click="jumpCRFView(scope.row[key])"><img v-if="scope.row[key].status === 1" src="../../assets/img/wenjian2.png" height="20" width="20"/></span>
              <span @click="jumpCRFView(scope.row[key])"><img v-if="scope.row[key].status === 2" src="../../assets/img/wenjian3.png" height="20" width="20"/></span>
              <span @click="jumpCRFView(scope.row[key])"><img v-if="scope.row[key].status === 3" src="../../assets/img/wenjian4.png" height="20" width="20"/></span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增访视 -->
    <el-dialog title="新增访视" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-form label-position="right" label-width="90px" :model="nextVisit">
        <el-form-item label="受试者:">
          <el-input disabled v-model="nextVisit.subjectCode"></el-input>
        </el-form-item>
        <el-form-item label="下一个访视:">
          <el-select style="width: 100%" v-model="nextVisit.visitCode" placeholder="请选择">
            <el-option
              v-for="item in nextVisitList"
              :key="item.visitCode"
              :label="item.visitDes"
              :value="item.visitCode">
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
          subjectCode: null,
          visitCode: null,
          date: null,
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
          if (resp) {
            this.visitFields = resp.fields;
            this.visitList = resp.list;
          }
          this.loading1 = false;
        });
      },
      getNextVisitList() {
        f4Service.getVisitList(this.subjectCode, 1).then((resp) => {
          if (resp) {
            this.nextVisitList = resp.list;
            this.nextVisit.visitCode = this.nextVisitList[0].visitCode;
          }
        });
      },
      addVisitOpen() {
        this.getNextVisitList();
        this.dialogVisible = true;
        this.nextVisit.subjectCode = this.subjectCode;
        this.nextVisit.date = null;
      },
      addVisitPost() {
        if (!this.nextVisit.subjectCode || !this.nextVisit.visitCode || !this.nextVisit.date) {
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
      jumpCRFView(obj) {
        this.JumpOuterPage('F2_View', obj);
      },
    },
    watch: {
      siteCode(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.subjectList = this.subjects[newVal];
          if (this.subjectList.length === 0) {
            this.subjectCode = null;
          } else {
            this.subjectCode = this.subjectList[0].subjectCode;
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
