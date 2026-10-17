import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'

const relativeParentImports = {
  group: ['../*'],
  message: 'Use o alias @/ em vez de caminhos relativos.',
}

/** Camadas internas (domínio e aplicação) não podem conhecer frameworks nem camadas externas. */
const coreBoundaryImports = {
  group: [
    'next',
    'next/*',
    'react',
    'react-dom',
    'resend',
    'react-email',
    'zod',
    '@/app/*',
    '@/components/*',
    '@/content/*',
    '@/lib/*',
    '@/core/*/infrastructure/*',
  ],
  message: 'Domínio e aplicação não podem depender de frameworks, conteúdo ou infraestrutura.',
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-restricted-imports': ['error', { patterns: [relativeParentImports] }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['src/core/**/domain/**/*.ts', 'src/core/**/application/**/*.ts'],
    ignores: ['**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [relativeParentImports, coreBoundaryImports] },
      ],
    },
  },
  {
    // Código de terceiros (React Bits), mantido próximo do original para facilitar
    // atualizações. Ele usa o padrão "ref com o valor mais recente" (atribuição de
    // ref durante o render), seguro aqui porque os efeitos só leem o valor depois.
    // O site nunca usa esses arquivos diretamente: só os wrappers em components/reactbits.
    files: ['src/components/reactbits/vendor/**'],
    rules: {
      'react-hooks/refs': 'off',
      'import/order': 'off',
    },
  },
  {
    // Scripts rodam direto no Node, fora do Next: lá o alias @/ não existe.
    files: ['scripts/**'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'next-env.d.ts',
    // Capturas e scripts de conferência locais (fora do git).
    '.screenshots/**',
    // Tabelas do `cn` geradas no build (ver cn.config.mjs).
    'src/lib/cn-tables.ts',
  ]),
])

export default eslintConfig
