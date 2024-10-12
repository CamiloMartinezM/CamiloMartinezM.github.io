<template>
  <div ref="container" :class="containerClass">
    <slot></slot>
    <div class="twentytwenty-overlay">
      <div
        v-for="(img, index) in processedImages"
        :key="`label-${index}`"
        :class="`twentytwenty-label-${index + 1}`"
      >
        {{ img.alt }}
      </div>
      <div
        v-for="index in processedImages.length"
        :key="`frame-${index}`"
        :class="`twentytwenty-frame-${index}`"
      ></div>
    </div>
    <div class="twentytwenty-handle" :style="handleStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick, useSlots } from 'vue'
import '@/assets/css/twentytwenty.css'

interface ImageType {
  src: string
  alt: string
  el: HTMLImageElement
}

interface OptionsType {
  default_offset_pct_x: number
  default_offset_pct_y: number
  click_needed: boolean
}

interface OffsetType {
  w: string
  h: string
  cw: string
  ch: string
  w2: number
  h2: number
  cw2: number
  ch2: number
}

const props = defineProps<{
  options?: OptionsType
}>()

const container = ref<HTMLDivElement | null>(null)
const processedImages = ref<ImageType[]>([])
const imagesLoaded = ref(0)

const slots = useSlots()

const containerClass = computed(
  () => `twentytwenty-container twentytwenty-compare-${processedImages.value.length}`
)

const sliderPctX = ref(props.options?.default_offset_pct_x ?? 0.5)
const sliderPctY = ref(props.options?.default_offset_pct_y ?? 0.5)

const handleStyle = computed(() => ({
  left: `${sliderPctX.value * 100}%`,
  top: processedImages.value.length > 2 ? `${sliderPctY.value * 100}%` : '0',
  height: '100%'
}))

const calcOffset = (dimensionPctX: number, dimensionPctY: number): OffsetType | null => {
  if (!container.value) return null
  const w = container.value.offsetWidth
  const h = container.value.offsetHeight
  return {
    w: `${w}px`,
    h: `${h}px`,
    cw: `${dimensionPctX * w}px`,
    ch: `${dimensionPctY * h}px`,
    w2: w,
    h2: h,
    cw2: dimensionPctX * w,
    ch2: dimensionPctY * h
  }
}

const adjustContainer = (offset: OffsetType | null) => {
  if (!container.value || !offset) return

  const overlay = container.value.querySelector('.twentytwenty-overlay') as HTMLElement
  const labels = container.value.querySelectorAll(
    '[class^="twentytwenty-label-"]'
  ) as NodeListOf<HTMLElement>
  const frames = container.value.querySelectorAll(
    '[class^="twentytwenty-frame-"]'
  ) as NodeListOf<HTMLElement>

  overlay.style.width = offset.w
  overlay.style.height = offset.h

  processedImages.value.forEach((img, index) => {
    if (!img.el) return

    let clipRect: string
    if (processedImages.value.length === 2) {
      clipRect =
        index === 0
          ? `rect(0, ${offset.cw}, ${offset.h}, 0)`
          : `rect(0, ${offset.w}, ${offset.h}, ${offset.cw})`
    } else if (processedImages.value.length === 3) {
      if (index === 0) clipRect = `rect(0, ${offset.cw}, ${offset.ch}, 0)`
      else if (index === 1) clipRect = `rect(0, ${offset.w}, ${offset.ch}, ${offset.cw})`
      else clipRect = `rect(${offset.ch}, ${offset.w}, ${offset.h}, 0)`
    } else if (processedImages.value.length === 4) {
      if (index === 0) clipRect = `rect(0, ${offset.cw}, ${offset.ch}, 0)`
      else if (index === 1) clipRect = `rect(0, ${offset.w}, ${offset.ch}, ${offset.cw})`
      else if (index === 2) clipRect = `rect(${offset.ch}, ${offset.cw}, ${offset.h}, 0)`
      else clipRect = `rect(${offset.ch}, ${offset.w}, ${offset.h}, ${offset.cw})`
    } else {
      clipRect = 'auto'
    }

    img.el.style.clip = clipRect
  })

  if (processedImages.value.length === 2) {
    labels[0].style.right = `${offset.w2 - offset.cw2}px`
    labels[1].style.left = `${offset.cw2}px`
    frames[0].style.width = `${offset.cw2}px`
    frames[0].style.height = `${offset.h2}px`
    frames[1].style.width = `${offset.w2 - offset.cw2}px`
    frames[1].style.height = `${offset.h2}px`
  } else if (processedImages.value.length === 3) {
    labels[0].style.right = `${offset.w2 - offset.cw2}px`
    labels[0].style.bottom = `${offset.h2 - offset.ch2}px`
    labels[1].style.left = `${offset.cw2}px`
    labels[1].style.bottom = `${offset.h2 - offset.ch2}px`
    labels[2].style.top = `${offset.ch2}px`
    frames[0].style.width = `${offset.cw2}px`
    frames[0].style.height = `${offset.ch2}px`
    frames[1].style.width = `${offset.w2 - offset.cw2}px`
    frames[1].style.height = `${offset.ch2}px`
    frames[2].style.width = `${offset.w2}px`
    frames[2].style.height = `${offset.h2 - offset.ch2}px`
  } else if (processedImages.value.length === 4) {
    labels[0].style.right = `${offset.w2 - offset.cw2}px`
    labels[0].style.bottom = `${offset.h2 - offset.ch2}px`
    labels[1].style.left = `${offset.cw2}px`
    labels[1].style.bottom = `${offset.h2 - offset.ch2}px`
    labels[2].style.right = `${offset.w2 - offset.cw2}px`
    labels[2].style.top = `${offset.ch2}px`
    labels[3].style.left = `${offset.cw2}px`
    labels[3].style.top = `${offset.ch2}px`
    frames[0].style.width = `${offset.cw2}px`
    frames[0].style.height = `${offset.ch2}px`
    frames[1].style.width = `${offset.w2 - offset.cw2}px`
    frames[1].style.height = `${offset.ch2}px`
    frames[2].style.width = `${offset.cw2}px`
    frames[2].style.height = `${offset.h2 - offset.ch2}px`
    frames[3].style.width = `${offset.w2 - offset.cw2}px`
    frames[3].style.height = `${offset.h2 - offset.ch2}px`
  }

  container.value.style.width = offset.w
  container.value.style.height = offset.h
}

const adjustSlider = (pctX: number, pctY: number) => {
  const offset = calcOffset(pctX, pctY)
  adjustContainer(offset)
}

const handleMove = (e: MouseEvent) => {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  sliderPctX.value = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  if (processedImages.value.length > 2) {
    sliderPctY.value = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
  }
  adjustSlider(sliderPctX.value, sliderPctY.value)
}

const onImageLoad = () => {
  imagesLoaded.value++
  if (imagesLoaded.value === processedImages.value.length) {
    nextTick(() => {
      if (processedImages.value[0]?.el) {
        const img = processedImages.value[0].el
        container.value!.style.width = `${img.naturalWidth}px`
        container.value!.style.height = `${img.naturalHeight}px`
      }
      adjustSlider(sliderPctX.value, sliderPctY.value)
    })
  }
}

const processSlotImages = () => {
  if (slots.default) {
    const slotContent = slots.default()
    processedImages.value = slotContent
      .filter((node) => node.type === 'img')
      .map((node) => ({
        src: node.props?.src || '',
        alt: node.props?.alt || '',
        el: null as unknown as HTMLImageElement // Will be set after mount
      }))
  }
}

onMounted(() => {
  if (container.value) {
    container.value.addEventListener('mousemove', handleMove)
    window.addEventListener('resize', () => adjustSlider(sliderPctX.value, sliderPctY.value))

    // Set image elements after mount
    const imgElements = container.value.querySelectorAll('img')
    processedImages.value.forEach((img, index) => {
      img.el = imgElements[index] as HTMLImageElement
      img.el.addEventListener('load', onImageLoad)
    })
  }
})

watch(
  () => slots.default?.(),
  () => {
    processSlotImages()
    nextTick(() => adjustSlider(sliderPctX.value, sliderPctY.value))
  },
  { immediate: true }
)
</script>

<style scoped>
.twentytwenty-container {
  position: relative;
  overflow: hidden;
}
/* .twentytwenty-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */

.twentytwenty-handle {
  position: relative;
  cursor: ew-resize;
}
</style>
