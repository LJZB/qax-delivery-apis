import { APIResponse, TestInfo } from '@playwright/test';

// Define la estructura mínima que debe tener cada log de API.
interface ApiLogData {
  method: string;
  url: string;
  requestBody?: unknown;
  status: number;
  responseBody: unknown;
}

// Adjunta el log al reporte HTML de Playwright como archivo JSON.
export async function attachApiLog(
  testInfo: TestInfo,
  logName: string,
  data: ApiLogData
): Promise<void> {
  await testInfo.attach(logName, {
    body: JSON.stringify(data, null, 2),
    contentType: 'application/json',
  });
}

// Construye el objeto de log a partir del request enviado y el response recibido.
export async function buildApiLogData(
  method: string,
  url: string,
  response: APIResponse,
  requestBody?: unknown
): Promise<ApiLogData> {
  const responseBody = await response.json();

  return {
    method,
    url,
    requestBody,
    status: response.status(),
    responseBody,
  };
}
