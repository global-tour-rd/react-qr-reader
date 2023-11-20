const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const external = require('rollup-plugin-peer-deps-external');
const { dts } = require('rollup-plugin-dts');
const webWorkerLoader = require('@qortal/rollup-plugin-web-worker-loader');

const packageJson = require('./package.json');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'react-ts-lib',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      webWorkerLoader(),
      external(),
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', module: 'esnext' }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [
      { file: 'dist/index.d.ts', format: 'esm', chunkFileNames: '[name].js' },
    ],
    plugins: [dts()],
  },
];
