import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['index.html'],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outdir: 'dist/bundle',
})