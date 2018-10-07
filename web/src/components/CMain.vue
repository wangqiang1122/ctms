<template>
  <div class="wrap cmain">
    <!-- 列表部分 -->
    <transition name="slide-fade" mode="out-in">
      <div class="list" :key="key">
        <!-- 列表有数据 -->
        <el-row :gutter="20" v-if="menuRows" v-for="(m,i) in menuRows" :key="i">
          <el-col :span="6" class="box" v-if="mainMenus[i*4]">
            <div class="a-block" :class="{ checked: blockId === i*4 }" @click="blockSub(i*4)">
              <span class="a-icon"><img class="move1" :src="mainMenus[i*4].icon_url" height="48" width="48"></span>
              <span class="a-text move1">{{mainMenus[i*4].menuName}}</span>
            </div>
          </el-col>
          <el-col :span="6" class="box" v-if="mainMenus[1+i*4]">
            <div class="a-block" :class="{ checked: blockId === 1+i*4 }" @click="blockSub(1+i*4)">
              <span class="a-icon"><img class="move1" :src="mainMenus[1+i*4].icon_url" height="48" width="48"></span>
              <span class="a-text move1">{{mainMenus[1+i*4].menuName}}</span>
            </div>
          </el-col>
          <el-col :span="6" class="box" v-if="mainMenus[2+i*4]">
            <div class="a-block" :class="{ checked: blockId === 2+i*4 }" @click="blockSub(2+i*4)">
              <span class="a-icon"><img class="move1" :src="mainMenus[2+i*4].icon_url" height="48" width="48"></span>
              <span class="a-text move1">{{mainMenus[2+i*4].menuName}}</span>
            </div>
          </el-col>
          <el-col :span="6" class="box" v-if="mainMenus[3+i*4]">
            <div class="a-block" :class="{ checked: blockId === 3+i*4 }" @click="blockSub(3+i*4)">
              <span class="a-icon"><img class="move1" :src="mainMenus[3+i*4].icon_url" height="48" width="48"></span>
              <span class="a-text move1">{{mainMenus[3+i*4].menuName}}</span>
            </div>
          </el-col>
          <!-- 列表展开内容 -->
          <transition name="slide-fade2">
            <div class="sub" :key="i*4" v-if="mainMenus[i*4] && blockId === i*4">
              <span class="sub-item"  v-for="item in mainMenus[i*4].childMenuList" @click="goToNextLevel(item)">{{item.menuName}}</span>
            </div>
          </transition>
          <transition name="slide-fade2">
            <div class="sub" :key="1+i*4" v-if="mainMenus[1+i*4] && blockId === 1+i*4">
              <span class="sub-item"  v-for="item in mainMenus[1+i*4].childMenuList" @click="goToNextLevel(item)">{{item.menuName}}</span>
            </div>
          </transition>
          <transition name="slide-fade2">
            <div class="sub" :key="2+i*4" v-if="mainMenus[2+i*4] && blockId === 2+i*4">
              <span class="sub-item"  v-for="item in mainMenus[2+i*4].childMenuList" @click="goToNextLevel(item)">{{item.menuName}}</span>
            </div>
          </transition>
          <transition name="slide-fade2">
            <div class="sub" :key="3+i*4"  v-if="mainMenus[3+i*4] && blockId === 3+i*4">
              <span class="sub-item"  v-for="item in mainMenus[3+i*4].childMenuList" @click="goToNextLevel(item)">{{item.menuName}}</span>
            </div>
          </transition>
        </el-row>
        <!-- 列表无数据 -->
        <div v-if="menuRows === null">项目未启动</div>
        <!-- 第一次启动 -->
        <div v-if="menuRows === undefined">系统启动中，稍等片刻...</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import storageService from '@/service/storage';
  import authService from '@/service/auth';
  import bus from '@/utils/bus';

  export default {
    name: 'cMain',
    data() {
      return {
        loading1: false,
        privilege: [],          // 全部权限
        mainMenus: [],          // 主的页列表
        menuRows: undefined,    // 以每行4个划分，行的大小
        key: 1,                 // 用于动画
        blockId: null,          // 展示的子元素
      };
    },
    created() {
      this.initStorage();
      bus.$emit('TITLE_HEAD', { sub_menu_name: '', tag: '' });
      bus.$emit('TAB_CHANGED');
      bus.$emit('TITLE_ITEM', { isShow: true });
    },
    methods: {
      initStorage() {
        authService.getMenus(storageService.getTopNav().projectId).then((val) => {
          this.privilege = val.parentMenuList;
          if (this.privilege) {
            this.updateTab(this.privilege);
          }
        });
      },
      updateTab(privilege) {
        this.mainMenus = privilege;
        if (this.mainMenus) {
          this.menuRows = Math.floor(this.mainMenus.length / 4) + 1;
          this.key += 1;
        } else {
          this.menuRows = null;
        }
        this.blockId = null;
      },
      blockSub(idx) {
        if (this.blockId === idx) {
          this.blockId = null;
        } else {
          this.blockId = idx;
        }
      },
      goToNextLevel(item) {
        /*
         * 进入功能层
         * */
        storageService.setLv3Nav(item);
        this.$router.push({ name: item.formCode });
      },
    },
  };
</script>

<style scoped>
  .wrap {
    padding-top: 2%;
    font-size: 15px;
  }
  .list {
    text-align: center;
    padding: 0 20px 10px 20px;
  }
  .box {
    position: relative;
  }
  .a-block {
    text-align: center;
    cursor: pointer;
    padding:10px 5px;
    /*border: 2px solid #fff;*/
    background-color: #fff;
    transition: border-bottom .8s, background-color .8s;
  }

  .box .checked {
    background-color: #E6EDF3!important;
  }

  .box:hover .a-block{
    /*border-radius: 2px;*/
    /*border: 2px solid #1CA6FC;*/
    /*border-bottom: none;*/
    /*background-color: #F2F5F8;*/
  }

  .box:hover .move1 {
    /*animation: myMove1 .7s ease 1 normal;*/
    /*-webkit-animation: myMove1 .7s ease 1 normal;*/
    color: #1CA6FC;
  }

  .sub {
    width: 100%;
    padding: 20px 10px 10px 10px;
    margin: 0 10px;
    overflow: hidden;
    /*background-color: #fff;*/
    background-color: #E6EDF3;
    border-radius: 0 0 6px 6px;
  }

  .sub-item {
    float: left;
    padding: 10px 20px;
    width: 20%;
    background: #fff;
    cursor: pointer;
    margin-top: 4px;
    margin-left: 30px;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid #E4E4E6;
    transition: color .4s, border .4s, margin-top .4s, margin-bottom .4s;
  }

  .sub-item:hover {
    /*todo 多于4个是存在ui问题待解决*/
    color: #1CA6FC;
    border: 1px solid #1CA6FC;
    transform:translateY(1px);
    /*margin-top: 0px;*/
    /*margin-bottom: 14px;*/
  }

  @keyframes myMove1 {
    from {transform: scale(1.2);}
    to {transform: scale(1);}
  }

  @-webkit-keyframes myMove1 {
    from {transform: scale(1.2);}
    to {transform: scale(1);}
  }

  .a-icon {
    position: relative;
    width: 48px;
    height: 48px;
    display: block;
    margin: 0 auto 15px;
  }

  .a-text {
    color: #666;
    display: block;
    font-size: 18px;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease-in-out;
  }
  .slide-fade-leave-active {
    transition: all .3s linear;
  }
  .slide-fade-enter
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
  .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-20px);
    opacity: 0;
  }

  .slide-fade2-enter-active {
    transition: all .8s ease-out;
  }
  /*.slide-fade2-leave-active {*/
    /*transition: all .0s linear;*/
  /*}*/
  .slide-fade2-enter
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-5px);
    opacity: 0;
  }
  /*.slide-fade2-leave-to*/
    /*!* .slide-fade-leave-active for below version 2.1.8 *! {*/
    /*transform: translateY(-5px);*/
    /*opacity: 0;*/
  /*}*/

</style>
