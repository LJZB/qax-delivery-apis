import { APIRequestContext, TestInfo } from '@playwright/test';
import type { CollectionRequest, CollectionResponse } from '../types/modelos';
import { attachApiLog, buildApiLogData } from '../helpers/apiLogger';

export class CollectionService {
  private readonly request: APIRequestContext;
  private readonly baseEndpoint = '/collections';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Crea un objeto dentro de una collection privada.
  async createCollectionObject(
    collectionName: string,
    payload: CollectionRequest,
    testInfo?: TestInfo
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

    const logData = await buildApiLogData(
      'POST',
      response.url(),
      response,
      payload
    );

    if (testInfo) {
      await attachApiLog(testInfo, 'POST-create-collection-object.json', logData);
    }

    return {
      status: logData.status,
      body: logData.responseBody as CollectionResponse,
    };
  }

  // Consulta un objeto específico dentro de una collection privada.
  async getCollectionObject(
    collectionName: string,
    objectId: string,
    testInfo?: TestInfo
  ): Promise<{
    status: number;
    body: CollectionResponse;
  }> {
    const response = await this.request.get(
      `${this.baseEndpoint}/${collectionName}/objects/${objectId}`
    );

    const logData = await buildApiLogData(
      'GET',
      response.url(),
      response
    );

    if (testInfo) {
      await attachApiLog(testInfo, 'GET-collection-object.json', logData);
    }

    return {
      status: logData.status,
      body: logData.responseBody as CollectionResponse,
    };
  }
}
