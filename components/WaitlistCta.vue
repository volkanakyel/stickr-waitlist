<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  subtitle: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Enter your email',
  buttonText: 'Join Waitlist',
  successMessage: 'Thanks for joining! Check your email for confirmation.'
})

const email = ref('')
const submitted = ref(false)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (email.value) {
    submitted.value = true
    email.value = ''
    setTimeout(() => (submitted.value = false), 4000)
  }
}
</script>

<template>
  <section id="waitlist" class="relative overflow-hidden py-20 md:py-32 dither">
    <div class="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
      <h2 class="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">{{ title }}</h2>
      <p class="text-lg text-foreground/80 mb-10 max-w-xl mx-auto">
        {{ subtitle }}
      </p>
      <div v-if="submitted" class="bg-card border border-primary rounded-sm p-6 text-center max-w-md mx-auto">
        <p class="text-base font-heading font-semibold text-foreground">
          {{ successMessage }}
        </p>
      </div>
      <form v-else @submit="handleSubmit" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input
          v-model="email"
          type="email"
          :placeholder="placeholder"
          required
          class="flex-1 px-5 py-4 bg-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          class="px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {{ buttonText }}
        </button>
      </form>
    </div>
  </section>
</template>
