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
    ]
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  }
})
