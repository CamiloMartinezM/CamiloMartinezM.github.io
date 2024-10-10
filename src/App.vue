<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavBar class="flex-shrink-0" />
    <RouterView class="flex-grow dark:bg-body" />
    <FooterBar class="flex-shrink-0" />
  </div>
</template>
