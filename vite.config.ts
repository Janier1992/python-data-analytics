import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dependencias pesadas en chunks propios: se cachean aparte del código de la app
// y solo se descargan al abrir una lección.
const GRUPOS_VENDOR: Record<string, string[]> = {
  'vendor-editor': ['@codemirror', '@lezer', '@uiw', 'codemirror', 'style-mod', 'w3c-keyname', 'crelt'],
  'vendor-markdown': [
    'react-markdown', 'remark', 'rehype', 'micromark', 'mdast', 'hast', 'unified', 'unist', 'vfile',
    'bail', 'trough', 'devlop', 'decode-named-character-reference', 'character-entities', 'property-information',
    'space-separated-tokens', 'comma-separated-tokens', 'trim-lines', 'ccount', 'markdown-table', 'is-plain-obj', 'html-url-attributes',
  ],
}

// Núcleo de React: lo necesita la app desde el inicio, por eso va en su propio chunk
// (si no, quedaría dentro de un chunk de lecciones y se descargaría de más).
const PAQUETES_REACT = ['react', 'react-dom', 'scheduler', 'react-router', 'react-router-dom', '@remix-run/router', 'zustand', 'use-sync-external-store']

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const paquete = id.split('node_modules/').pop()!.split('/')[0]
          const nombre = paquete.startsWith('@') ? id.split('node_modules/').pop()!.split('/').slice(0, 2).join('/') : paquete
          for (const [chunk, paquetes] of Object.entries(GRUPOS_VENDOR)) {
            if (paquetes.some((p) => nombre === p || nombre.startsWith(`${p}/`) || nombre.startsWith(`${p}-`))) return chunk
          }
          if (PAQUETES_REACT.includes(nombre)) return 'vendor-react'
          return undefined
        },
      },
    },
  },
})
