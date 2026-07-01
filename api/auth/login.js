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
*/
import { requestJson } from "../client";

const LOGIN_ENDPOINT = "/api/auth/login";

export async function login({ email, password, signal }) {
  return requestJson({
    path: LOGIN_ENDPOINT,
    method: "POST",
    body: {
      email,
      password,
    },
    signal,
    errorMessage: "로그인에 실패했습니다.",
  });
}
