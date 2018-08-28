const fs = require('fs');
const path = require('path');
const walkDir = require('walk-dir');

module.exports = function deleteSourceMaps(options) {
  this.nuxt.hook('build:done', builder => {
    let distDir = path.join(builder.options.buildDir, 'dist');

    if (fs.existsSync(distDir)) {
      let sourceMaps = walkDir
        .listSync('', distDir, 0)
        .filter(f => f.indexOf('.js.map') === (f.length - 7));
      sourceMaps.forEach(map => fs.unlinkSync(map));
    }
  });
}