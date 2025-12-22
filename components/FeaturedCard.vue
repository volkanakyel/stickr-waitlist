<script setup lang="ts">
interface Props {
  image: string
  alt: string
  brand?: string
  category: string
  name: string
  price: string
}

withDefaults(defineProps<Props>(), {
  brand: 'Stickr'
})
</script>

<template>
  <div class="device-card relative bg-card rounded-xl overflow-hidden group border border-border">
    <!-- Image Area -->
    <div class="aspect-[4/5] bg-white relative overflow-hidden flex items-center justify-center px-12 py-4">
      <!-- Arrow Icon -->
      <div class="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10">
        <svg class="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
      <!-- Fixed size image container -->
      <div class="w-full h-full max-w-[280px] max-h-[280px] flex items-center justify-center">
        <img
          :src="image"
          :alt="alt"
          class="max-w-full max-h-full object-contain transform group-hover:-translate-y-2 transition-transform duration-700 ease-out"
        />
      </div>
    </div>
    <!-- Text Area -->
    <div class="px-6 py-4">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-muted-foreground mb-1">{{ brand }} · {{ category }}</p>
          <p class="text-lg font-heading font-semibold text-foreground">{{ name }}</p>
        </div>
        <p class="text-lg font-heading font-bold text-foreground">{{ price }}</p>
      </div>
    </div>
  </div>
</template>
