/*
  마이페이지 화면 정보 조회, GET
  /api/mypage

  성공 응답:
  {
    "appVersion": "1.0.1",
    "email": "string",
    "nickname": "홍길동644"
  }

  실패 응답:
  401 {
    "code": "C007",
    "message": "인증이 필요합니다"
  }
*/
import { buildApiUrl } from "./client";

const MYPAGE_ENDPOINT = "/api/mypage";

async function parseJsonSafely(response) {
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

function createApiError(response, data) {
  const error = new Error(data?.message ?? "Failed to load mypage");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function getMyPage({ accessToken, signal } = {}) {
  const headers = {
    Accept: "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(buildApiUrl(MYPAGE_ENDPOINT), {
    method: "GET",
    headers,
    signal,
  });
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createApiError(response, data);
  }

  return {
    appVersion: data?.appVersion,
    email: data?.email,
    nickname: data?.nickname,
  };
}
