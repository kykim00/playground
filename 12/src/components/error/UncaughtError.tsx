import React from 'react';
import { CustomErrorProps } from './AuthError';
import ErrorTemplate from './ErrorTemplate';

export default function ({ statusCode = 500, onReset }: { statusCode: number } & CustomErrorProps) {
  return (
    <ErrorTemplate
      statusCode={statusCode}
      messageTitle="잠시 후 다시 확인해주세요!"
      messageText={
        <span>
          지금 이 서비스에 연결할 수 없습니다.
          <br />
          시스템 관리자에게 에러를 보고하였으니 나중에 다시 시도해주세요.
        </span>
      }
      icon={<h1>{statusCode}</h1>}
      button={onReset ? <button onClick={onReset}>다시시도</button> : undefined}
    />
  );
}
