// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "shadcn-nuxt",
    [
      "@nuxtjs/google-fonts", 
      {
        families: {
          Lato: [100, 300],
        }
      }
    ],
    '@pinia/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true
      }
    ]
  ],
  pinia: {
    storesDirs: ['./store/**']
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})
