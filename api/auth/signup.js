/*
  일반 회원가입, POST
  /api/auth/signup

  request:
  {
    "email": "string",
    "password": "string",
    "passwordConfirm": "string",
    "nickname": "string"
  }

  성공 응답:
  201 {
    "code": "SUCCESS",
    "message": "요청이 성공적으로 처리되었습니다",
    "data": {
      "accessToken": "{토큰값}",
      "refreshToken": "{토큰값}"
    }
  }
*/
import { buildApiUrl } from "../client";

const SIGNUP_ENDPOINT = "/api/auth/signup";

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

function createSignupError(response, data) {
  const error = new Error(data?.message ?? "Failed to signup");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function signup({
  email,
  password,
  passwordConfirm,
  nickname,
  signal,
}) {
  const response = await fetch(buildApiUrl(SIGNUP_ENDPOINT), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      passwordConfirm,
      nickname,
    }),
    signal,
  });
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createSignupError(response, data);
  }

  return data;
}
