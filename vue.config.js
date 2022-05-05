const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: 'build/icon.png',
          artifactName: 'smart-system.${ext}',
          verifyUpdateCodeSignature: false,
          target: [
            {
              target: 'nsis',
              arch: ['ia32'],
            },
          ],
        },
        nsis: {
          oneClick: false,
          createDesktopShortcut: 'always',
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
})
