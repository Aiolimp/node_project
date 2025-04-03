import schedule from 'node-schedule';

// 每分钟的第30秒执行
const job1 = schedule.scheduleJob('30 * * * * *', function () {
  console.log('每分钟的第30秒执行:', new Date().toLocaleString());
});

// 每天的12点和18点执行
const job2 = schedule.scheduleJob('0 0 12,18 * * *', function () {
  console.log('每天的12点和18点执行:', new Date().toLocaleString());
});

// 每周一的10点执行
const job3 = schedule.scheduleJob('0 0 10 * * 1', function () {
  console.log('每周一的10点执行:', new Date().toLocaleString());
});

console.log('定时任务已启动...');