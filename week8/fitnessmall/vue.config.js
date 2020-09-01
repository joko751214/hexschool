module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      const [obj] = args;
      obj.title = 'FITNESSMALL';
      obj.meta = {
        keywords: '健身, 運動, 營養, 保健, 早餐, 美食, 低gi',
        description: '新鮮、豐富又營養的可口美食',
      };
      return args;
    });
  },
};
