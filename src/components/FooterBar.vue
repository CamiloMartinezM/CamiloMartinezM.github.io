<script setup lang="ts">
import { Hammer } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-white dark:bg-footer py-2 relative">
    <div class="w-full max-w-screen-xl mx-auto px-4">
      <hr class="my-2 border-gray-200 dark:border-gray-700" />
      <div class="flex flex-col items-center">
        <span class="block text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
          Copyright © 2024.
          <a
            href="https://www.linkedin.com/in/camilo-martinez-m/?locale=en_US"
            class="text-highlight"
          >
            Camilo Martínez </a
          >. All rights reserved.
        </span>
        <div class="flex items-center space-x-2 text-yellow-500 dark:text-yellow-400 animate-pulse">
          <Hammer :size="16" />
          <span class="text-xs font-semibold">Website under construction</span>
          <Hammer :size="16" />
        </div>
      </div>
    </div>
  </footer>
</template>
