module.exports = {
  apps : [{
    script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000', //running on port 3000
      // cwd: "./app/nextapp",
    watch: '.',
    env: {
      NODE_ENV: 'production',
  },}],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
