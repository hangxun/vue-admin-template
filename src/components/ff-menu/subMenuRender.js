export default {
  name: 'subMenuRender',
  props: {
    sub: {
      type: Object,
      default: _ => ({})
    }
  },
  render (h) {
    const subMenu = <el-submenu index={this.sub.name}>
      <template slot='title'>
        {this.sub.meta && this.sub.meta.icon ? <i className={this.sub.meta.icon}></i> : null}
        {/* eslint-disable-next-line no-mixed-operators */}
        {this.sub.meta && this.sub.meta.title || this.sub.name}
      </template>
      {
        this.sub.children ? this.sub.children.map(ch => <subMenuRender sub={ch}></subMenuRender>) : null
      }
    </el-submenu>
    const subItem = <el-menu-item index={this.sub.name}>
      {this.sub.meta && this.sub.meta.icon ? <i className={this.sub.meta.icon}></i> : null}
      {/* eslint-disable-next-line no-mixed-operators */}
      {this.sub.meta && this.sub.meta.title || this.sub.name}
    </el-menu-item>
    // return <template>{ (this.sub.children && this.sub.children.length) ? subMenu : subItem }</template>
    return (this.sub.children && this.sub.children.length) ? subMenu : subItem
  }
}
