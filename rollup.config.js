export default {
  input: 'esm5/index.js',
  output: [{
    file: 'fesm5/mif-core.js',
    format: 'es',
    sourcemap: true,
  }, {
    file: 'bundles/mif-core.umd.js',
    format: 'umd',
    name: 'mif.core',
    sourcemap: true,
  }],
}
