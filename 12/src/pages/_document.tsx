import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <div id="modal-root"></div>
        <div id="search-button" style={{ position: 'fixed', right: '20px', bottom: '20px' }}></div>
        <NextScript />
      </body>
    </Html>
  );
}
