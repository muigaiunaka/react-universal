/** 
 * Here we just check environment and choose what kind of source map we should use
 */
const isProduction = process.env.NODE_ENV === 'production';
const devtool = isProduction ? 'source-map' : 'inline-cheap-module-source-map';
module.exports = devtool;