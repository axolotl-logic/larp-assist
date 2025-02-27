/* eslint-disable */
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * 1. DO NOT edit this file directly as it won't do anything.
 * 2. EDIT the original quasar.config file INSTEAD.
 * 3. DO NOT git commit this file. It should be ignored.
 *
 * This file is still here because there was an error in
 * the original quasar.config file and this allows you to
 * investigate the Node.js stack error.
 *
 * After you fix the original file, this file will be
 * deleted automatically.
 **/

var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// quasar.config.js
var require_quasar_config = __commonJS({
  "quasar.config.js"(exports, module) {
    var { configure } = __require("quasar/wrappers");
    module.exports = configure(function() {
      return {
        eslint: {
          // fix: true,
          // include = [],
          // exclude = [],
          // rawOptions = {},
          warnings: true,
          errors: true
        },
        // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
        // preFetch: true,
        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli-vite/boot-files
        boot: ["axios", "firebase", "register-vuelidate-rules"],
        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
        css: ["app.scss"],
        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
          // 'ionicons-v4',
          // 'mdi-v5',
          // 'fontawesome-v6',
          // 'eva-icons',
          // 'themify',
          // 'line-awesome',
          // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
          "roboto-font",
          // optional, you are not bound to it
          "material-icons"
          // optional, you are not bound to it
        ],
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
        build: {
          sourcemap: true,
          target: {
            browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
            node: "node16"
          },
          vueRouterMode: "history"
          // available values: 'hash', 'history'
          // vueRouterBase,
          // vueDevtools,
          // vueOptionsAPI: false,
          // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup
          // publicPath: '/',
          // analyze: true,
          // env: {},
          // rawDefine: {}
          // ignorePublicFolder: true,
          // minify: false,
          // polyfillModulePreload: true,
          // distDir
          // extendViteConf (viteConf) {},
          // viteVuePluginOptions: {},
          // vitePlugins: [
          //   [ 'package-name', { ..options.. } ]
          // ]
        },
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
        devServer: {
          // https: true
          open: true
          // opens browser window automatically
        },
        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
        framework: {
          config: {},
          // iconSet: 'material-icons', // Quasar icon set
          // lang: 'en-US', // Quasar language pack
          // For special cases outside of where the auto-import strategy can have an impact
          // (like functional components as one of the examples),
          // you can manually specify Quasar components/directives to be available everywhere:
          //
          // components: [],
          // directives: [],
          // Quasar plugins
          plugins: ["Notify", "Dialog"]
        },
        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],
        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
        // sourceFiles: {
        //   rootComponent: 'src/App.vue',
        //   router: 'src/router/index',
        //   store: 'src/store/index',
        //   registerServiceWorker: 'src-pwa/register-service-worker',
        //   serviceWorker: 'src-pwa/custom-service-worker',
        //   pwaManifestFile: 'src-pwa/manifest.json',
        //   electronMain: 'src-electron/electron-main',
        //   electronPreload: 'src-electron/electron-preload'
        // },
        // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
        ssr: {
          // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
          // will mess up SSR
          // extendSSRWebserverConf (esbuildConf) {},
          // extendPackageJson (json) {},
          pwa: false,
          // manualStoreHydration: true,
          // manualPostHydrationTrigger: true,
          prodPort: 3e3,
          // The default port that the production server should use
          // (gets superseded if process.env.PORT is specified at runtime)
          middlewares: [
            "render"
            // keep this as last one
          ]
        },
        // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
        pwa: {
          workboxMode: "generateSW",
          // or 'injectManifest'
          injectPwaMetaTags: true,
          swFilename: "sw.js",
          manifestFilename: "manifest.json",
          useCredentialsForManifestTag: false
          // useFilenameHashes: true,
          // extendGenerateSWOptions (cfg) {}
          // extendInjectManifestOptions (cfg) {},
          // extendManifestJson (json) {}
          // extendPWACustomSWConf (esbuildConf) {}
        },
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
        cordova: {
          // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
        },
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
        capacitor: {
          hideSplashscreen: true
        },
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
        electron: {
          // extendElectronMainConf (esbuildConf)
          // extendElectronPreloadConf (esbuildConf)
          inspectPort: 5858,
          bundler: "packager",
          // 'packager' or 'builder'
          packager: {
            // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
            // OS X / Mac App Store
            // appBundleId: '',
            // appCategoryType: '',
            // osxSign: '',
            // protocol: 'myapp://path',
            // Windows only
            // win32metadata: { ... }
          },
          builder: {
            // https://www.electron.build/configuration/configuration
            appId: "larp-assist"
          }
        },
        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
        bex: {
          contentScripts: ["my-content-script"]
          // extendBexScriptsConf (esbuildConf) {}
          // extendBexManifestJson (json) {}
        }
      };
    });
  }
});
export default require_quasar_config();
