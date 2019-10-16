<template>
  <div class="menu4">
    menu4
    <ff-table
      :titles="titles"
      :data="data"
      isShowIndex
      isSelection
    >
      <template #aa="{ row }">
          {{row.aa}}
      </template>
      <template #bb="{ row }">
          {{row.bb}}
      </template>
      <template #cc="{ row }">
          {{row.cc}}
      </template>
    </ff-table>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'menu4',
  data () {
    return {
      titles: [
        { label: 'aa', prop: 'aa' },
        { label: 'bb', prop: 'bb' },
        { label: 'cc', prop: 'cc' }
      ],
      data: [
        { aa: 1, bb: 2, cc: 3 },
        { aa: 11, bb: 22, cc: 33 }
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .box {
    width: 200px;
    height: 200px;
    background-color: #009900;
  }
  .ch {
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
