require('dotenv').config()
const path = require('path')

module.exports = shipit => {
  require('shipit-deploy')(shipit)
  require('shipit-pm2')(shipit)
  require('shipit-slack')(shipit)

  shipit.config.copy = false

  shipit.initConfig({
    default: {
      repositoryUrl: process.env.GIT_REPO,
      keepReleases: 5,
      slack: {
        webhookUrl: process.env.SLACK_WEBHOOK,
        message: 'TK bot deployed',
        triggerEvent: 'deployed'
      }
    },
    production: {
      deployTo: '/srv/bot',
      servers: `${process.env.SSH_USER}@${process.env.SERVER}`,
      branch: 'main',
      pm2: {
        json: '/srv/bot/current/deploy/pm2/production.json'
      }
    }
  })

  shipit.on('updated', function () {
    console.log('Build project...')
    shipit.start('app:build')
  })

  shipit.blTask('app:build', async () => {
    const releaseDir = path.join(shipit.releasesPath, shipit.releaseDirname)
    const env = shipit.options.environment

    if (env === 'production') {
      await shipit.remote(`cd ${releaseDir} && cp /srv/bot/env/.env ./.env`)
    }

    await shipit.remote(`cd ${releaseDir} && yarn install --ignore-engines`)
  })
}
