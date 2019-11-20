<template>
  <el-table-column
    v-if="item.render && !item.hidden"
    class-name="allow-drop-column"
    :align="item.align || align"
    :label="item.label"
    :min-width="item.width"
    :sortable="item.sortable || false"
    :sort-by="item.sortBy"
    :sort-method="item.sortMethod"
    :fixed="item.fixed"
  >
    <template v-if="item.children">
      <ff-table-column
        v-for="child in item.children"
        :key="child.prop"
        :item="child"
        :align="align"
        :data="data"
        :placeholder="placeholder"
      >
        <template v-for="(_, key) in slots" #[key]="scope">
          <slot v-if="_hasHeader(key)" :name="key" :column="scope.column"></slot>
          <slot v-else :name="key" :row="scope.row"></slot>
        </template>
      </ff-table-column>
    </template>
    <template #header="scope" v-if="_hasPropHeader(item.prop)">
      <slot :name="'header-' + item.prop" :column="scope.column"></slot>
    </template>
    <template v-slot="scope">
      <render v-if="item.render" :render="item.render" :row="scope.row" :column="item" :index="_getIndex(scope.row)"></render>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="item.slot && !item.hidden"
    class-name="allow-drop-column"
    :align="item.align || align"
    :label="item.label"
    :min-width="item.width"
    :sortable="item.sortable || false"
    :sort-by="item.sortBy"
    :sort-method="item.sortMethod"
    :fixed="item.fixed"
  >
    <template v-if="item.children">
      <ff-table-column
        v-for="child in item.children"
        :key="child.prop"
        :item="child"
        :align="align"
        :data="data"
        :placeholder="placeholder"
      >
        <template v-for="(_, key) in slots" #[key]="scope">
          <slot v-if="_hasHeader(key)" :name="key" :column="scope.column"></slot>
          <slot v-else :name="key" :row="scope.row"></slot>
        </template>
      </ff-table-column>
    </template>
    <template #header="scope" v-if="_hasPropHeader(item.prop)">
      <slot :name="'header-' + item.prop" :column="scope.column"></slot>
    </template>
    <template v-slot="scope">
      <slot :name="item.slot" :row="scope.row"></slot>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="!item.hidden"
    class-name="allow-drop-column"
    :align="item.align || align"
    :prop="item.prop"
    :label="item.label"
    :min-width="item.width"
    :sortable="item.sortable || false"
    :sort-by="item.sortBy"
    :sort-method="item.sortMethod"
    :formatter="item.formatter"
    :show-overflow-tooltip="item.showTooltip || false"
    :fixed="item.fixed"
  >
    <template v-if="item.children">
      <ff-table-column
        v-for="child in item.children"
        :key="child.prop"
        :item="child"
        :align="align"
        :data="data"
        :placeholder="placeholder"
      >
        <template v-for="(_, key) in slots" #[key]="scope">
          <slot v-if="_hasHeader(key)" :name="key" :column="scope.column"></slot>
          <slot v-else :name="key" :row="scope.row"></slot>
        </template>
      </ff-table-column>
    </template>
    <template #header="scope" v-if="_hasPropHeader(item.prop)">
      <slot :name="'header-' + item.prop" :column="scope.column"></slot>
    </template>
    <template v-slot="scope" v-if="!item.formatter">
      <template v-if="_checkVal(scope.row[item.prop])">{{placeholder}}</template>
      <template v-else>{{scope.row[item.prop]}}</template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'ff-table-column',
  components: {
    render: _ => import('./render')
  },
  props: {
    item: Object,
    align: String,
    data: Array,
    placeholder: String,
    dropColumn: Boolean
  },
  data () {
    return {}
  },
  computed: {
    slots () {
      return this.$scopedSlots
    }
  },
  methods: {
    _hasPropHeader (prop) {
      let slots = Object.keys(this.$scopedSlots)
      return slots.includes(`header-${prop}`)
    },
    _hasHeader (name) {
      return name.includes('header')
    },
    _checkVal (val) {
      if (val === null || val === undefined || val === '') return true
      else return false
    },
    _getIndex (row) {
      return this.data.findIndex(v => v === row)
    }
  }
}
</script>

<style scoped>
</style>
