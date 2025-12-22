<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

interface Props {
  title: string
  subtitle: string
  features: Feature[]
}

defineProps<Props>()
</script>

<template>
  <section class="py-20 md:py-32 bg-secondary/20 dither">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="text-center mb-16 space-y-3">
        <h2 class="text-4xl md:text-5xl font-heading font-bold">{{ title }}</h2>
        <p class="text-lg text-muted-foreground max-w-lg mx-auto">
          {{ subtitle }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-card border border-border rounded-sm p-5 hover:shadow-md transition-shadow"
        >
          <Icon :name="feature.icon" class="w-5 h-5 text-primary mb-3" />
          <h3 class="font-heading font-semibold text-base mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
