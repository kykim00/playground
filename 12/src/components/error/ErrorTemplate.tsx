import React, { ReactNode } from 'react';
import Head from 'next/head';
import $ from './errorTemplate.module.scss';

interface ErrorTemplateProps {
  statusCode: string | number;
  messageTitle: string;
  messageText: string | ReactNode;
  icon: string | ReactNode;
  button?: ReactNode;
}
const ErrorTemplate = ({ statusCode, messageTitle, messageText, icon, button }: ErrorTemplateProps) => (
  <div className={$.module}>
    <div className="error-container">
      <div className="error-row">
        <div className="error-cell">
          <div className="icon">{icon}</div>
        </div>
        <div className="error-cell content">
          <h1>{statusCode}</h1>
          <h2>{messageTitle}</h2>
          <p>{messageText}</p>
          {button}
        </div>
      </div>
    </div>
  </div>
);

export default ErrorTemplate;
