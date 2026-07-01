/*
  이메일 인증번호 발송, POST
  /api/auth/email/send

  요청:
  {
    "email": "string"
  }

  성공 응답 예시:
  200 {
    "code": "SUCCESS",
    "message": "요청이 성공적으로 처리되었습니다."
  }
*/
import { requestJson } from "../../client";

const EMAIL_SEND_ENDPOINT = "/api/auth/email/send";

export async function sendEmailVerificationCode({ email, signal }) {
  return requestJson({
    path: EMAIL_SEND_ENDPOINT,
    method: "POST",
    body: {
      email,
    },
    signal,
    timeoutMessage:
      "인증번호 발송 요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.",
    errorMessage: "인증번호 발송에 실패했습니다.",
  });
}
