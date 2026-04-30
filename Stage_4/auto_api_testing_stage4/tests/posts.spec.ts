import { test, expect } from '@playwright/test';
import { PostService } from '../src/services/PostService';
import type { PostRequest } from '../src/types/post.types';

test.describe('Posts API @regresion', () => {
  test('GET /posts/:id obtiene un post correctamente @get @smoke', async ({ request }) => {
    // ARRANGE
    const postService = new PostService(request);
    const postId = 1;

    // ACT
    const { status, body } = await postService.getPost(postId);

    // ASSERT
    expect(status).toBe(200);
    expect(body.id).toBe(postId);
    expect(body.title).toBeTruthy();
    expect(body.body).toBeTruthy();
    expect(body.userId).toBeGreaterThan(0);
  });

  test('POST /posts crea un post correctamente @post @regresion', async ({ request }) => {
    // ARRANGE
    const postService = new PostService(request);
    const newPost: PostRequest = {
      title: 'Post creado desde Playwright TS',
      body: 'Contenido de prueba para Warmup 4',
      userId: 1,
    };

    // ACT
    const { status, body } = await postService.createPost(newPost);

    // ASSERT
    expect(status).toBe(201);
    expect(body.id).toBeDefined();
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body.userId).toBe(newPost.userId);
  });
});