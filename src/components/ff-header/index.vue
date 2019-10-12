<template>
  <div class="ff-header">
    <slot name="left"></slot>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$_loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-s-tools tools-icon" @click="handleConfigShow"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FfHeader',
  data () {
    return {
    }
  },
  methods: {
    handleConfigShow () {
      this.$store.commit('setTheme', { prop: 'configShow', val: true })
    }
  }
}
</script>

<style scoped lang="less">
  .ff-header {
    width: 100%;
    height: 60px;
    min-height: 60px;
    background-color: #545c64;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    .right {
      display: flex;
      align-items: center;
      .el-dropdown-link {
        color: #ffffff;
        cursor: pointer;
      }
      .tools-icon {
        font-size: 16px !important;
        color: #ffffff;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
