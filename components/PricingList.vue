<script setup lang="ts">
import { ref } from 'vue'

interface Plan {
  id: string
  name: string
  description: string
  price: string
  priceLabel: string
  buttonText: string
  popular?: boolean
}

interface Props {
  title: string
  subtitle: string
  plans: Plan[]
  defaultPlan?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultPlan: ''
})

const selectedPlan = ref(props.defaultPlan || props.plans[0]?.id || '')

const selectPlan = (planId: string) => {
  selectedPlan.value = planId
}
</script>

<template>
  <section class="py-20 md:py-32">
    <div class="max-w-7xl mx-auto px-4 md:px-6">
      <div class="text-center mb-16 space-y-3">
        <h2 class="text-4xl md:text-5xl font-heading font-bold">{{ title }}</h2>
        <p class="text-lg text-muted-foreground">{{ subtitle }}</p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-start gap-8">
          <div
            v-for="(plan, index) in plans"
            :key="plan.id"
            class="pricing-folder flex-1 group"
            @click="selectPlan(plan.id)"
          >
            <!-- Folder wrapper using grid for layering -->
            <div class="folder-wrapper">
              <!-- SVG Background Layer -->
              <svg
                class="folder-svg"
                viewBox="0 0 340 340"
                preserveAspectRatio="none"
              >
                <!-- Back layer (tab with straighter notch) -->
                <path
                  class="folder-back-path"
                  :class="[
                    selectedPlan === plan.id
                      ? 'fill-foreground-dark'
                      : 'fill-muted-dark'
                  ]"
                  d="
                    M 12 340
                    L 12 14
                    Q 12 2 26 2
                    L 125 2
                    Q 133 2 136 6
                    L 152 22
                    Q 155 26 165 26
                    L 328 26
                    L 328 340
                    Z
                  "
                />
                <!-- Front layer (main card with rounded corners) -->
                <rect
                  class="folder-front-path"
                  :class="[
                    selectedPlan === plan.id
                      ? 'fill-foreground'
                      : 'fill-card'
                  ]"
                  x="0"
                  y="18"
                  width="340"
                  height="322"
                  rx="12"
                />
                <!-- Front card border (only for unselected) -->
                <rect
                  v-if="selectedPlan !== plan.id"
                  class="folder-border"
                  x="1"
                  y="19"
                  width="338"
                  height="320"
                  rx="11"
                  fill="none"
                  stroke="rgb(var(--border))"
                  stroke-width="2"
                  stroke-dasharray="6 4"
                />
              </svg>

              <!-- Badge in folder tab (needs absolute for precise tab positioning) -->
              <div
                class="folder-badge"
                :class="[
                  selectedPlan === plan.id
                    ? 'text-background/70'
                    : 'text-muted-foreground'
                ]"
              >
                {{ plan.popular ? '★ Popular' : `Plan ${index + 1}` }}
              </div>

              <!-- Card Content Layer - uses grid overlay -->
              <div class="folder-content">
                <!-- Spacer for tab area -->
                <div class="tab-spacer" />

                <!-- Main content area -->
                <div class="content-inner">
                  <!-- Selection Indicator -->
                  <div class="flex items-center mb-6">
                    <div
                      class="selection-indicator"
                      :class="[
                        selectedPlan === plan.id
                          ? 'bg-background scale-100'
                          : 'bg-border scale-75 opacity-60'
                      ]"
                    >
                      <div
                        class="check-mark"
                        :class="selectedPlan === plan.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Plan Info -->
                  <div class="space-y-1 mb-6">
                    <h3
                      class="text-xl font-heading font-bold"
                      :class="selectedPlan === plan.id ? 'text-background' : 'text-foreground'"
                    >
                      {{ plan.name }}
                    </h3>
                    <p
                      :class="[
                        'text-sm',
                        selectedPlan === plan.id ? 'text-background/70' : 'text-muted-foreground'
                      ]"
                    >
                      {{ plan.description }}
                    </p>
                  </div>

                  <!-- Price -->
                  <div class="mb-2">
                    <div class="flex items-baseline gap-1">
                      <span
                        class="text-5xl font-heading font-bold price-text"
                        :class="selectedPlan === plan.id ? 'text-background' : 'text-foreground'"
                      >
                        {{ plan.price }}
                      </span>
                    </div>
                    <p
                      :class="[
                        'text-sm mt-1',
                        selectedPlan === plan.id ? 'text-background/60' : 'text-muted-foreground'
                      ]"
                    >
                      {{ plan.priceLabel }}
                    </p>
                  </div>

                  <!-- CTA Button - pushed to bottom -->
                  <button
                    :class="[
                      'w-full py-3.5 mt-8 rounded-lg font-heading font-semibold transition-all duration-300',
                      selectedPlan === plan.id
                        ? 'bg-background text-foreground hover:opacity-90 shadow-sm'
                        : 'border-2 border-dashed border-border hover:border-foreground hover:bg-muted/50'
                    ]"
                  >
                    {{ plan.buttonText }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-folder {
  cursor: pointer;
}

/* Grid-based wrapper for layering SVG and content */
.folder-wrapper {
  display: grid;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.pricing-folder:hover .folder-wrapper {
  transform: translateY(-6px);
}

/* Both SVG and content occupy same grid cell */
.folder-svg,
.folder-content {
  grid-area: 1 / 1;
}

/* SVG background */
.folder-svg {
  width: 100%;
  height: auto;
  display: block;
}

/* SVG path transitions */
.folder-back-path,
.folder-front-path {
  transition: fill 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Badge in tab area - needs absolute for precise positioning */
.folder-badge {
  position: absolute;
  top: 0.3%;
  left: 3.5%;
  width: 34%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
  z-index: 10;
}

.pricing-folder:hover .folder-badge {
  letter-spacing: 0.08em;
}

/* Content layer - uses flexbox for natural flow */
.folder-content {
  display: flex;
  flex-direction: column;
  z-index: 10;
  pointer-events: none;
}

/* Spacer to account for tab height (roughly 7.6% of SVG height) */
.tab-spacer {
  flex-shrink: 0;
  height: 7.5%;
}

/* Inner content with padding */
.content-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.75rem 1.75rem;
  pointer-events: auto;
}

/* Selection indicator circle */
.selection-indicator {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.check-mark {
  color: rgb(var(--foreground));
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Price scale on hover */
.price-text {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.pricing-folder:hover .price-text {
  transform: scale(1.02);
}

/* Tailwind fill classes for SVG */
.fill-foreground {
  fill: rgb(var(--foreground));
}

.fill-foreground-dark {
  fill: rgb(var(--foreground));
  filter: brightness(0.82);
}

.fill-muted {
  fill: rgb(var(--muted));
}

.fill-muted-dark {
  fill: rgb(var(--muted));
  filter: brightness(0.85);
}

.fill-card {
  fill: rgb(var(--card));
}

/* Subtle pulse on selection */
@keyframes selectPulse {
  0% {
    filter: drop-shadow(0 0 0 rgba(var(--foreground), 0.2));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(var(--foreground), 0.1));
  }
  100% {
    filter: drop-shadow(0 0 0 rgba(var(--foreground), 0));
  }
}

.pricing-folder:active .folder-svg {
  animation: selectPulse 0.5s ease-out;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .content-inner {
    padding: 1.25rem 1.5rem 1.5rem;
  }

  .folder-badge {
    font-size: 9px;
    width: 36%;
    height: 5%;
  }
}
</style>
