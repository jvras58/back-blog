import { prisma } from '../lib/db';
import { createPost, getPosts } from '../post/posts.controller';
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';

interface CustomRequest extends Request {
    user?: {
      sub: string;
    };
    query: ParsedQs & {
        userId?: string;
    };
}

jest.mock('../lib/db', () => ({
  prisma: {
    post: {
      create: jest.fn(),
      findMany: jest.fn()
    }
  }
}));

describe('Posts Controller', () => {
  let mockReq: Partial<CustomRequest>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockReq = {
      user: { sub: 'user-123' },
      body: {},
      query: {}
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createPost deve criar uma nova postagem', async () => {
    // Arrange
    const mockPost = {
      title: 'Test Post',
      content: 'Test Content',
      description: 'Test Description',
      category: 'Test'
    };
    
    mockReq.body = mockPost;
    
    // Mock do retorno do prisma.post.create
    (prisma.post.create as jest.Mock).mockResolvedValue({
      id: '1',
      ...mockPost,
      authorId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Act
    await createPost(mockReq as any, mockRes as any);
    
    // Assert
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        ...mockPost,
        authorId: 'user-123',
        tags: []
      }
    });
    
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();
  });


test('getPosts deve retornar todas as postagens', async () => {
    // Arrange
    const mockPosts = [
      {
        id: '1',
        title: 'Test Post',
        content: 'Test Content',
        description: 'Test Description',
        category: 'Test',
        authorId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    mockReq.query = { userId: 'user-123' } as ParsedQs & { userId?: string };
    
    (prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts);
    
    // Act
    await getPosts(mockReq as any, mockRes as any);
    
    // Assert
    expect(prisma.post.findMany).toHaveBeenCalledWith({
      where: { authorId: mockReq.query.userId },
      include: {
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    expect(mockRes.json).toHaveBeenCalledWith(mockPosts);
  });
});