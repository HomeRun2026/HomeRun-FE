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

  실패 응답 예시:
  500 {
    "code": "C001",
    "message": "서버 내부 오류가 발생했습니다."
  }
*/
import { buildApiUrl } from "../../client";

const EMAIL_SEND_ENDPOINT = "/api/auth/email/send";
const EMAIL_SEND_TIMEOUT_MS = 10000;

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

function createEmailSendError(response, data) {
  const error = new Error(data?.message ?? "Failed to send email verification code");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function sendEmailVerificationCode({ email, signal }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), EMAIL_SEND_TIMEOUT_MS);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response;

  try {
    response = await fetch(buildApiUrl(EMAIL_SEND_ENDPOINT), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("인증번호 발송 요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createEmailSendError(response, data);
  }

  return data;
}
