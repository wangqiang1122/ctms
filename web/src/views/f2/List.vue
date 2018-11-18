<template>
  <div class="f1-index">
    <!------ title ----->
    <!--<div class="title">-->
      <!--{{currAction.form_id}} {{currAction.form_des}}列表-->
    <!--</div>-->
    <div class="btn">
      <!--<el-button class="btn" size="mini" type="primary" @click="showHide">隐藏/显示说明</el-button>-->
    </div>
    <!------ head ------>
    <div class="head">
      <span class="search"> 搜索条件:
        <el-select size="small" v-model="searchFieldCode" placeholder="请选择">
          <el-option
            :clearable="true"
            v-for="(item, i) in tableHead"
            :key="item.fieldCode"
            :label="item.fieldName"
            :value="item.fieldCode">
          </el-option>
        </el-select>
        <el-button :type="searchTypeId === 1 ? 'success': 'info'" size="mini" round @click="active(1)">大于</el-button>
        <el-button :type="searchTypeId === 2 ? 'success': 'info'" size="mini" round @click="active(2)">等于</el-button>
        <el-button :type="searchTypeId === 3 ? 'success': 'info'" size="mini" round @click="active(3)">小于</el-button>
        <el-button :type="searchTypeId === 4 ? 'success': 'info'" size="mini" round @click="active(4)">包含</el-button>
        <el-input size="small" v-model="searchContent" :clearable="true" style="width: 200px;"></el-input>
        <el-button size="mini" @click="reset">重置</el-button>
        <el-button class="btn" size="mini" @click="goBack" style="margin-top: 3px">返回</el-button>
      </span>
    </div>
    <!----- pagination ------>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     background :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalNum"></el-pagination>
    </div>
    <!------ content ------>
    <div class="content">
      <el-table :data="tableData" @cell-click="cellClick" border stripe v-loading="loading1" @header-click="headerClick"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100%">
        <el-table-column v-if="showIns" v-for="item in tableHead1" :key="item.fieldCode" :prop="item.fieldCode" :label="item.fieldName" min-width="50px">
          <template slot-scope="scope">
            <!--{{item}}-->
            {{scope.row[item.fieldCode]}}
          </template>
        </el-table-column>
        <el-table-column v-if="showIns" v-for="item in tableHead2" :key="item.fieldCode" :prop="item.fieldCode" :label="item.fieldName" min-width="50px" sortable>
          <el-table-column :prop="item.fieldName" :label="item.fieldCode">
            <template slot-scope="scope">
              {{scope.row[item.fieldCode]}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f2Service from '@/service/f2';
  import bus from '@/utils/bus';

  export default {
    name: 'f1',
    data() {
      return {
        loading1: false,
        currAction: {},
        // --- table info ----
        tableHead: [],
        tableHead1: [],
        tableHead2: [],
        tableData: [],
        // --- search ----
        searchFieldCode: '', // 检索条件
        searchContent: '', // 搜索内容
        searchTypeId: '', // 搜索 包含
        orderTypeId: '', // 倒序
        orderFieldCode: '', // 排序条件
        // --- pagination ----
        currentPage: 1,
        totalNum: 1,
        pageSize: this.PAGINATION_SIZE,
        pageSizes: this.PAGINATION_SIZES,
        layout: this.PAGINATION_LAYOUT,
        showIns: true,
        // 倒序cache
        Xcache: '',
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      this.search();
      bus.$emit('TITLE_HEAD', { sub_menu_name: this.currAction.menuName, tag: '列表:' });
    },
    methods: {
      search(cp) {
        this.currentPage = cp || 1;
        const params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          searchContent: this.searchContent,
          orderFieldCode: this.orderFieldCode,
          searchTypeId: this.searchTypeId,
          orderTypeId: this.orderTypeId,
          searchFieldCode: this.searchFieldCode,
        };
        this.getList(this.currAction.formId, params);
      },
      getList(formId, params) {
        this.loading1 = true;
        f2Service.getF2List(formId, params).then((resp) => {
          if (resp === null) return;
          this.loading1 = false;
          this.tableHead = resp.head;
          this.tableData = resp.body;
          this.resetPage(resp.page);
          // if (Object.keys(this.Xcache).length === 0) {
          //   this.resetXcache();
          // }
          for (let i = 0; i < this.tableHead.length; i += 1) {
            if (this.tableHead[i].isCRFField === 1) {
              this.tableHead1 = this.tableHead.slice(0, i);
              this.tableHead2 = this.tableHead.slice(i);
              break;
            }
          }
        });
      },
      goBack() {
        // console.log(this.currAction);
        // this.JumpPage(this.currAction, 'List');
        this.$router.back(-1);
      },
      active(t) {
        this.searchTypeId = t;
        this.search();
      },
      cliZ(t) {
        this.orderTypeId = t;
        this.search();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search(this.currentPage);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.search(this.currentPage);
      },
      cellClick(row, column) {
        if (column.property === 'id') {
          this.JumpOuterPage('F2_View', { formId: this.currAction.formId, formName: this.currAction.formName, recordId: row[column.property] });
        } else {
          this.searchFieldCode = column.label;
          this.searchContent = row[column.label];
        }
      },
      headerClick(column) {
        // this.Xcache[column.property]
        if (this.Xcache === 1) {
          this.orderTypeId = '';
        } else if (this.Xcache === 0) {
          this.orderTypeId = 1;
        } else {
          this.orderTypeId = 0;
        }
        if (column.property.indexOf('Q') !== -1) {
          if (this.Xcache === 1) {
            this.orderFieldCode = '';
          } else {
            this.orderFieldCode = column.property;
          }
          this.Xcache = this.orderTypeId;
          this.search();
        }
      },
      resetPage(obj) {
        this.currentPage = obj.currentPage;
        this.totalNum = obj.totalNum;
      },
      reset() {
        this.searchContent = '';
        this.orderFieldCode = '';
        this.searchTypeId = '';
        this.orderTypeId = '';
        this.searchFieldCode = '';
        this.resetXcache();
        this.search();
      },
      showHide() {
        this.showIns = !this.showIns;
      },
      resetXcache() {
        Object.keys(this.tableData[0]).forEach((v) => {
          // if (v.indexOf('Q') !== -1) {
          //   this.Xcache[v] = '';
          // }
          if (v.indexOf('Q') !== -1) {
            this.Xcache = '';
          }
        });
      },
    },
  };
</script>

<style scoped>

  .f1-index {
    position: relative;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }

  .head {
    margin-bottom: 10px;
    overflow: hidden;
  }

  .search {
    float: left;
  }

  .btn {
    float: right;
  }
</style>
