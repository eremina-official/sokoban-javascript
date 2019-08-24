/* sokoban-javascript */

/* 
  babel.config.js file is added so that Jest could transform 
  and run js files which use es6 import/export statements, 
  since Jest does not support es6 modules (as for 04.2019). 
  By default, if Jest sees a Babel config, it will use that 
  to transform js files, ignoring "node_modules".
*/
module.exports = {
  presets: [ '@babel/preset-env' ]
};