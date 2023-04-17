import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';
import Setting from '@/components/icons/Setting';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { PropsWithChildren, useId, useState } from 'react';

type Prop = {
  Head: React.ReactNode;
  Buttons?: React.ReactNode;
  Content: React.ReactNode;
  isOpen?: boolean;
  onHeadClick?: () => void;
} & PropsWithChildren;

interface Menu {
  name: string;
  to: string;
  icon?: () => JSX.Element;
}
interface HeadMenu extends Omit<Menu, 'to'> {
  menus: Menu[];
}

const LNBRoutes: (HeadMenu | Menu)[] = [
  {
    name: '경비지출관리',
    // icon: ChevronDown,
    // activeIcon: ChevronUp,
    menus: [
      {
        name: '법인카드',
        to: '/',
      },
      {
        name: '개인경비',
        to: '/',
      },
      {
        name: '예산편성',
        to: '/예산사용',
      },
    ],
  },
  {
    name: '매출입 관리',
    menus: [
      {
        name: '매출',
        to: '/',
      },
      {
        name: '매입',
        to: '/',
      },
    ],
  },
  {
    name: '입출금 관리',
    to: '/',
  },
];
const Accordion = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const handleClickMenu = (name: string) => {
    setActiveMenu(name);
  };
  return (
    <Container className="no-select">
      <ul>
        {LNBRoutes.map(route => {
          if ('menus' in route) {
            return <AccordionList {...route} activeMenu={activeMenu} handleClickMenu={handleClickMenu} />;
          }
          return (
            <AccordionItem
              {...route}
              isActive={activeMenu === route.name}
              handleClickMenu={handleClickMenu}
              isHeadMenu
            />
          );
        })}
      </ul>
    </Container>
  );
};

export function AccordionList({
  name,
  icon,
  menus,
  activeMenu,
  handleClickMenu,
}: HeadMenu & { activeMenu: string; handleClickMenu: (name: string) => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const id = useId();
  const Icon = icon ?? ChevronUp;

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <li>
      <AccordionListTitle onClick={handleToggleMenu} isOpen={isOpen}>
        <IconTextWrap>
          <Icon />
          <span>{name}</span>
        </IconTextWrap>
      </AccordionListTitle>
      {isOpen && (
        <ul>
          {menus.map(menu => {
            const isActive = activeMenu === menu.name;
            return (
              <AccordionItem
                {...menu}
                isActive={isActive}
                key={`${id}_${menu.name}`}
                handleClickMenu={handleClickMenu}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export function AccordionItem({
  name,
  icon,
  to,
  isActive,
  handleClickMenu,
  isHeadMenu = false,
}: Menu & { isActive: boolean; handleClickMenu: (name: string) => void; isHeadMenu?: boolean }) {
  const Icon = icon ?? Setting;
  return (
    <AccordionListItem onClick={() => handleClickMenu(name)} isActive={isActive} isHeadMenu={isHeadMenu}>
      {/* <Link href={to}>
      </Link> */}
      <IconTextWrap>
        <Icon />
        <span>{name}</span>
      </IconTextWrap>
    </AccordionListItem>
  );
}

const Container = styled.aside`
  width: 250px;
  background-color: #eff4fc;
  color: #676767;
  font-size: 15px;
  padding: 20px;
  ul,
  li {
    list-style: none;
  }
`;

const AccordionListTitle = styled.div<{ isOpen?: boolean }>`
  padding: 8px 10px 8px 8px;
  cursor: pointer;
  svg {
    transition: 0.2s all;
    transition-duration: 0.2s;
    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: rotate(180deg);
      `}
  }
`;

const AccordionListItem = styled.li<{ isActive?: boolean; isHeadMenu?: boolean }>`
  padding: ${({ isHeadMenu }) => (isHeadMenu ? '8px 10px 8px 4px' : '8px 10px 8px 20px')};
  &:hover {
    background-color: white;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      color: #056ac9;
      background-color: #dae8f8;
      font-weight: bold;

      svg {
        path {
          fill: #056ac9;
        }
      }
    `}
`;

const IconTextWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default Accordion;
