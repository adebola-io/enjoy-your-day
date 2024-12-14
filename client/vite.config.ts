/// <reference types="node" />

import { defineConfig } from 'vite';
import path from 'node:path';
import { VitePWA } from 'vite-plugin-pwa';
import { hmrPlugin } from '@adbl/unfinished/render';

export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './source'),
    },
  },
  plugins: [
    hmrPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Enjoy Your Day',
        short_name: 'EYD',
        start_url: '/',
        theme_color: '#1b1b3a',
        description:
          'Enjoy Your Day is a simple progressive web application that provides and generates itineraries for your day to make it more enjoyable.',
        categories: ['productivity', 'utilities', 'social'],
        background_color: '#1b1b3a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/windows11/SmallTile.scale-100.png',
            sizes: '71x71',
          },
          {
            src: 'icons/windows11/SmallTile.scale-125.png',
            sizes: '89x89',
          },
          {
            src: 'icons/windows11/SmallTile.scale-150.png',
            sizes: '107x107',
          },
          {
            src: 'icons/windows11/SmallTile.scale-200.png',
            sizes: '142x142',
          },
          {
            src: 'icons/windows11/SmallTile.scale-400.png',
            sizes: '284x284',
          },
          {
            src: 'icons/windows11/Square150x150Logo.scale-100.png',
            sizes: '150x150',
          },
          {
            src: 'icons/windows11/Square150x150Logo.scale-125.png',
            sizes: '188x188',
          },
          {
            src: 'icons/windows11/Square150x150Logo.scale-150.png',
            sizes: '225x225',
          },
          {
            src: 'icons/windows11/Square150x150Logo.scale-200.png',
            sizes: '300x300',
          },
          {
            src: 'icons/windows11/Square150x150Logo.scale-400.png',
            sizes: '600x600',
          },
          {
            src: 'icons/windows11/Wide310x150Logo.scale-100.png',
            sizes: '310x150',
          },
          {
            src: 'icons/windows11/Wide310x150Logo.scale-125.png',
            sizes: '388x188',
          },
          {
            src: 'icons/windows11/Wide310x150Logo.scale-150.png',
            sizes: '465x225',
          },
          {
            src: 'icons/windows11/Wide310x150Logo.scale-200.png',
            sizes: '620x300',
          },
          {
            src: 'icons/windows11/Wide310x150Logo.scale-400.png',
            sizes: '1240x600',
          },
          {
            src: 'icons/windows11/LargeTile.scale-100.png',
            sizes: '310x310',
          },
          {
            src: 'icons/windows11/LargeTile.scale-125.png',
            sizes: '388x388',
          },
          {
            src: 'icons/windows11/LargeTile.scale-150.png',
            sizes: '465x465',
          },
          {
            src: 'icons/windows11/LargeTile.scale-200.png',
            sizes: '620x620',
          },
          {
            src: 'icons/windows11/LargeTile.scale-400.png',
            sizes: '1240x1240',
          },
          {
            src: 'icons/windows11/Square44x44Logo.scale-100.png',
            sizes: '44x44',
          },
          {
            src: 'icons/windows11/Square44x44Logo.scale-125.png',
            sizes: '55x55',
          },
          {
            src: 'icons/windows11/Square44x44Logo.scale-150.png',
            sizes: '66x66',
          },
          {
            src: 'icons/windows11/Square44x44Logo.scale-200.png',
            sizes: '88x88',
          },
          {
            src: 'icons/windows11/Square44x44Logo.scale-400.png',
            sizes: '176x176',
          },
          {
            src: 'icons/windows11/StoreLogo.scale-100.png',
            sizes: '50x50',
          },
          {
            src: 'icons/windows11/StoreLogo.scale-125.png',
            sizes: '63x63',
          },
          {
            src: 'icons/windows11/StoreLogo.scale-150.png',
            sizes: '75x75',
          },
          {
            src: 'icons/windows11/StoreLogo.scale-200.png',
            sizes: '100x100',
          },
          {
            src: 'icons/windows11/StoreLogo.scale-400.png',
            sizes: '200x200',
          },
          {
            src: 'icons/windows11/SplashScreen.scale-100.png',
            sizes: '620x300',
          },
          {
            src: 'icons/windows11/SplashScreen.scale-125.png',
            sizes: '775x375',
          },
          {
            src: 'icons/windows11/SplashScreen.scale-150.png',
            sizes: '930x450',
          },
          {
            src: 'icons/windows11/SplashScreen.scale-200.png',
            sizes: '1240x600',
          },
          {
            src: 'icons/windows11/SplashScreen.scale-400.png',
            sizes: '2480x1200',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-20.png',
            sizes: '20x20',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-30.png',
            sizes: '30x30',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-32.png',
            sizes: '32x32',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-36.png',
            sizes: '36x36',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-40.png',
            sizes: '40x40',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-44.png',
            sizes: '44x44',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-60.png',
            sizes: '60x60',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-64.png',
            sizes: '64x64',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-72.png',
            sizes: '72x72',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-80.png',
            sizes: '80x80',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-96.png',
            sizes: '96x96',
          },
          {
            src: 'icons/windows11/Square44x44Logo.targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-20.png',
            sizes: '20x20',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-30.png',
            sizes: '30x30',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-32.png',
            sizes: '32x32',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-36.png',
            sizes: '36x36',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-40.png',
            sizes: '40x40',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-44.png',
            sizes: '44x44',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-60.png',
            sizes: '60x60',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-64.png',
            sizes: '64x64',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-72.png',
            sizes: '72x72',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-80.png',
            sizes: '80x80',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-96.png',
            sizes: '96x96',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png',
            sizes: '16x16',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png',
            sizes: '20x20',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png',
            sizes: '24x24',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png',
            sizes: '30x30',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png',
            sizes: '32x32',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png',
            sizes: '36x36',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png',
            sizes: '40x40',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png',
            sizes: '44x44',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png',
            sizes: '48x48',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png',
            sizes: '60x60',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png',
            sizes: '64x64',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png',
            sizes: '72x72',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png',
            sizes: '80x80',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png',
            sizes: '96x96',
          },
          {
            src: 'icons/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png',
            sizes: '256x256',
          },
          {
            src: 'icons/android/android-launchericon-512-512.png',
            sizes: '512x512',
          },
          {
            src: 'icons/android/android-launchericon-192-192.png',
            sizes: '192x192',
          },
          {
            src: 'icons/android/android-launchericon-144-144.png',
            sizes: '144x144',
          },
          {
            src: 'icons/android/android-launchericon-96-96.png',
            sizes: '96x96',
          },
          {
            src: 'icons/android/android-launchericon-72-72.png',
            sizes: '72x72',
          },
          {
            src: 'icons/android/android-launchericon-48-48.png',
            sizes: '48x48',
          },
          {
            src: 'icons/ios/16.png',
            sizes: '16x16',
          },
          {
            src: 'icons/ios/20.png',
            sizes: '20x20',
          },
          {
            src: 'icons/ios/29.png',
            sizes: '29x29',
          },
          {
            src: 'icons/ios/32.png',
            sizes: '32x32',
          },
          {
            src: 'icons/ios/40.png',
            sizes: '40x40',
          },
          {
            src: 'icons/ios/50.png',
            sizes: '50x50',
          },
          {
            src: 'icons/ios/57.png',
            sizes: '57x57',
          },
          {
            src: 'icons/ios/58.png',
            sizes: '58x58',
          },
          {
            src: 'icons/ios/60.png',
            sizes: '60x60',
          },
          {
            src: 'icons/ios/64.png',
            sizes: '64x64',
          },
          {
            src: 'icons/ios/72.png',
            sizes: '72x72',
          },
          {
            src: 'icons/ios/76.png',
            sizes: '76x76',
          },
          {
            src: 'icons/ios/80.png',
            sizes: '80x80',
          },
          {
            src: 'icons/ios/87.png',
            sizes: '87x87',
          },
          {
            src: 'icons/ios/100.png',
            sizes: '100x100',
          },
          {
            src: 'icons/ios/114.png',
            sizes: '114x114',
          },
          {
            src: 'icons/ios/120.png',
            sizes: '120x120',
          },
          {
            src: 'icons/ios/128.png',
            sizes: '128x128',
          },
          {
            src: 'icons/ios/144.png',
            sizes: '144x144',
          },
          {
            src: 'icons/ios/152.png',
            sizes: '152x152',
          },
          {
            src: 'icons/ios/167.png',
            sizes: '167x167',
          },
          {
            src: 'icons/ios/180.png',
            sizes: '180x180',
          },
          {
            src: 'icons/ios/192.png',
            sizes: '192x192',
          },
          {
            src: 'icons/ios/256.png',
            sizes: '256x256',
          },
          {
            src: 'icons/ios/512.png',
            sizes: '512x512',
          },
          {
            src: 'icons/ios/1024.png',
            sizes: '1024x1024',
          },
        ],
      },
    }),
  ],
});
