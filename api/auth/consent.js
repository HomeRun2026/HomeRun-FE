/*
  이용 약관 동의, POST
  /api/auth/signup/consent

  요청:
  {
    "serviceTermsAgreement": true,
    "serviceInfoAgreement": true
  }

  성공 응답 예시:
  200 {
    "code": "SUCCESS",
    "message": "요청이 성공적으로 처리되었습니다.",
    "data": {
      "accessToken": "{토큰값}",
      "refreshToken": "{토큰값}"
    }
  }

  에러 응답 예시:
  400 {
    "code": "C002",
    "message": "사용자를 찾을 수 없습니다."
  }

  400 {
    "code": "C002",
    "message": "필수 약관에 모두 동의해야 서비스 이용이 가능합니다."
  }

  400 {
    "code": "C002",
    "message": "이미 정식 가입이 완료된 사용자입니다."
  }

  403 {
    "code": "C005",
    "message": "인증되지 않은 사용자입니다."
  }
*/
import { buildApiUrl } from "../client";

const SIGNUP_CONSENT_ENDPOINT = "/api/auth/signup/consent";

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

function createConsentError(response, data) {
  const error = new Error(data?.message ?? "Failed to agree to terms");

  error.status = response.status;
  error.code = data?.code;
  error.data = data;

  return error;
}

export async function agreeToSignupTerms({
  serviceTermsAgreement,
  serviceInfoAgreement,
  accessToken,
  signal,
}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(buildApiUrl(SIGNUP_CONSENT_ENDPOINT), {
    method: "POST",
    headers,
    body: JSON.stringify({
      serviceTermsAgreement,
      serviceInfoAgreement,
    }),
    signal,
  });
  const data = await parseJsonSafely(response);

  if (!response.ok) {
    throw createConsentError(response, data);
  }

  return data;
}
