import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'




// https://vitejs.dev/config/
export default defineConfig({
  //add bittorrent-dht to the list of polyfills
  resolve: {
    alias: {
      'bittorrent-dht': 'bittorrent-dht'
    }
  },
  plugins: [react(), nodePolyfills()],
})
