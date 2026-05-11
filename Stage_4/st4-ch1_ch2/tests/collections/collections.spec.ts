import { test, expect } from '@playwright/test';
import { CollectionService } from '../../src/services/CollectionService';
import { buildCollectionPayload } from '../../src/helpers/dataBuilder';

test.describe('Collections API con logs @regression', () => {
  test('debe crear y consultar un objeto en una collection privada con logs @smoke', async ({ request }) => {
    const collectionService = new CollectionService(request);
    const collectionName = 'products';
    const payload = buildCollectionPayload();

    let objectId: string;

    await test.step('POST: Crear objeto en collection con payload dinámico', async () => {
      const { status, body } = await collectionService.createCollectionObject(
        collectionName,
        payload,
        test.info()
      );

      expect(status).toBe(200);
      expect(body.id).toBeTruthy();
      expect(body.name).toBe(payload.name);
      expect(body.data.price).toBe(payload.data.price);

      objectId = body.id;
    });

    await test.step('GET: Consultar objeto creado y adjuntar log al reporte', async () => {
      const { status, body } = await collectionService.getCollectionObject(
        collectionName,
        objectId,
        test.info()
      );

      expect(status).toBe(200);
      expect(body.id).toBe(objectId);
      expect(body.name).toBe(payload.name);
      expect(body.data.price).toBe(payload.data.price);
    });
  });
});
