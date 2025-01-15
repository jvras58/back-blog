export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    setupFiles: ['<rootDir>/src/tests/config.ts']
  };