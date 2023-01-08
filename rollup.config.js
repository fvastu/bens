/* eslint-env node */
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/script.ts',
    output: [
      {
        file: 'lib/script.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'lib/script.cjs.js',
        format: 'cjs',
        sourcemap: false,
      },
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.esm.js',
        format: 'esm',
        sourcemap: false,
      },
      {
        file: 'lib/index.cjs.js',
        format: 'cjs',
        sourcemap: false,
      },
    ],
    plugins: [
      typescript(), terser()
    ],
  },
]
