import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // Configuración base de TypeScript
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // 1. Desactiva reglas duplicadas
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // 2. BORRA AUTOMÁTICAMENTE los imports que no uses
      'unused-imports/no-unused-imports': 'error',

      // 3. AVISA sobre variables sin usar (sin borrarlas para no dañar tu app)
      'unused-imports/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',
          'args': 'after-used',
          'argsIgnorePattern': '^_',
        },
      ],
    },
  },
);
