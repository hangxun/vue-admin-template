<template>
  <div class="menu1-1">
    <ff-tinymce v-model="content"></ff-tinymce>
  </div>
</template>

<script>
export default {
  name: 'menu1-1',
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>
  .menu1-1 {
    padding: 20px;
  }
</style>
