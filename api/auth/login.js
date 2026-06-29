/*
  일반 로그인, POST
  /api/auth/login

  request:
  {
    "email": "string",
    "password": "string"
  }

  성공 응답:
  200 {
    "code": "SUCCESS",
    "message": "요청이 성공적으로 처리되었습니다",
    "data": {
      "accessToken": "{토큰값}",
      "refreshToken": "{토큰값}"
    }
  }

  에러 응답 예시:
  400 {
    "code": "C002",
    "message": "가입되지 않은 이메일입니다."
  }

  400 {
    "code": "C002",
    "message": "비밀번호가 일치하지 않습니다."
  }

  500 {
    "code": "C001",
    "message": "서버 내부 오류가 발생했습니다."
  }
*/
import { buildApiUrl } from "../client";

const LOGIN_ENDPOINT = "/api/auth/login";

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

function createLoginError(response, data) {
  const error = new Error(data?.message ?? "Failed to login");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function login({ email, password, signal }) {
  const response = await fetch(buildApiUrl(LOGIN_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    signal,
  });
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createLoginError(response, data);
  }

  return data;
}
