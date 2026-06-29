/*
  회원 탈퇴, DELETE
  /api/user

  성공 응답:
  {
    "code": "SUCCESS",
    "message": "요청이 성공적으로 처리되었습니다."
  }

  실패 응답:
  401 - 로그인하지 않은 사용자
  {
    "code": "C007",
    "message": "인증이 필요합니다."
  }
*/
import { buildApiUrl } from "./client";

const USER_ENDPOINT = "/api/user";

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

function createUserError(response, data) {
  const error = new Error(data?.message ?? "Failed to delete user");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function deleteUser({ accessToken, signal } = {}) {
  const headers = {
    Accept: "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(buildApiUrl(USER_ENDPOINT), {
    method: "DELETE",
    headers,
    signal,
  });
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createUserError(response, data);
  }

  return data;
}
