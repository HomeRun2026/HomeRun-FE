const DEFAULT_API_BASE_URL = "https://homerun-be.onrender.com/";
const DEFAULT_TIMEOUT_MS = 10000;

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export function buildApiUrl(path = "") {
  if (!path) {
    return API_BASE_URL;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`;
}

export async function parseJsonSafely(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function createApiError(response, data, fallbackMessage) {
  const error = new Error(data?.message ?? fallbackMessage);

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

function createRequestSignal({ signal, timeoutMs }) {
  if (!signal && !timeoutMs) {
    return {};
  }

  const controller = new AbortController();
  const timeoutId = timeoutMs
    ? setTimeout(() => controller.abort(), timeoutMs)
    : null;

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  return {
    signal: controller.signal,
    clear: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    },
  };
}

export async function requestJson({
  path,
  method = "GET",
  body,
  accessToken,
  signal,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  timeoutMessage = "요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.",
  errorMessage = "API request failed",
}) {
  const headers = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const requestSignal = createRequestSignal({ signal, timeoutMs });
  let response;

  try {
    response = await fetch(buildApiUrl(path), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: requestSignal.signal ?? signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(timeoutMessage);
    }

    throw error;
  } finally {
    requestSignal.clear?.();
  }

  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createApiError(response, data, errorMessage);
  }

  return data;
}
