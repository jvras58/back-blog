import 'dotenv/config';

process.env.DATABASE_URL = 'postgresql://blog_desafio:blog_desafio@123@127.0.0.1:5439/blog_desafio';
process.env.NODE_ENV = 'test';
process.env.AUTH_SECRET = 'test-secret';