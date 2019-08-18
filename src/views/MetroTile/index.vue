<template>
  <div class="MetroTile">
    <metro-tile></metro-tile>
  </div>
</template>

<script>
export default {
  name: 'MetroTile',
  components: {
    'MetroTile': _ => import('vue-metro-tile')
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
