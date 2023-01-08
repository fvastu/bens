/* eslint-env node */

import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'lib/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external: ['rxjs', 'rxjs/operators'],
    plugins: [typescript()],
  },
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
        sourcemap: true,
      },
    ],
    external: ['rxjs', 'rxjs/operators'],
    plugins: [typescript()],
  },
]
