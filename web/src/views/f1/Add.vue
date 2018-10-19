<template>
  <div class="f1-add">
    <!------ title ----->
    <div class="title">
      {{currAction.sub_menu_name}}
    </div>
    <!------ 输入框 ----->
    <el-table :data="tableStructure" border stripe style="width: 100%" v-loading="loading1" element-loading-text="拼命加载中">
      <el-table-column prop="fieldName" label="名称" align="center" min-width="80px" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="fieldType" label="输入结果" min-width="200px">
        <template slot-scope="scope">
            <!--{{scope.row}}-->
            <!-- 0静态文本 -->
            <div v-if="scope.row.fieldType.typeId == 0" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
            <!-- 2文本输入 -->
            <el-input style="width: 250px;" v-if="scope.row.fieldType.typeId == 2" size="small" v-model="scope.row.value" :disabled="false"><el-button slot="append" v-if="scope.row.fieldType.tail">{{scope.row.fieldType.tail}}</el-button></el-input>
            <!-- 1数字类型 -->
            <el-input-number v-if="scope.row.fieldType.typeId == 1" size="small" v-model="scope.row.value"></el-input-number>
            <!-- 4日期 -->
            <el-date-picker
              v-if="scope.row.fieldType.typeId == 4"
              size="small"
              v-model="scope.row.value"
              type="date"
              placeholder="选择日期"
              :format="scope.row.fieldType.content"
              :value-format="scope.row.fieldType.content">
            </el-date-picker>
            <!-- 6单选 -->
            <el-checkbox-group class="new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length < 3" @change="changeRadio(scope.row, scope.$index)" v-model="scope.row.value">
              <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group class="endways new-radio" v-if="scope.row.fieldType.typeId == 6 && scope.row.fieldType.content.length >= 3" @change="changeRadio(scope.row, scope.$index)"  v-model="scope.row.value">
              <el-radio :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-radio>
            </el-radio-group>
            <!-- 7下拉 -->
            <el-select v-if="scope.row.fieldType.typeId == 7" size="small" v-model="scope.row.value" placeholder="请选择">
              <el-option
                v-for="item in scope.row.fieldType.content"
                :key="item.codeId"
                :label="item.codeValue1"
                :value="item.codeValue1">
              </el-option>
            </el-select>
            <!-- 8多选 -->
            <el-checkbox-group v-if="scope.row.fieldType.typeId == 8 && scope.row.fieldType.content.length < 3" size="small" v-model="scope.row.value">
              <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group
              class="endways"
              v-if="scope.row.fieldType.typeId == 7 && scope.row.fieldType.content.length >= 3"
              size="small"
              v-model="scope.row.value">
              <el-checkbox :label="item.codeId" :key="item.codeId" v-for="item in scope.row.fieldType.content">{{item.codeValue1}}{{item.remark}}</el-checkbox>
            </el-checkbox-group>
            <!-- 11自动生成 -->
            <div v-if="scope.row.fieldType.typeId == 11" size="small">{{scope.row.fieldType.content}}{{scope.row.fieldType.tail}}</div>
            <!-- 9文件 -->
            <!-- 3长文本 -->
            <el-input v-if="scope.row.fieldType.typeId == 3" type="textarea"  size="small" maxlength="200" v-model="scope.row.value.value" :rows="3" placeholder="限制200字"></el-input>
            <!-- 5时间 -->
            <el-time-picker
              v-if="scope.row.fieldType.typeId == 5"
              size="small"
              v-model="scope.row.value.value"
              :format="scope.row.fieldType.content"
              :value-format="scope.row.fieldType.content">
            </el-time-picker>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button size="small" @click="goBack">返 回</el-button>
      <el-button size="small" type="primary" @click="save">保 存</el-button>
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
        tableStructure: [],
        fileList: [],
      };
    },
    created() {
      this.currAction = storageService.getLv3Nav();
      this.getStructure(this.currAction.formId);
    },
    methods: {
      getStructure(formId) {
        this.loading1 = true;
        f1Service.getF1Structure(formId).then((resp) => {
          this.loading1 = false;
          this.tableStructure = resp.fieldList;
          this.tableStructure.forEach((v) => {
            if (v.fieldType.type === 5) {
              v.value = v.value ? [null, v.value] : [null];
            }
          });
        });
      },
      save() {
        const params = {};
        this.tableStructure.forEach((v) => {
          if (v.fieldType.typeId === 0 || v.fieldType.typeId === 11) {
            params[v.fieldCode] = v.fieldType.content;
          } else if (v.fieldType.typeId === 6) {
            if (v.value.length === 1) {
              params[v.fieldCode] = '';
            } else {
              params[v.fieldCode] = v.value[1];
            }
          } else {
            params[v.fieldCode] = v.value;
          }
        });
        f1Service.postF1(this.currAction.formId, params).then((resp) => {
          if (resp) {
            this.$message({ message: '新增成功！', type: 'success' });
            this.JumpPage('NoCRFList');
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      changeRadio(row, index) {
        /**
         * 将checkbox改造为可以反向选中的radio组件
         * */
          // checkbox以数组形式保存，第一个值为null，从第2个值开始存值
        const arr = row.value;
        if (arr.length === 3) {
          // 第二三个值不同，取后者
          this.tableStructure[index].value = [null, arr[2]];
        }
      },
    },
  };
</script>

<style scoped>
  .f1-add {
    position: relative;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #efefef;
  }
</style>
