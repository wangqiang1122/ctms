<template>
  <div>
    <!-- title -->
    <div class="f3-title">
      <div class="f3-title-1">
        <div style="border-bottom: 1px solid #ebeef5;height: 36px;line-height: 36px">{{topnav.project_name}}</div>
        <div style="height: 36px;line-height: 36px">{{topnav.id}}</div>
      </div>
      <div class="f3-title-2">病例报告采集日程计划表</div>
    </div>
    <!---content--->
    <el-table style="width: 100%" :data="tableData"  label-class-name="table1"  :show-header="false" :span-method="arraySpanMethod" border v-loading="loading1" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column label="" align="center"  prop="key" height="30"></el-table-column>
      <el-table-column label="" align="left"   prop="name" hright="30"></el-table-column>
      <el-table-column label="" align="center"  :prop="item" :key="item" v-for="item in tableFields"></el-table-column>
    </el-table>
    <div class="f3-footer">
      <div>
        <span>X=必须填</span>
        <span>O=需要时填</span>
        <span>R=可填写多份</span>
      </div>
    </div>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import f3Service from '@/service/f3';

  export default {
    name: 'f3',
    data() {
      return {
        loading1: false,
        currAction: {},           // 当前action内容及权限
        tableFields: [],        // table header第一行
        tableData: [],            // table内容
        currentPage: 1,        // 当前页
        topnav: {},             // 缓存
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      this.getFormList(this.currAction.form_id);
      this.topnav = storageService.getTopNav();
    },
    methods: {
      getFormList(fromID) {
        this.loading1 = true;
        f3Service.getF3List(fromID).then((res) => {
          this.loading1 = false;
          this.tableFields = res.head;
          this.tableData = res.list;
        });
      },
      arraySpanMethod({ rowIndex, columnIndex }) {
        if (columnIndex === 0 && rowIndex === 0) {
          return [2, 2];
        } else if ((columnIndex === 1 && rowIndex === 0) || (columnIndex === 1 && rowIndex === 1) || (columnIndex === 0 && rowIndex === 1)) {
          return [0, 0];
        }
        return [1, 1];
      },
    },
  };
</script>

<style scoped>
  .f3-footer {
    border: 1px solid #ebeef5;
    line-height: 30px;
    width: 100%;
  }

  .f3-footer div {
    margin: 0 auto;
    width: 300px;
    text-align: center;
  }

  .f3-title {
    text-align: center;
    border: 1px solid #ebeef5;
    overflow: hidden;
    font-size: 14px;
    color: #606266;
  }

  .f3-title-1, .f3-title-2 {

  }

  .f3-title-1 {
    width: 120px;
    float: left;
    border-right: 1px solid #ebeef5;
  }

  .f3-title-2 {
    overflow: hidden;
    vertical-align: middle;
    line-height: 72px;
    font-size: 20px;
  }

  .tri-column {
    font-size: 10px;
  }
</style>
