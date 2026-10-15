const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/models/index.js'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/models.bundle.js',
  external: ['sequelize', '../database/connection'],
}).then(() => {
  console.log(' Build concluído com sucesso!');
}).catch((err) => {
  console.error(' Erro durante o build:');
  console.error(err);
  process.exit(1);
});
