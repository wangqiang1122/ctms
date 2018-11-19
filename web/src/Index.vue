<template>
  <el-container>
    <!--<el-aside width="150px">-->
      <!--<c-sidebar></c-sidebar>-->
    <!--</el-aside>-->
    <el-container>
      <el-header height="60px">
        <c-header></c-header>
      </el-header>
      <el-main :class="isclass?'warp':''">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<style>
  .warp {
    background-color: cornsilk;
  }
</style>
<script>
import CHeader from '@/components/CHeader';
import CSidebar from '@/components/CSidebar';
import bus from './utils/bus';

export default {
  name: 'index',
  data() {
    return {
      isclass: false,
    };
  },
  created() {
    bus.$on('indexClass', (val) => {
      this.isclass = val;
    });
  },
  components: {
    CHeader, CSidebar,
  },
};
</script>
