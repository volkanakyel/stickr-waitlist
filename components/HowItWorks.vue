<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Step {
  title: string
  description: string
  icon: string
  reversed?: boolean
}

interface Props {
  title: string
  subtitle: string
  steps: Step[]
}

defineProps<Props>()

const animatedSteps = ref(new Set<number>())
const stepRefs = ref<HTMLDivElement[]>([])
const containerRef = ref<HTMLDivElement | null>(null)
const lineProgress = ref(0)

let observer: IntersectionObserver | null = null

const handleScroll = () => {
  if (!containerRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight

  // Calculate how much of the container is scrolled through
  const containerTop = containerRect.top
  const containerHeight = containerRect.height

  // Start growing when container enters viewport, complete when it exits
  const scrollStart = viewportHeight * 0.7
  const scrollEnd = -containerHeight + viewportHeight * 0.3

  if (containerTop > scrollStart) {
    lineProgress.value = 0
  } else if (containerTop < scrollEnd) {
    lineProgress.value = 100
  } else {
    const totalScrollDistance = scrollStart - scrollEnd
    const currentProgress = scrollStart - containerTop
    lineProgress.value = (currentProgress / totalScrollDistance) * 100
  }
}

onMounted(() => {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stepIndex = stepRefs.value.indexOf(entry.target as HTMLDivElement)
        if (stepIndex !== -1 && !animatedSteps.value.has(stepIndex)) {
          animatedSteps.value = new Set([...animatedSteps.value, stepIndex])
        }
      }
    })
  }, observerOptions)

  stepRefs.value.forEach((ref) => {
    if (ref) observer?.observe(ref)
  })

  // Add scroll listener for line animation
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', handleScroll)
})

const formatStepNumber = (index: number) => {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <section class="py-20 md:py-32 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="text-center mb-20 space-y-4">
        <h2 class="text-4xl md:text-5xl font-heading font-bold">{{ title }}</h2>
        <p class="text-lg text-muted-foreground max-w-lg mx-auto">
          {{ subtitle }}
        </p>
      </div>
      <div ref="containerRef" class="relative">
        <!-- Background track line with soft edges -->
        <div
          class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2"
          style="background: linear-gradient(to bottom, transparent 0%, rgb(var(--border) / 0.3) 5%, rgb(var(--border) / 0.3) 95%, transparent 100%)"
        />
        <!-- Animated progress line -->
        <div
          class="hidden md:block absolute left-1/2 top-0 w-0.5 transform -translate-x-1/2 transition-all duration-500 ease-out"
          :style="{
            height: `${lineProgress}%`,
            background: 'linear-gradient(to bottom, transparent 0%, rgb(var(--foreground)) 8%, rgb(var(--muted-foreground) / 0.6) 92%, transparent 100%)'
          }"
        >
          <!-- Subtle tip indicator -->
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-foreground/70 blur-[1px] transition-opacity duration-300"
            :class="lineProgress > 0 && lineProgress < 100 ? 'opacity-100' : 'opacity-0'"
          />
        </div>
        <div class="space-y-20 md:space-y-28">
          <div
            v-for="(step, index) in steps"
            :key="step.title"
            :ref="(el) => stepRefs[index] = el as HTMLDivElement"
            :class="[
              'grid grid-cols-1 md:grid-cols-2 gap-20 items-center transition-all duration-700',
              animatedSteps.has(index) ? 'scroll-stagger' : 'opacity-0'
            ]"
            :style="`animation-delay: ${index * 100}ms`"
          >
            <!-- Content -->
            <div :class="['space-y-6', step.reversed ? 'order-1 md:order-1' : '']">
              <div class="flex items-center justify-between">
                <h3 class="text-3xl md:text-4xl font-heading font-bold">{{ step.title }}</h3>
                <Icon :name="step.icon" class="w-7 h-7 text-primary flex-shrink-0" />
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-heading font-semibold text-primary uppercase tracking-wider">
                  Step {{ formatStepNumber(index) }}
                </span>
                <div class="h-px flex-1 bg-border" />
              </div>
              <p class="text-muted-foreground text-base leading-relaxed max-w-sm">
                {{ step.description }}
              </p>
            </div>
            <!-- Placeholder Image -->
            <div
              :class="[
                'hidden md:block h-80 bg-gradient-to-br from-primary/8 to-primary/12 rounded-sm dither-dark border border-border',
                step.reversed ? 'order-2' : ''
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
