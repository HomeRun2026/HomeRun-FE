/*
 문의하기 - 메일 기능 구현 이후 개발
 /api/mypage/inquiry
 #### 요청

```json
{
  "title": "Inquiries Test-title",
  "content": "Inquiries Test-content"
}
```

## 성공 응답 예시

#### 200

```json
{
  "code": "SUCCESS",
  "message": "요청이 성공적으로 처리되었습니다."
}
```

## 에러 응답 예시

#### 400

```json
{
  "code": "C002",
  "message": "잘못된 입력값입니다.",
  "data": {
    "title": "제목을 입력해주세요."
  }
}
```

#### 400

```json
{
  "code": "C002",
  "message": "잘못된 입력값입니다.",
  "data": {
    "content": "문의 내용을 입력해주세요."
  }
}
```

#### 400

```json
{
  "code": "C002",
  "message": "가입되지 않은 이메일입니다."
}
```

#### 401

```json
{
  "code": "C007",
  "message": "인증이 필요합니다."
}
```

#### 403

```json
{
  "code": "C005",
  "message": "인증 정보가 없습니다."
}
```

#### 500

```json
{
  "code": "C001",
  "message": "서버 내부 오류가 발생했습니다."
}
```

#### 500

```json
{
  "code": "C001",
  "message": "문의 메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요."
}
```
*/

import { getAccessToken } from "../auth/tokens";
import { requestJson } from "../client";

const INQUIRY_ENDPOINT = "/api/mypage/inquiry";

function validateInquiryPayload({ title, content } = {}) {
  const errors = {};

  if (!title) {
    errors.title = "제목을 입력해주세요.";
  }

  if (!content) {
    errors.content = "문의 내용을 입력해주세요.";
  }

  return Object.keys(errors).length ? errors : null;
}

export async function sendInquiry({
  title,
  content,
  accessToken = getAccessToken(),
  signal,
} = {}) {
  const validation = validateInquiryPayload({ title, content });

  if (validation) {
    const error = new Error("잘못된 입력값입니다.");
    error.code = "C002";
    error.data = validation;
    throw error;
  }

  const response = await requestJson({
    path: INQUIRY_ENDPOINT,
    method: "POST",
    body: { title, content },
    accessToken,
    signal,
    errorMessage: "문의 전송에 실패했습니다.",
  });

  return response;
}
