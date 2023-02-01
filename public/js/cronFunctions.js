const cron = require('node-cron');

const everyMin = cron.schedule('*/5 * * * * *', function() {
    console.log('running a task every 5 seconds');
  }, {
    scheduled: false
  });

  

  module.exports = everyMin;