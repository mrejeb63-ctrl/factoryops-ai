import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.factoryopsai.app',
  appName: 'FactoryOps AI',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: { contentInset: 'automatic' },
};

export default config;
