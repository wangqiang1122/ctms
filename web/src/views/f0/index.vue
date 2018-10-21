<template>
    <div>
      <div v-for="item in menuTop" class="menu"  @click="changeTab(item)">
        <p><img :src="item.iconURL" height="30" width="32"></p>
        <p>{{item.projectName}}</p>
      </div>
    </div>
</template>

<script>
import authService from '@/service/auth';
import storageService from '@/service/storage';
import bus from '@/utils/bus';

export default {
  name: 'index',
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
    bus.$emit('TITLE_HEAD', { sub_menu_name: '', tag: '' });
    bus.$emit('TITLE_ITEM', { isShow: false });
  },
  methods: {
    checkPrivilege() {
      const privilege = storageService.getPrivilege();
      // let nav = storageService.getTopNav();
      const self = this;
      if (!privilege) {
        // 首次登录
        authService.getProjects().then((resp) => {
          storageService.setPrivilege(resp);
          self.checkPrivilege();
        });
      } else {
        this.menuTop = privilege.projectList;
        // if (!nav) nav = this.menuTop[0];
        // this.changeTab(nav);
      }
    },
    changeTab(item) {
      this.$router.push({ name: 'Main' });
      // 点击操作，可以切换页面到main；非点击操作（刷新），不改变router
      // if (c) {
      //       /*
      //        * tab右侧对应main页面
      //        * 点击按钮时，将router置为main
      //        * 如果为刷新，不改变router
      //        * */
      //   this.$router.push({ name: item.router_name });
      // }
      //     /*
      //      * 存储当前top层
      //      * */
      storageService.setTopNav(item);
      //     /*
      //      * UI更新
      //      * */
      // this.activeTab = item.project_name;
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
  .menu {
    height: 130px;
    text-align: center;
    border-bottom: 2px solid #2F9BF2;
    color: #fff;
    padding-top: 38px;
    cursor: pointer;
    float: left;
    background-color: #2B97EF;
    width: 150px;
    margin-left: 10px;
  }
</style>
