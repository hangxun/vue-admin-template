<template>
  <div class="test1">
    <div v-for="(item, idx) in data" :key="idx">{{idx}}</div>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
</style>
