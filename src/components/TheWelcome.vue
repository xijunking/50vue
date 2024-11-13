<script setup lang="ts">

// 扩大卡片
const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFD700', '#E6E6FA']
const items = Array.from({ length: 5 })

const bgs = [
  'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
  'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
  'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
]

</script>

<template>
  <div class="list">
    <div v-for="(item, index) in items" :key="index" class="xlist-item" :style="{
      background: colors[index],
      backgroundImage: `url(${bgs[index]})`
    }">
      {{ index }}
    </div>

  </div>
</template>

<style scoped>
.list {
  width: 1200px;
  display: flex;
}

.xlist-item {
  width: 120px;
  height: 460px;
  margin: 10px;
  border-radius: 16px;
  display: flex;
  place-content: center;

  transition: width 0.3s ease;
}

.xlist-item:hover {
  width: 800px;
}
</style>
