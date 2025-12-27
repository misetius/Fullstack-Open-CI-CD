import { defineConfig, globalIgnores } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin'


export default defineConfig([
  {
    files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    
    rules: {
      'prefer-const': 'warn',
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
    },
    
  },
])
