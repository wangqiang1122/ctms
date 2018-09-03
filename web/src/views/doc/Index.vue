<template>
  <div class="dev-doc">
    <h2>平台组件开发文档</h2>
    <h3>1、Button 按钮</h3>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <div style="margin: 10px 0;">
          1、type 默认值：空心按钮。 <br>
          2、type="primary" ：深蓝色#5F80E4； <br>
          3、type="info" ：浅蓝色#92B7FF； <br>
          4、type="blue" ：浅蓝色边框，空心 #999； <br>
          5、type="text" ：文字按钮； <br>
          button中的icon优先使用element自带icon
        </div>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <div style="margin: 10px 0;">
          1、size="large" ：宽度100%；用于适应外层宽度的按钮； <br>
          2、size="medium" ： 宽度120px，高度40; 用于'保存'，'下一步'等操作按钮； <br>
          3、size="medium-auto" ：左右有固定padding，内容可被字体撑开，高度40;<br>
          4、size="small" ：宽度100，高度30 ;<br>
          5、size="small-auto" ：左右有固定padding，内容可被字体撑开，高度30;
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <p style="width: 200px; float: left;"></p>
        <p style="width: 200px;float: left;margin-left: 10px;"></p>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-button type="primary" size="medium" round>保存</el-button>
        <el-button size="medium" round>取消</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button1">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button2">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-button type="primary" size="medium-auto" round>保存</el-button>
        <el-button size="medium-auto" round>取消</el-button>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-button type="primary" size="medium-auto" round icon="el-icon-download">下载文档</el-button>
        <el-button type="primary" size="medium-auto" round icon="el-icon-message">发送邮件</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button3">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button4">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-button type="info" size="small">导出</el-button>
        <el-button type="info" size="small">列为首页</el-button>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-button type="info" size="small-auto">导出</el-button>
        <el-button type="info" size="small-auto">列为首页</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button5">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button6">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-button type="info" size="medium-auto">交割</el-button>
        <el-button type="blue" size="medium-auto">结案</el-button>
        <el-button size="medium-auto" disabled>结案</el-button>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-button type="text">文字按钮</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="3"
          v-model="button7">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="button8">
        </el-input>
      </el-col>
    </el-row>



    <h3>2、Input 输入</h3>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <div style="margin: 20px 0;">
          1、size="mini-s" ：宽度80，高度30； <br>
          2、size="small-s" ： 宽度180，高度30；<br>
          3、size="auto-s" ： 宽度100%，高度30；<br>
          4、size="mini" ： 宽度100，高度40；<br>
          5、size="small" ： 宽度250，高度40；<br>
          6、size="medium" ： 宽度370，高度40；<br>
          7、size="large" ： 宽度500，高度40；<br>
          8、size="auto" ： 宽度100%，高度40；<br>
          9、size="no-border" ： 宽度100%，高度30；<br>
          10、size="round" ： 宽度100%，高度50；圆形输入框<br>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input v-model="input" size="mini-s" placeholder="请输入"></el-input>
        <el-input v-model="input" size="small-s" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-input v-model="input" size="mini" placeholder="请输入"></el-input>
        <el-input v-model="input" size="small" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="input1">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="input2">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input v-model="input" size="auto-s" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-input v-model="input" size="medium" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="input3">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="input4">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input v-model="input" size="auto" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-input v-model="input" size="large" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="input5">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="input6">
        </el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="11" style="background: #eee;padding: 10px">
        <el-input v-model="input" size="no-border" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11" >
        <el-input v-model="input" size="round" placeholder="请输入"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="1"
          v-model="input7">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="1"
          v-model="input8">
        </el-input>
      </el-col>
    </el-row>

    <h3>3、Select 选择</h3>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <div style="margin: 20px 0;">
          select所有尺寸继承自input。时间选择框同select<br>
          1、size="mini-s" ：宽度80，高度30； <br>
          2、size="small-s" ： 宽度180，高度30；<br>
          3、size="auto-s" ： 宽度100%，高度30；<br>
          4、size="mini" ： 宽度100，高度40；<br>
          5、size="small" ： 宽度250，高度40；<br>
          6、size="medium" ： 宽度370，高度40；<br>
          7、size="large" ： 宽度500，高度40；<br>
          8、size="auto" ： 宽度100%，高度40；<br>
          9、size="round" ： 宽度100%，高度50；圆形输入框<br>
        </div>
      </el-col>
    </el-row>
    <!-- -->
    <el-row :gutter="20">
      <el-col :span="11">
        <el-select v-model="value" size="mini-s" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" size="small-s" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-select v-model="value" size="mini" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value" size="small" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="5"
          v-model="select1">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="select2">
        </el-input>
      </el-col>
    </el-row>
    <!-- -->
    <el-row :gutter="20">
      <el-col :span="11">
        <el-select v-model="value" size="auto-s" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-select v-model="value" size="medium" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="hr">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="select3">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="2"
          v-model="select4">
        </el-input>
      </el-col>
    </el-row>
    <!-- -->
    <el-row :gutter="20">
      <el-col :span="11">
        <el-select v-model="value" size="auto" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> &nbsp;</el-col>
      <el-col :span="11">
        <el-select v-model="value" size="large" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="1"
          v-model="select5">
        </el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="1"
          v-model="select6">
        </el-input>
      </el-col>
    </el-row>

    <!-- -->
    <el-row :gutter="20">
      <el-col :span="11">
        <el-select v-model="value" size="round" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="1"
          v-model="select7">
        </el-input>
      </el-col>
    </el-row>

    <h3>4、Radio 单选框</h3>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-radio-group v-model="radio">
          <el-radio :label="1">备选项</el-radio>
          <el-radio :label="2">备选项</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="4"
          v-model="radio1">
        </el-input>
      </el-col>
    </el-row>

    <h3>5、Checkbox 多选框</h3>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-input
          type="textarea"
          :rows="6"
          v-model="checkbox1">
        </el-input>
      </el-col>
    </el-row>

    <h3>6、Switch 开关</h3>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-switch
          v-model="switch0">
        </el-switch>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="1"
          v-model="switch1">
        </el-input>
      </el-col>
    </el-row>

    <h3>7、Message 消息提示</h3>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-button :plain="true" @click="open2">成功</el-button>
        <el-button :plain="true" @click="open3">警告</el-button>
        <el-button :plain="true" @click="open4">错误</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-input
          type="textarea"
          :rows="3"
          v-model="message1">
        </el-input>
      </el-col>
    </el-row>

    <h3>8、Dialog 对话框</h3>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog
          :center="true"
          title="日志转移"
          :visible.sync="dialogVisible"
          :before-close="handleClose">
          <el-form label-position="top" label-width="120px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.name" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formLabelAlign.region" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-select v-model="value" size="medium" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button size="medium"  round @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" size="medium"  round @click="dialogVisible = false">保存</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-input
          type="textarea"
          :rows="18"
          v-model="dailog">
        </el-input>
      </el-col>
    </el-row>

    <h3>9、MessageBox 弹框</h3>
    <el-row :gutter="24">
      <el-col :span="16">
        <el-button type="text" @click="openMessageBox">点击打开 Message Box</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="15">
        <el-input
          type="textarea"
          :rows="18"
          v-model="messageBox">
        </el-input>
      </el-col>
    </el-row>

    <h3>10、Table表格</h3>
    <el-row :gutter="20" class="hr">
      <el-col :span="15">
        <div style="margin: 10px 0;">
          fixed属性，接受Boolean值或者left、right， 固定列 <br>
          show-overflow-tooltip属性，为true时多余的内容会在 hover 时以 tooltip 的形式显示出来。 <br>
          resizable属性，对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真） <br>
          实现多选: 手动添加一个el-table-column，设type属性为selection即可； <br>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column align="left" type="selection" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" fixed label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="office" label="办公室" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="department" label="部门" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="username" label="姓名" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="sex" label="性别" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="role" label="角色" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="status" label="状态" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="completedState" label="手续完成状态" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown trigger="click" @command="handleCommand(scope,scope.$index)">
                <el-button size="mini" class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item id="edit">编辑</el-dropdown-item>
                  <el-dropdown-item id="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="15">
        <textarea rows="30" cols="150">
          <el-table :data="tableData1" style="width: 100%">
          <el-table-column align="left" type="selection" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" fixed label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="office" label="办公室" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="department" label="部门" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="username" label="姓名" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="sex" label="性别" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="role" label="角色" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="status" label="状态" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="completedState" label="手续完成状态" min-width="50" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-dropdown trigger="click" @command="handleCommand(scope,scope.$index)">
                <el-button size="mini" class="el-dropdown-link">
                  操作
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item id="edit">编辑</el-dropdown-item>
                  <el-dropdown-item id="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>

        操作处理：
          handleCommand(scope) {
              const name = event.target.id;
              const command = scope.row; // 选中行的信息
              switch (name) {
                case 'edit':
                  // TODO：编辑的处理逻辑
                  break;
                case 'delete':
                  // TODO：删除处理逻辑
                  break;
                default:
                  break;
              }
            },
        </textarea>
      </el-col>
    </el-row>

    <h3>11、Pagination 分页</h3>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                       :page-sizes="pagination.pageSizes" :layout="pagination.layout" :total="pagination.totalNum">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="20">
        <textarea rows="12" cols="150">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                         :page-sizes="pagination.pageSizes" :layout="pagination.layout" :total="pagination.totalNum">
          </el-pagination>

          pagination: {
            pageSize: this.PAGINATION_SIZE, // 单页数量
            pageSizes: this.PAGINATION_SIZES, // 单页数量可选
            currentPage: 1, // 当前页
            totalNum: 100, // 数据总条数
            layout: this.PAGINATION_LAYOUT,
          },
        </textarea>
      </el-col>
    </el-row>

    <h3>12、search params</h3>
    <div style="background: #eee;padding: 20px;margin-bottom: 20px;">
      <div class="searchBox">
        <div class="searchTitle">输入查询条件</div>
        <el-form ref="form" :model="form">
          <el-row :gutter="20">
            <el-col :md="6" :lg="4">
              <el-form-item>
                <el-date-picker
                  size="round"
                  v-model="date"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="4">
              <el-form-item>
                <el-date-picker
                  size="round"
                  v-model="date"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="4">
              <el-form-item>
                <el-select v-model="value" size="round" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="4">
              <el-form-item>
                <el-select v-model="value" size="round" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="4">
              <el-form-item>
                <el-select v-model="value" size="round" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row :gutter="20" class="searchFooter">
          <el-col :md="6" :lg="4">
            <el-button type="primary" size="large"  round>搜索</el-button>
          </el-col>
          <el-col :md="6" :lg="4">
            <el-button size="large" round>重置</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row :gutter="24">
      <el-col :span="20">
        <textarea rows="12" cols="150">
          <div class="searchBox">
            <div class="searchTitle">输入查询条件</div>
            <el-form ref="form" :model="form">
              <el-row :gutter="20">
                <el-col :md="6" :lg="4">
                  <el-form-item>
                    <el-select v-model="value" size="round" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row :gutter="20" class="searchFooter">
              <el-col :md="6" :lg="4">
                <el-button type="primary" size="large"  round>搜索</el-button>
              </el-col>
              <el-col :md="6" :lg="4">
                <el-button size="large" round>重置</el-button>
              </el-col>
            </el-row>
          </div>
        </textarea>
      </el-col>
    </el-row>

    <h3>13、search content</h3>
    <div style="background: #eee;padding: 20px;margin-bottom: 20px;">
      <div class="contentBox">
        <div class="contentTitle">查询结果</div>
        <el-table :data="caseDataList" >
          <el-table-column align="left" fixed label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
          <el-table-column align="left" prop="caseInfo.caseId" label="案件编号" min-width="50" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="pagination.pageSize" :page-sizes="pagination.pageSizes" :layout="pagination.layout" :total="pagination.totalNum">
        </el-pagination>
      </div>
    </div>
    <el-row :gutter="24">
      <el-col :span="20">
        <textarea rows="12" cols="150">
          <div class="contentBox">
            <div class="contentTitle">查询结果</div>
            <el-table :data="caseDataList" >
              <el-table-column align="left" fixed label="序号" type="index" width="55" show-overflow-tooltip></el-table-column>
              <el-table-column align="left" prop="caseInfo.caseId" label="案件编号" min-width="50" show-overflow-tooltip></el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-size="pagination.pageSize" :page-sizes="pagination.pageSizes" :layout="pagination.layout" :total="pagination.totalNum">
            </el-pagination>
          </div>
        </textarea>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: 'DevDoc',
  data() {
    return {
      creditedAccount: '',
      button1: '<el-button type="primary" size="large"  round>搜索</el-button> \n<el-button size="large" round>重置</el-button>',
      button2: '<el-button type="primary" size="medium"  round>保存</el-button>  \n<el-button size="medium" round>取消</el-button>',
      button3: '<el-button type="primary" size="medium-auto" round>保存</el-button>  \n<el-button size="medium-auto" round>取消</el-button>',
      button4: '<el-button type="primary" size="medium-auto" round icon="el-icon-download">下载文档</el-button>  \n<el-button type="primary" size="medium-auto" round icon="el-icon-message">发送邮件</el-button>',
      button5: '<el-button type="info" size="small">导出</el-button> \n<el-button type="info" size="small">列为首页</el-button>',
      button6: '<el-button type="info" size="small-auto">导出</el-button> \n<el-button type="info" size="small-auto">列为首页</el-button>',
      button7: '<el-button type="info" size="medium-auto">交割</el-button> \n<el-button type="gray" size="medium-auto">结案</el-button> \n<el-button type="gray" size="medium-auto" disabled>结案</el-button>',
      button8: '<el-button type="text">文字按钮</el-button>',
      input1: '<el-input v-model="input" size="mini-s"></el-input> \n<el-input v-model="input" size="small-s"></el-input>',
      input2: '<el-input v-model="input" size="mini"></el-input> \n<el-input v-model="input" size="small"></el-input>',
      input4: '<el-input v-model="input" size="medium"></el-input>',
      input5: '<el-input v-model="input" size="auto"></el-input>',
      input3: '<el-input v-model="input" size="auto-s"></el-input>',
      input6: '<el-input v-model="input" size="large"></el-input>',
      input7: '<el-input v-model="input" size="no-border"></el-input>',
      input8: '<el-input v-model="input" size="round"></el-input>',
      input: '',
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      select1: '<el-select v-model="value" size="mini-s" placeholder="请选择"> \n<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> \n</el-option> \n</el-select> \n size="small-s"',
      select2: 'size="mini" \nsize="small"',
      select3: 'size="auto-s"',
      select4: 'size="medium"',
      select5: 'size="auto"',
      select6: 'size="large"',
      select7: 'size="round"',
      radio: 1,
      radio1: '<el-radio-group v-model="radio">\n <el-radio :label="1">备选项1</el-radio> \n<el-radio :label="2">备选项2</el-radio>\n</el-radio-group>',

      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true,
      checkbox1: '<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> \n<div style="margin: 15px 0;"></div> \n<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"> \n<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox> \n</el-checkbox-group>',

      switch0: true,
      switch1: '<el-switch v-model="switch"> </el-switch>',

      message1: 'this.$message({message: "恭喜你，这是一条成功消息",type: "success"}); \nthis.$message({message: "警告哦，这是一条警告消息",type: "warning"});\nthis.$message.error("错了哦，这是一条错误消息");',
      dialogVisible: false,
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
      dailog: '<el-dialog :center="true" title="日志转移" :visible.sync="dialogVisible" :before-close="handleClose"> \n<el-form label-position="top" label-width="120px" :model="formLabelAlign"> \n<el-form-item label="名称"> \n<el-input v-model="formLabelAlign.name" size="medium"></el-input> \n</el-form-item> \n<el-form-item label="活动区域"> \n<el-input v-model="formLabelAlign.region" size="medium"></el-input> \n</el-form-item> \n<el-form-item label="活动形式"> \n<el-input v-model="formLabelAlign.type" size="medium"></el-input> \n</el-form-item> \n</el-form> \n<span slot="footer"> \n<el-button size="medium"  round @click="dialogVisible = false">取消</el-button> \n<el-button type="primary" size="medium"  round @click="dialogVisible = false">保存</el-button> \n</span> \n</el-dialog>\n 可选参数： width="50%"，宽度百分比；默认宽度 470px ',
      messageBox: 'openMessageBox() {\nthis.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {\n confirmButtonText: "确定",\n cancelButtonText: "取消",\n type: "warning",\n}).then(() => {\nthis.$message({\n type: "success",\n message: "删除成功!",\n});\n}).catch(() => {\n this.$message({\n type: "warning",\n message: "已取消删除",\n});\n});\n}',
      tableData1: [
        {
          office: '北京',
          department: '人力',
          username: '内容很长内容很长内容很长内容很长内容很长',
          sex: '女',
          role: '合伙人',
          status: '在职',
          completedState: '完成',
        },
        {
          office: '北京',
          department: '人力',
          username: '哈哈哈',
          sex: '女',
          role: '合伙人',
          status: '在职',
          completedState: '完成',
        },
      ],
      pagination: {
        pageSize: this.PAGINATION_SIZE, // 单页数量
        pageSizes: this.PAGINATION_SIZES, // 单页数量可选
        currentPage: 1, // 当前页
        totalNum: 100, // 数据总条数
        layout: this.PAGINATION_LAYOUT,
      },
      date: '',
      activeName: 'first',
      caseDataList: [],
      form: {},
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? ['上海', '北京', '广州', '深圳'] : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    open2() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      });
    },
    open3() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning',
      });
    },
    open4() {
      this.$message.error('错了哦，这是一条错误消息');
    },
    handleClose(done) {
      done();
    },
    openMessageBox() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除',
        });
      });
    },
    // 操作
    handleCommand(scope) {
      const name = event.target.id;
      const command = scope.row; // 选中行的信息
      switch (name) {
        case 'edit':
          // TODO：编辑的处理逻辑
          break;
        case 'delete':
          // TODO：删除处理逻辑
          break;
        default:
          break;
      }
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
    },
    handleClick(tab, event) {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  c {
    color:  #2BA9ED; /* head - logo */
    color: #485E66; /* head - set */
    color: #35B4F7; /* head - font */
    color: #3399EC; /* side */
    color: #2D87CF; /* side - active */
    color: #E6EDF3; /* body - background */
    color: #7C848E; /* project - icon */
    color: #1CA6FC; /* project - icon active */
  }
  h2 {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }

  h3 {
    margin: 30px -10px 10px -10px;
    border-top: 1px solid #aaa;
    height: 40px;
    line-height: 40px;
  }

  .el-row {
    margin-bottom: 15px;
    padding-bottom: 15px;
  }

  .hr {
    border-bottom: 2px dashed #ccc;
    margin-bottom: 40px;
  }
</style>
