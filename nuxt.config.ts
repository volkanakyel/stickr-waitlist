export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-25',

  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon", "@nuxt/fonts"],

  fonts: {
    families: [
      { name: 'Geist', provider: 'google' },
      { name: 'Geist Mono', provider: 'google' },
      { name: 'Rethink Sans', provider: 'google' },
    ],
  },

  icon: {
    serverBundle: 'remote',
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
  },

  app: {
    head: {
      title: "Stickr - Create Custom Stickers for Mac, Tablet & PC",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Design and order custom stickers for your devices. Upload your logo, customize it, and get perfectly sized stickers delivered.",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/icon.svg" }],
    },
  },
})