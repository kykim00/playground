import useNavigationStore from '@/stores/navigation';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent } from 'react';

const NavigationTab = () => {
  const router = useRouter();
  const { navigations, currentID, open, close } = useNavigationStore();

  const handleClickTab = (name: string, route: string, isCurrentTab: boolean) => {
    open(name, route);
    if (!isCurrentTab) {
      router.push(route);
    }
  };

  const handleCloseTab = (e: SyntheticEvent, id: string, isCurrentTab: boolean) => {
    e.stopPropagation();
    close(id);
    if (isCurrentTab) {
      const remainingNavigations = navigations.filter(nav => nav.id !== id);
      router.push(remainingNavigations.slice(-1)[0].route);
    }
  };

  return (
    <nav>
      <Conatiner>
        {navigations.map(({ id, name, route }) => {
          const isCurrentTab = currentID === id;

          return (
            <Tab isActive={isCurrentTab} onClick={() => handleClickTab(name, route, isCurrentTab)}>
              {name}
              {name !== '홈' && <button onClick={e => handleCloseTab(e, id, isCurrentTab)}>X</button>}
            </Tab>
          );
        })}
      </Conatiner>
    </nav>
  );
};

const Conatiner = styled.ul`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 20px;
  height: 50px;
  padding-left: 20px;
  background: white;
  list-style: none;
`;

const Tab = styled.li<{ isActive: boolean }>`
  background: ${({ isActive }) => (isActive ? 'gray' : 'lightgray')};
  padding: 10px 20px;
  cursor: pointer;
  button {
    margin-left: 10px;
    padding: 0 4px;
  }
`;

export default NavigationTab;
