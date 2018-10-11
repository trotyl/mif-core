const fs = require('fs')
const MagicString = require('magic-string')

module.exports = function pkgInfo(packageJson) {
  return {
    name: 'package-info', // this name will show up in warnings and errors
    renderChunk(code, { modules, exports, imports, fileName, isEntry }) {
      const meta = JSON.stringify({ imports: imports.filter(i => !i.startsWith('mif-demo')) })
      fs.writeFileSync(`mif-meta.json`, meta, { encoding: 'utf8' })

      const str = new MagicString(code, { filename: fileName })
      
      const deps = {}
      for (const i of imports) {
        const version = (packageJson.dependencies && packageJson.dependencies[i]) || 
          (packageJson.peerDependencies && packageJson.peerDependencies[i]) ||
          '*'
        deps[i] = {
          version,
          path: i.startsWith('mif-demo') ? '*' : `./auto-import-${i}.mif.js`
        }
      }
      
      const info = {
        name: packageJson.name,
        version: packageJson.version,
        dependencies: deps,
      }
      str.prepend(`System.pkgInfo(${JSON.stringify(info, undefined, 2)});\n`)
      return { 
        code: str.toString(),
        map: str.generateMap(),
      }
    }
  };
}
