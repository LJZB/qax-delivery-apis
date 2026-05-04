import { test, expect } from '@playwright/test';
import { CollectionService } from '../../src/services/CollectionService';
import { buildCollectionPayload } from '../../src/helpers/dataBuilder';

test.describe('Collections API @regression', () => {
  test('debe crear un objeto en una collection usando servicio privado y data builder @smoke', async ({ request }) => {
    const collectionService = new CollectionService(request);
    const collectionName = 'products';
    const payload = buildCollectionPayload();

    await test.step('Crear objeto en collection con payload dinámico', async () => {
      const { status, body } = await collectionService.createCollectionObject(
        collectionName,
        payload
      );

      expect(status).toBe(200);
      expect(body.id).toBeTruthy();
      expect(body.name).toBe(payload.name);
      expect(body.data.price).toBe(payload.data.price);
      expect(body.data.year).toBe(payload.data.year);
      expect(body.data.cpuModel).toBe(payload.data.cpuModel);
      expect(body.data.hardDiskSize).toBe(payload.data.hardDiskSize);
    });
  });
});
