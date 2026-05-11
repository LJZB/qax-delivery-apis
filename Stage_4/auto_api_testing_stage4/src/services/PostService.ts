import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { PostRequest, PostResponse } from '../types/post.types';

export class PostService {
  private readonly request: APIRequestContext;
  private readonly endpoint = '/posts';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getPost(id: number): Promise<{ status: number; body: PostResponse }> {
    const response: APIResponse = await this.request.get(`${this.endpoint}/${id}`);
    const body: PostResponse = await response.json();

    return {
      status: response.status(),
      body,
    };
  }

  async createPost(post: PostRequest): Promise<{ status: number; body: PostResponse }> {
    const response: APIResponse = await this.request.post(this.endpoint, {
      data: post,
    });

    const body: PostResponse = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}