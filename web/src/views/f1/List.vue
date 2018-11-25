<template>
  <div class="f1-index">
    <!------ title ----->
    <!--<div class="title">-->
      <!--{{currAction.form_des}}列表-->
    <!--</div>-->
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
      </span>
      <el-button  @click="goBack" class="btn el-button" size="mini">返 回</el-button>
      <el-button class="btn el-button" size="mini" type="primary" @click="add">新增</el-button>
    </div>
    <!----- pagination ------>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     background :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalNum"></el-pagination>
    </div>
    <!------ content ------>
    <div class="content list1">
      <el-table :data="tableData" @cell-click="cellClick" @header-click="headerClick" border stripe v-loading="loading1"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100%">
        <el-table-column v-for="item in tableHead" :key="item.fieldCode" :prop="item.fieldCode" :label="item.fieldName" min-width="130px" sortable>
          <template slot-scope="scope">
            <!--{{item}}<br>-->
            <!--{{scope.row}}-->
            {{scope.row[item.fieldCode]}}
          </template>
        </el-table-column>
      </el-table>
    </div>
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
        // --- table info ----
        tableHead: [],
        tableData: [],
        tableStructure: [],
        // --- search ----
        searchFieldCode: '', // 检索条件
        searchContent: '', // 搜索内容
        searchTypeId: '', // 搜索 包含
        orderTypeId: '', // 倒序 0 正序 1倒序
        orderFieldCode: '', // 排序条件
        // --- pagination ----
        currentPage: 1,
        totalNum: 1,
        pageSize: this.PAGINATION_SIZE,
        pageSizes: this.PAGINATION_SIZES,
        layout: this.PAGINATION_LAYOUT,
        // 倒序缓存
        Xcache: '',
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      this.search();
      this.getStructure(this.currAction.formId);
      bus.$emit('TITLE_HEAD', { sub_menu_name: this.currAction.menuName, tag: '列表:' });
    },
    methods: {
      search(cp) {
        this.currentPage = cp || 1;
        const params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          searchContent: this.searchContent,
          searchFieldCode: this.searchFieldCode,
          searchTypeId: this.searchTypeId,
          orderTypeId: this.orderTypeId,
          orderFieldCode: this.orderFieldCode,
        };
        this.getList(this.currAction.formId, params);
      },
      getList(formId, params) {
        this.loading1 = true;
        f1Service.getF1List(formId, params).then((resp) => {
          this.loading1 = false;
          this.tableHead = resp.head;
          this.tableData = resp.body;
          // if (Object.keys(this.Xcache).length === 0) {
          //   this.resetXcache();
          // }
          this.resetPage(resp.page);
        });
      },
      getStructure(formId) {
        f1Service.getF2StructureList(formId).then((resp) => {
          this.tableStructure = resp.fieldList;
        });
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
          this.JumpPage('NoCRFView', { id: row[column.property] });
        } else {
          this.searchFieldCode = column.property;
          this.searchContent = row[column.property];
        }
      },
      headerClick(column) {
        this.orderFieldCode = column.property;
        if (this.Xcache === 1) {
          this.orderTypeId = '';
          this.orderFieldCode = '';
        } else if (this.Xcache === 0) {
          this.orderTypeId = 1;
        } else {
          this.orderTypeId = 0;
        }
        this.Xcache = this.orderTypeId;
        this.search();
      },
      resetPage(obj) {
        this.currentPage = obj.currentPage;
        this.totalNum = obj.totalNum;
      },
      reset() {
        this.searchContent = '';
        this.searchFieldCode = '';
        this.searchTypeId = '';
        this.orderTypeId = '';
        this.orderFieldCode = '';
        this.resetXcache();
        this.search();
      },
      goBack() {
        this.JumpPage('Main');
      },
      add() {
        this.JumpPage('NoCRFAdd');
      },
      resetXcache() {
        // this.tableHead.forEach((v) => {
        //   this.Xcache[v.fieldCode] = '';
        // });
        this.tableHead.forEach(() => {
          this.Xcache = '';
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
    margin-right: 20px;
  }
</style>
