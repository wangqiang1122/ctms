<template>
  <div>
    <div class="logo-box">
      <img src="../assets/img/logo.png" alt="logo" height="36" width="126" @click="logoCli">
    </div>
    <p class="item i1">
      <span class="ChangePassword" @click="linkChang">修改密码</span>
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link">
          Hello ! <span class="u-name">{{username}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          <img src="../assets/img/head-portrait.png" height="34" width="34"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </p>
    <p class="item headerTitle"><span class="small">{{title.tag}}</span> {{title.sub_menu_name}}</p>
    <!--<p class="item i2"><img src="../assets/img/head-set-active.png" height="20" width="20"/><img src="../assets/img/head-set.png" height="20" width="20"/></p>-->
    <!--<p class="item i3"><img src="../assets/img/head-tip-active.png" height="20" width="20"/><img src="../assets/img/head-tip.png" height="20" width="20"/></p>-->
    <p class="item i4" v-show="isTime">
      <!--<img src="../assets/img/head-position.png" height="22" width="22"/>-->
      <!--<span class="el-link" @click="skip1">CTMS</span> / -->
    <span @click="skip2">{{projectName}}</span>
    <span v-if="FirstLevel" @click="skip3">> {{title.sub_menu_name}}</span>
    </p>
  </div>
</template>

<script>
  import authService from '@/service/auth';
  import storageService from '@/service/storage';
  import bus from '@/utils/bus';

  export default {
    name: 'con-header',
    data() {
      return {
        username: '',
        email: '',
        phone: '',
        projectName: '',
        tag: '', // 小字
        title: {}, // 标题
        isTime: true, // 是否显示
        FirstLevel: false, // 是否现实一级菜单
      };
    },
    created() {
      // 获取用户信息
      this.getUserInfo();
      // this.initStorage();
      bus.$on('TAB_CHANGED', () => {
        this.initStorage();
      });
      // 是否显示一级菜单
      // 更改标题
      bus.$on('TITLE_HEAD', (val) => {
        if (val) {
          this.title = val;
        } else {
          this.title = storageService.getLv3Nav();
        }
        if (val.sub_menu_name === '') {
          this.FirstLevel = false;
        } else {
          this.FirstLevel = true;
        }
      });
      // item 标题
      bus.$on('TITLE_ITEM', (val) => {
        if (val) {
          this.isTime = val.isShow;
        }
      });
      this.initStorage();
    },
    methods: {
      // logo 跳转
      logoCli() {
        this.$router.push({ path: '/' });
      },
      // 添加跳转事件主页
      skip1() {
        this.$router.push({ path: '/' });
      },
      // 添加跳转事件2
      skip2() {
        // 二级跳转必须回到首页才可以进行更新
        this.$router.push({ path: '/main' });
        bus.$emit('TAB_CHANGED');
      },
      // 添加跳转时间
      skip3() {
        storageService.setLv3Nav(storageService.gettablelist());
        this.$router.push({ name: storageService.gettablelist().menuModel });
      },
      // 修改密码
      linkChang() {
        this.$router.push({ path: '/main/ChangePassword/ChangePassword' });
      },
      initStorage() {
        const topNav = storageService.getTopNav();
        if (topNav) {
          this.projectName = topNav.projectName;
        }
      },
      getUserInfo() {
        const userInfo = storageService.getAccount();
        if (userInfo) {
          this.username = userInfo.userName;
          this.email = userInfo.email;
          this.phone = userInfo.phone;
        } else {
          authService.logout();
        }
      },
      handleCommand(c) {
        if (c === 'logout') {
          authService.logout();
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  .item {
    float: right;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
  }
  .ChangePassword{
    padding-right: 30px;
  }
  .item img {
    vertical-align: middle;
    margin: 0 10px;
  }

  .u-name {
    color: #2AB3FA;
    padding: 0 10px 0 5px;
  }

  .i1 {
    margin: 0 20px;
  }

  .i2 img:nth-child(1), .i3 img:nth-child(1){
    display: none;
  }

  .i2 img:nth-child(2), .i3 img:nth-child(2){
    display: inline;
  }

  .i2:hover img:nth-child(2), .i3:hover img:nth-child(2){
    display: none;
  }

  .i2:hover img:nth-child(1), .i3:hover img:nth-child(1){
    display: inline;
  }

  .i3 {
    margin: 0 15px;
  }

  .i4 {
    float: left;
    margin-left: 170px;
    font-size: 15px;
    color: #485E66;
  }
  .el-link{
    cursor: pointer;
  }
  .headerTitle{
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 50%;
    font-size: 25px;
    color: #2B97EF;
    position: absolute;
  }
  .headerTitle>.small {
    font-size: 15px;
    color: #000;
  }
</style>
