<template>
  <div class="f1-index">
    <!------ title ----->
    <div class="title">
      {{currAction.form_des}}列表
    </div>
    <!------ head ------>
    <div class="head">
      <span class="search"> 搜索条件:
        <el-select size="small" v-model="searchField" placeholder="请选择">
          <el-option
            :clearable="true"
            v-for="(item, i) in tableStructure"
            :key="item.id"
            :label="item.qName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button :type="searchType === 1 ? 'success': 'info'" size="mini" round @click="active(1)">大于</el-button>
        <el-button :type="searchType === 2 ? 'success': 'info'" size="mini" round @click="active(2)">等于</el-button>
        <el-button :type="searchType === 3 ? 'success': 'info'" size="mini" round @click="active(3)">小于</el-button>
        <el-button :type="searchType === 4 ? 'success': 'info'" size="mini" round @click="active(4)">包含</el-button>
        <el-button :type="orderTypeId === 0 ? 'success': 'info'" size="mini" round @click="cliZ(0)">正序</el-button>
        <el-button :type="orderTypeId === 1 ? 'success': 'info'" size="mini" round @click="cliZ(1)">倒序</el-button>
        <el-input size="small" v-model="searchContent" :clearable="true" style="width: 200px;"></el-input>
        <el-button size="mini" @click="reset">重置</el-button>
      </span>
      <el-button class="btn" size="mini" type="primary" @click="add">新增</el-button>
    </div>
    <!----- pagination ------>
    <div class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     background :page-size="pageSize" :page-sizes="pageSizes" :layout="layout" :total="totalNum"></el-pagination>
    </div>
    <!------ content ------>
    <div class="content">
      <el-table :data="tableData" @cell-click="cellClick" border stripe v-loading="loading1"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" style="width: 100%">
        <el-table-column v-for="item in tableHead" :key="item.id" :prop="item.id" :label="item.qName" min-width="50px">
          <template slot-scope="scope">
            {{scope.row[item.id]}}
          </template>
        </el-table-column>
      </el-table>
    </div>
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
        // --- table info ----
        tableHead: [],
        tableData: [],
        tableStructure: [],
        // --- search ----
        searchField: null,
        searchContent: null,
        searchType: null,
        orderTypeId: null,
        // --- pagination ----
        currentPage: 1,
        totalNum: 1,
        pageSize: this.PAGINATION_SIZE,
        pageSizes: this.PAGINATION_SIZES,
        layout: this.PAGINATION_LAYOUT,
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      this.search();
      this.getStructure(this.currAction.formId);
    },
    methods: {
      search(cp) {
        this.currentPage = cp || 1;
        const params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          searchContent: this.searchContent,
          searchField: this.searchField,
          searchType: this.searchType,
        };
        this.getList(this.currAction.form_id, params);
      },
      getList(formId, params) {
        this.loading1 = true;
        f1Service.getF1List(formId, params).then((resp) => {
          this.loading1 = false;
          this.tableHead = resp.tHead;
          this.tableData = resp.tBody;
          this.resetPage(resp.paging);
        });
      },
      getStructure(formId) {
        f1Service.getF1Structure(formId).then((resp) => {
          this.tableStructure = resp.fields;
        });
      },
      active(t) {
        this.searchType = t;
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
          console.log(this.currAction);
          this.JumpPage(this.currAction, 'View', { id: row[column.property] });
        } else {
          this.searchField = column.property;
          this.searchContent = row[column.property];
        }
      },
      resetPage(obj) {
        this.currentPage = obj.currentPage;
        this.totalNum = obj.totalNum;
      },
      reset() {
        this.searchContent = null;
        this.searchField = null;
        this.searchType = null;
        this.search();
      },
      add() {
        this.JumpPage(this.currAction, 'Add');
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
