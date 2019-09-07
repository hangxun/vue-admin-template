<template>
  <div class="test1">
    <div v-for="(item, idx) in data" :key="idx">{{idx}}</div>
  </div>
</template>

<script>
import pick from 'lodash/pick'
export default {
  name: 'test1',
  data () {
    return {
      data: [
        { a: 111, b: 222, c: 333 },
        { a: 111, b: 222, c: 333 },
        { a: 111, b: 222, c: 333 }
      ]
    }
  },
  computed: {
    dataMap () {
      return this.data.map(v => pick(v, ['a', 'c']))
    }
  }
}
</script>

<style scoped>
</style>
