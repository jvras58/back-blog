import 'dotenv/config';

process.env.NODE_ENV = 'test';
process.env.AUTH_SECRET = 'test-secret';

process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://usertest:passwordtest@localhost:5435/test_db';
