// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  supabase: {
    url: process.env.VITE_SUPABASE_URL,
    key: process.env.VITE_SUPABASE_KEY,
  },
});





