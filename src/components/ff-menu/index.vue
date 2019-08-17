<template>
  <el-menu
    :default-active="$route.name"
    class="ff-menu"
    :mode="mode"
    @select="handleSelect"
    :background-color="bc"
    :text-color="tc"
    :active-text-color="atc">
    <subMenu v-for="route in filteredNavs" :key="route.path" :sub="route"></subMenu>
  </el-menu>
</template>

<script>
/**
 * 必填
 * @param navs: 导航数据
 * [
 *  {path: '', name: '', meta: { title: '', hidden: false }}
 * ]
 * *
 * 选填
 * @param mode: 模式, horizontal: 横向, vertical: 纵向
 * @param isRoute: 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 name 进行路由跳转
 * @param bc: 菜单的背景色（仅支持 hex 格式）
 * @param tc: 菜单的文字颜色（仅支持 hex 格式）
 * @param atc: 当前激活菜单的文字颜色（仅支持 hex 格式）
 * @function select(index, indexPath) {}: 菜单激活回调, index: 选中菜单项的 index, indexPath: 选中菜单项的 index path
* */

/**
 * 导航数据
 * navs
 * @param path: 唯一标识
 * @param name: 导航跳转的路由name,
 * @params meta: 其他信息； title: 显示的标题，没有的话取name值； hidden: 是否在菜单中隐藏
 * */
export default {
  name: 'ffMenu',
  components: {
    'subMenu': _ => import('./subMeun')
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
        this.$router.push({ name: index })
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

<style scoped lang="less">

</style>
