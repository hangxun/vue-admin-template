export default {
  props: {
    render: {
      type: Function
    },
    row: {
      type: Object,
      default: _ => ({})
    },
    column: {
      type: Object,
      default: _ => ({})
    },
    index: {
      type: Number,
      default: -1
    }
  },
  render (h) {
    return this.render(h, this.row, this.column, this.index)
  }
}
