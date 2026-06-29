/*
  이메일 인증번호 검증, POST
  /api/auth/email/verify

  요청:
  {
    "email": "string",
    "code": "{이메일로 전송된 인증번호}"
  }

  성공 응답 예시:
  200 {
    "code": "SUCCESS",
    "message": "요청이 성공적으로 처리되었습니다."
  }

  에러 응답 예시:
  400 {
    "code": "C002",
    "message": "인증 요청 내역이 없습니다."
  }

  400 {
    "code": "C002",
    "message": "인증번호가 만료되었습니다. 다시 요청해 주세요."
  }

  400 {
    "code": "C002",
    "message": "인증번호가 일치하지 않습니다."
  }
*/
import { buildApiUrl } from "../../client";

const EMAIL_VERIFY_ENDPOINT = "/api/auth/email/verify";
const EMAIL_VERIFY_TIMEOUT_MS = 10000;

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

function createEmailVerifyError(response, data) {
  const error = new Error(data?.message ?? "Failed to verify email code");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function verifyEmailCode({ email, code, signal }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), EMAIL_VERIFY_TIMEOUT_MS);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response;

  try {
    response = await fetch(buildApiUrl(EMAIL_VERIFY_ENDPOINT), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("인증번호 확인 요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createEmailVerifyError(response, data);
  }

  return data;
}
