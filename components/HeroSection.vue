<script setup lang="ts">
interface NavLink {
  label: string
  href: string
}

interface Highlight {
  icon: string
  text: string
}

interface Props {
  logo: string
  brandName: string
  navLinks: NavLink[]
  tagline: string
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  highlights: Highlight[]
}

defineProps<Props>()

const emit = defineEmits<{
  primaryClick: []
  secondaryClick: []
}>()
</script>

<template>
  <header class="relative overflow-hidden min-h-screen dither">
    <!-- Navigation - Absolute positioned -->
    <nav class="absolute top-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-6 pt-8 w-full flex items-center justify-between z-10">
      <div class="flex items-center gap-1 text-lg font-heading font-semibold tracking-tight">
        <img :src="logo" :alt="`${brandName} logo`" class="w-10 h-10" />
        <span>{{ brandName }}</span>
      </div>
      <div class="flex items-center gap-2 md:gap-4">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ link.label }}
        </a>
      </div>
    </nav>

    <!-- Hero Content - Perfectly Centered -->
    <div class="min-h-screen flex items-center justify-center px-4 md:px-6">
      <div class="max-w-4xl text-center space-y-8 fade-in-up">
        <div class="space-y-4">
          <p class="text-xs font-semibold text-primary/70 uppercase tracking-widest">
            {{ tagline }}
          </p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tighter tracking-tight text-balance">
            {{ title }}
          </h1>
        </div>

        <p class="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {{ description }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
          <button
            @click="emit('primaryClick')"
            class="px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-sm hover:opacity-90 transition-opacity text-base"
          >
            {{ primaryButtonText }}
          </button>
          <button
            @click="emit('secondaryClick')"
            class="px-8 py-4 border border-border rounded-sm hover:bg-muted transition-colors font-heading font-semibold"
          >
            {{ secondaryButtonText }}
          </button>
        </div>

        <div class="pt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div
            v-for="highlight in highlights"
            :key="highlight.text"
            class="flex items-center gap-2"
          >
            <Icon :name="highlight.icon" class="w-4 h-4 text-primary" />
            <span>{{ highlight.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
