import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
import Lnb from './LNB';

const NavigationTab = dynamic(() => import('../ui/navigationTab'), { ssr: false });

export default function ({ children }: PropsWithChildren) {
  return (
    <Container>
      <Lnb />
      <PageWrap>
        <NavigationTab />
        {children}
      </PageWrap>
    </Container>
  );
}

const Container = styled.main`
  position: absolute;
  display: flex;
  inset: 60px 0 0;
  height: calc(100vh - 60px);
`;
const PageWrap = styled.div`
  flex-grow: 1;
  width: calc(100% - 250px);
  overflow: auto;
  background-color: grey;
`;
