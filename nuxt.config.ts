// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt'],
  css: ['~/assets/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'https://103.110.87.30:4000',
    },
  },
})