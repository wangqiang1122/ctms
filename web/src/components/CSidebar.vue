<template>
  <div>
    <div class="logo-box">
      <img src="../assets/img/logo.png" alt="logo" height="36" width="126">
    </div>
    <div style="margin-top: 60px;"></div>
    <div v-for="item in menuTop" class="menu" :class="{ active: activeTab === item.project_name }" @click="changeTab(item, 1)">
      <p><img :src="item.icon_url" height="30" width="32"></p>
      <p>{{item.project_name}}</p>
    </div>
  </div>
</template>

<script>
import authService from '@/service/auth';
import storageService from '@/service/storage';
import bus from '@/utils/bus';

export default {
  name: 'con-sidebar',
  data() {
    return {
      menuTop: [],
      activeTab: '',
    };
  },
  created() {
    /*
    * 初次登录，或刷新时调用
    *
    * 登录获取并存储权限。
    * 刷新从缓存取，不会更新权限。
    * 登录和刷新都更新activeTab
    *
    * */
    this.checkPrivilege();
  },
  methods: {
    checkPrivilege() {
      const privilege = storageService.getPrivilege();
      let nav = storageService.getTopNav();
      const self = this;
      if (!privilege) {
        // 首次登录
        authService.getPermissionList().then((resp) => {
          storageService.setPrivilege(resp);
          self.checkPrivilege();
          this.$router.push({ name: 'Main' });
        });
      } else {
        this.menuTop = privilege.projects;
        if (!nav) nav = this.menuTop[0];
        this.changeTab(nav);
      }
    },
    changeTab(item, c) {
      // 点击操作，可以切换页面到main；非点击操作（刷新），不改变router
      if (c) {
        /*
         * tab右侧对应main页面
         * 点击按钮时，将router置为main
         * 如果为刷新，不改变router
         * */
        this.$router.push({ name: item.router_name });
      }
      /*
       * 存储当前top层
       * */
      storageService.setTopNav(item);
      /*
       * UI更新
       * */
      this.activeTab = item.project_name;
      /*
       * 不管是否跳转，通知更新数据
       * */
      bus.$emit('TAB_CHANGED');
      bus.$emit('TITLE_HEAD', { sub_menu_name: '', tag: '' });
    },
  },
};
</script>

<style scoped>
  .logo-box {
    background: #1DA8F0;
    height: 60px;
    padding-top: 12px;
    cursor: pointer;
    width: 150px;
    text-align: center;
    position: fixed;
    top: 0;
  }

  .menu {
    height: 130px;
    text-align: center;
    border-bottom: 2px solid #2F9BF2;
    color: #fff;
    padding-top: 38px;
    cursor: pointer;
  }

  .menu.active {
    background: #2685D2;
  }
</style>
