<script setup lang="ts">
import { ref, computed } from 'vue'

const scrollToWaitlist = () => {
  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
}

const selectedCategory = ref('All')

// Hero content
const navLinks = [
  { label: 'Docs', href: '#' },
  { label: 'Pricing', href: '#' }
]

const heroHighlights = [
  { icon: 'lucide:zap', text: 'Fast shipping' },
  { icon: 'lucide:eye', text: 'Real-time preview' },
  { icon: 'lucide:layout-grid', text: 'Unlimited revisions' }
]

// Page content data
const howItWorksSteps = [
  {
    title: 'Upload Your Logo',
    description: 'Upload your logo or create text-based stickers directly in our builder. We support PNG, SVG, and JPG formats. No design skills needed.',
    icon: 'lucide:upload',
    reversed: false
  },
  {
    title: 'Customize & Preview',
    description: 'Adjust size, colors, and placement with real-time preview on Mac, iPad, or PC mockups. See exactly how your sticker will look before ordering.',
    icon: 'lucide:settings',
    reversed: true
  },
  {
    title: 'Order & Receive',
    description: "Select your size and quantity, then we'll produce and ship premium-quality stickers to your door within 48 hours. Satisfaction guaranteed.",
    icon: 'lucide:package-check',
    reversed: false
  }
]

const features = [
  {
    icon: 'lucide:eye',
    title: 'Real-Time Preview',
    description: 'Your stickers on Mac and tablet, as mockups instantly'
  },
  {
    icon: 'lucide:layout-grid',
    title: 'Multiple Sizes',
    description: 'Various sizes with automatic proportional scaling'
  },
  {
    icon: 'lucide:zap',
    title: 'Fast Processing',
    description: 'Get your stickers printed and shipped within 48 hours'
  },
  {
    icon: 'lucide:users',
    title: 'Team Plans',
    description: 'Bulk ordering for designers, startups, and agencies'
  },
  {
    icon: 'lucide:mail',
    title: 'Custom Text',
    description: 'Add personalized text to any sticker design'
  },
  {
    icon: 'lucide:settings',
    title: 'Full Customization',
    description: 'Adjust colors, placement, and effects to perfection'
  }
]

const pricingPlans = [
  {
    id: 'per-sticker',
    name: 'Individual',
    description: 'Perfect for personal use',
    price: '$3',
    priceLabel: 'per sticker',
    buttonText: 'Get Started',
    popular: false
  },
  {
    id: 'team',
    name: 'Team Orders',
    description: 'For startups & agencies',
    price: 'Custom',
    priceLabel: 'volume pricing',
    buttonText: 'Contact Sales',
    popular: true
  }
]

const featuredDevices = [
  {
    image: '/devices/iPad.png',
    alt: 'iPad with custom sticker',
    category: 'iPad',
    name: 'iPad',
    price: '$10'
  },
  {
    image: '/devices/iPadAir.png',
    alt: 'iPad Air with custom sticker',
    category: 'iPad',
    name: 'iPad Air',
    price: '$10'
  },
  {
    image: '/devices/iPadPro.png',
    alt: 'iPad Pro with custom sticker',
    category: 'iPad',
    name: 'iPad Pro',
    price: '$12'
  },
  {
    image: '/devices/MacBookPro.png',
    alt: 'MacBook Pro with custom sticker',
    category: 'MacBook',
    name: 'MacBook Pro',
    price: '$14'
  },
  {
    image: '/devices/MacbookAir.png',
    alt: 'MacBook Air with custom sticker',
    category: 'MacBook Air',
    name: 'MacBook Air',
    price: '$12'
  }
]

const deviceCategories = ['All', 'iPad', 'MacBook', 'MacBook Air']

const filteredDevices = computed(() => {
  if (selectedCategory.value === 'All') {
    return featuredDevices
  }
  return featuredDevices.filter(device => device.category === selectedCategory.value)
})
</script>

<template>
  <main class="min-h-screen bg-background text-foreground">
    <!-- Hero -->
    <HeroSection
      logo="/logo.svg"
      brand-name="Stickr"
      :nav-links="navLinks"
      tagline="Premium Device Stickers"
      title="Design. Customize. Order."
      description="Premium custom stickers for your devices. Design, preview, and ship in 48 hours."
      primary-button-text="Start Creating Free"
      secondary-button-text="View Gallery"
      :highlights="heroHighlights"
      @primary-click="scrollToWaitlist"
    />

    <!-- How it works -->
    <HowItWorks
      title="How it Works"
      subtitle="Three simple steps to get your perfect stickers delivered to your door"
      :steps="howItWorksSteps"
    />

    <!-- Features -->
    <FeatureShowcase
      title="Why Choose Stickr"
      subtitle="Professional-grade sticker creation made accessible to everyone"
      :features="features"
    />

    <!-- Pricing -->
    <PricingList
      title="Transparent Pricing"
      subtitle="No hidden fees. No surprises."
      :plans="pricingPlans"
      default-plan="per-sticker"
    />

    <!-- Featured designs -->
    <section class="py-20 md:py-32 bg-muted/30">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <h2 class="text-4xl md:text-5xl font-heading font-bold text-center mb-8">Featured Designs</h2>

        <!-- Category Filter -->
        <div class="flex items-center justify-center gap-2 mb-16">
          <button
            v-for="category in deviceCategories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2.5 text-sm font-heading font-medium rounded-full filter-btn',
              selectedCategory === category
                ? 'bg-foreground text-background shadow-lg'
                : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Device Grid with Transitions -->
        <Transition name="grid-fade" mode="out-in">
          <div
            :key="selectedCategory"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div
              v-for="(device, index) in filteredDevices"
              :key="device.name"
              class="device-card"
              :style="{ animationDelay: `${index * 80}ms` }"
            >
              <FeaturedCard
                :image="device.image"
                :alt="device.alt"
                :category="device.category"
                :name="device.name"
                :price="device.price"
              />
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Waitlist CTA -->
    <WaitlistCta
      title="Get Early Access"
      subtitle="Be the first to know when we launch. Join our waitlist for exclusive early access and launch discounts."
    />

    <!-- Footer -->
    <AppFooter />
  </main>
</template>
