module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    testMatch: [
        '**/__tests__/**/*.ts',
        '**/?(*.)+(spec|test).ts'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/server.ts',
        '!src/configs/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@configs$': '<rootDir>/src/configs/index.ts',
        '^@controllers$': '<rootDir>/src/controllers/index.ts',
        '^@middlewares$': '<rootDir>/src/middlewares/index.ts',
        '^@routes$': '<rootDir>/src/routes/index.ts',
        '^@services$': '<rootDir>/src/services/index.ts',
        '^@utils$': '<rootDir>/src/utils/index.ts',
        '^@enums$': '<rootDir>/src/types/enums/index.ts',
        '^@interfaces$': '<rootDir>/src/types/interfaces/index.ts',
        '^@responses$': '<rootDir>/src/types/interfaces/responses/index.ts',
        '^@requests$': '<rootDir>/src/types/interfaces/requests/index.ts',
        '^@helpers$': '<rootDir>/src/helpers/index.ts',
    },
    testTimeout: 10000,
};