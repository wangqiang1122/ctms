<template>
  <el-container>
    <!--<el-aside width="150px">-->
      <!--<c-sidebar></c-sidebar>-->
    <!--</el-aside>-->
    <el-container>
      <el-header height="60px">
        <c-header></c-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CHeader from '@/components/CHeader';
import CSidebar from '@/components/CSidebar';

export default {
  name: 'index',
  components: {
    CHeader, CSidebar,
  },
};
</script>
