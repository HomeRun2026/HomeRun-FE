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
import { requestJson } from "../client";

const SIGNUP_ENDPOINT = "/api/auth/signup";

export async function signup({
  email,
  password,
  passwordConfirm,
  nickname,
  signal,
}) {
  return requestJson({
    path: SIGNUP_ENDPOINT,
    method: "POST",
    body: {
      email,
      password,
      passwordConfirm,
      nickname,
    },
    signal,
    errorMessage: "회원가입에 실패했습니다.",
  });
}
