
const BASE_URL = process.env.BASE_URL || "http://localhost:8080/";
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/";
const SERVER_STORAGE_URL = process.env.SERVER_STORAGE_URL || "http://localhost:8010/storage/";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001/";



export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseUrl: BASE_URL,
            apiBaseUrl: API_BASE_URL,
            serverStorageUrl: SERVER_STORAGE_URL,
            backendUrl: BACKEND_URL,
            frontendUrl: FRONTEND_URL,
        }
    },
    ssr: false,
    fetch: {
        baseUrl: API_BASE_URL,
    },
    modules: [
        [
            '@pinia/nuxt',
            '@vee-validate/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            },
        ],
    ],
    app: {
        head: {
            "meta": [
                {
                    "name": "viewport",
                    "content": "width=device-width, initial-scale=1"
                },
                {
                    "charset": "utf-8"
                }
            ],
            script: [
                { src: '/plugins/jquery/jquery.min.js' },
                { src: '/plugins/bootstrap/js/bootstrap.bundle.min.js' },
                { src: '/dist/js/adminlte.min.js'   }
            ],

            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.png' },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href:"https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback",
                },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href:"style.css",
                },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href:"plugins/fontawesome-free/css/all.min.css",
                },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href:"plugins/icheck-bootstrap/icheck-bootstrap.min.css",
                },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href:"dist/css/adminlte.min.css",
                },

            ],
        }
    },

})
