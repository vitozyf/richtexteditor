const path = require('path');

function getLocaleCode(name, code) {
  return `${code.replace('export default', 'const message =')}
if (window && window.rt_editor) {
  window.rt_editor.$messages = window.rt_editor.$messages || {};
  window.rt_editor.$messages['${name}'] = message;
}
export default message;
`;
}

module.exports = require('babel-loader').custom(babel => {
  return {
    result(result, { options }) {
      const lang = path.basename(options.filename, '.ts');
      result.code = getLocaleCode(lang, result.code);
      return result;
    }
  };
});
