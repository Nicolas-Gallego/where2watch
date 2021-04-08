/*!
 * name: @jswork/next-toggle
 * description: Toggle array element.
 * homepage: https://github.com/afeiship/next-toggle
 * version: 1.0.0
 * date: 2020-11-20 17:28:44
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var UNDEFINED = 'undefined';

  nx.toggle = function (inArray, inItem, inPath) {
    var idx = inArray.findIndex(function (item) {
      return typeof inPath === UNDEFINED
        ? inItem === item
        : nx.get(item, inPath) === nx.get(inItem, inPath);
    });
    idx === -1 ? inArray.push(inItem) : inArray.splice(idx, 1);
    return inArray;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.toggle;
  }
})();
