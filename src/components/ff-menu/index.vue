<template>
  <el-menu
    class="ff-menu"
    :default-active="$route.name"
    :mode="mode"
    :background-color="bc"
    :text-color="tc"
    :active-text-color="atc"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <subMenu v-for="route in filteredNavs" :key="route.name" :sub="route"></subMenu>
  </el-menu>
</template>

<script>
/**
 * 必须参数
 * @param {Array} navs 导航数据
 * *
 * 可选参数
 * @param {string} mode 模式, 横向: horizontal, 纵向: vertical
 * @param {boolean} isRoute 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 name 进行路由跳转
 * @param {string} bc 菜单的背景色（仅支持 hex 格式）
 * @param {string} tc 菜单的文字颜色（仅支持 hex 格式）
 * @param {string} atc 当前激活菜单的文字颜色（仅支持 hex 格式）
 * @param {boolean} isCollapse 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
 * *
 * @function select 菜单激活回调
 * @param index 选中菜单项的 index
 * @param indexPath 选中菜单项的 index path
* */

/**
 * 导航数据
 * navs
 * @param {string} path 唯一标识
 * @param {string} name 导航跳转的路由name,
 * @param {Object} meta 其他信息； { title: 显示的标题，没有的话取name值； hidden: 是否在菜单中隐藏 }
 * */
import { url } from '@/utils/regexp'
export default {
  name: 'FfMenu',
  components: {
    'subMenu': _ => import('./subMenu')
    // 'subMenuRender': _ => import('./subMenuRender')
  },
  props: {
    navs: {
      type: Array,
      default: _ => this.$router.options.routes
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    isRoute: {
      type: Boolean,
      default: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    bc: {
      type: String,
      default: '#545c64'
    },
    tc: {
      type: String,
      default: '#fff'
    },
    atc: {
      type: String,
      default: '#ffd04b'
    }
  },
  data () {
    return {}
  },
  computed: {
    filteredNavs () {
      return this.filterNavs(this.navs)
    }
  },
  methods: {
    handleSelect (index, indexPath) {
      this.$emit('select', index, indexPath)
      if (this.isRoute) {
        if (url.test(index)) {
          window.open(index)
        } else {
          this.$router.push({ name: index })
        }
      }
    },
    filterNavs (navs) {
      return navs.filter(nav => {
        let children = nav.children
        if (children && children.length) {
          nav.children = this.filterNavs(children)
        }
        if (nav.meta) return !nav.meta.hidden
        else return true
      })
    }
  }
}
</script>

<style lang="less">
  .ff-menu:not(.el-menu--collapse):not(.el-menu--horizontal) {
    width: 200px;
    height: 100%;
  }
  .el-menu--collapse .el-tooltip {
    line-height: 56px;
  }
</style>
