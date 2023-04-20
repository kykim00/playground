import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';
import Setting from '@/components/icons/Setting';
import useNavigationStore, { useCurrentName } from '@/stores/navigation';
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
        to: '/table',
      },
      {
        name: '개인경비',
        to: '/ui',
      },
      {
        name: '예산편성',
        to: '/',
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

const LNBRoutes2: (HeadMenu | Menu)[] = [
  {
    name: '경비지출관리2',
    // icon: ChevronDown,
    // activeIcon: ChevronUp,
    menus: [
      {
        name: '법인카드2',
        to: '/table',
      },
      {
        name: '개인경비2',
        to: '/ui',
      },
      {
        name: '예산편성2',
        to: '/',
      },
    ],
  },
  {
    name: '매출입 관리2',
    menus: [
      {
        name: '매출2',
        to: '/',
      },
      {
        name: '매입2',
        to: '/',
      },
    ],
  },
  {
    name: '입출금 관리2',
    to: '/',
  },
];
const Accordion = () => {
  return (
    <Container className="no-select">
      <ul>
        {LNBRoutes.map(route => {
          if ('menus' in route) {
            return <AccordionList {...route} />;
          }
          return <AccordionItem {...route} isFirstDepthMenu />;
        })}
        <hr />
        {LNBRoutes2.map(route => {
          if ('menus' in route) {
            return <AccordionList {...route} />;
          }
          return <AccordionItem {...route} isFirstDepthMenu />;
        })}
      </ul>
    </Container>
  );
};

function AccordionList({ name, icon, menus }: HeadMenu) {
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
            return <AccordionItem {...menu} key={`${id}_${menu.name}`} />;
          })}
        </ul>
      )}
    </li>
  );
}

function AccordionItem({ name, icon, to, isFirstDepthMenu = false }: Menu & { isFirstDepthMenu?: boolean }) {
  const Icon = icon ?? Setting;
  const currentName = useCurrentName();
  const open = useNavigationStore(state => state.open);

  return (
    <Link href={to}>
      <AccordionListItem
        onClick={() => {
          open(name, to);
        }}
        isActive={currentName === name}
        isFirstDepthMenu={isFirstDepthMenu}
      >
        <IconTextWrap>
          <Icon />
          <span>{name}</span>
        </IconTextWrap>
      </AccordionListItem>
    </Link>
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

const AccordionListItem = styled.li<{ isActive?: boolean; isFirstDepthMenu?: boolean }>`
  box-sizing: border-box;
  padding: ${({ isFirstDepthMenu }) => (isFirstDepthMenu ? '8px 10px 8px 4px' : '8px 10px 8px 20px')};
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
