import 'dotenv/config';

process.env.DATABASE_URL = 'sqlite:///:memory:';
process.env.NODE_ENV = 'test';
process.env.AUTH_SECRET = 'test-secret';