import { APIRequestContext } from '@playwright/test';
import { CollectionRequest, CollectionResponse } from '../types/modelos';

export class CollectionService {
  private readonly request: APIRequestContext;
  private readonly baseEndpoint = '/collections';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createCollectionObject(
    collectionName: string,
    payload: CollectionRequest
  ): Promise<{
    status: number;
    body: CollectionResponse;
  }> {
    const response = await this.request.post(
      `${this.baseEndpoint}/${collectionName}/objects`,
      {
        data: payload,
      }
    );

    const body = await response.json();

    return {
      status: response.status(),
      body,
    };
  }
}
