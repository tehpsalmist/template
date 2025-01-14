import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import preprocess from 'svelte-preprocess'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: preprocess({
        postcss: {
          plugins: [require('tailwindcss')]
        }
      }),
      css: css => {
        css.write('public/bundle.css')
      }
    }),
    resolve({ browser: true }),
    commonjs(),
    !production && livereload('public'),
    production && terser()
  ],
  watch: {
    clearScreen: false
  },
  onwarn: warning =>
    warning.code === 'THIS_IS_UNDEFINED' || console.warn(warning.message)
}
