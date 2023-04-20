'use client';

import ChevronUp from '@/icons/ChevronUp';
import Setting from '@/icons/Setting';
import classNames from 'classnames';
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
const Accordion = () => {
  const id = useId();
  const [activeMenu, setActiveMenu] = useState('');
  const handleClickMenu = (name: string) => {
    setActiveMenu(name);
  };

  return (
    <aside className="fixed left-0 top-[60px] z-10 bottom-0 shrink-0 no-select w-64 bg-slate-300 text-gray-400 text-base p-5">
      <ul>
        {LNBRoutes.map((route, index) => {
          if ('menus' in route) {
            return (
              <AccordionList
                key={`${id}_${index}`}
                {...route}
                activeMenu={activeMenu}
                handleClickMenu={handleClickMenu}
              />
            );
          }
          return (
            <AccordionItem
              key={`${id}_${index}`}
              {...route}
              isActive={activeMenu === route.name}
              handleClickMenu={handleClickMenu}
              isFirstDepthMenu
            />
          );
        })}
      </ul>
    </aside>
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

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <li>
      <div className="pl-2 py-2 pr-3 cursor-pointer" onClick={handleToggleMenu}>
        <div>
          <ChevronUp className="transition-all rotate-180" />
          <span>{name}</span>
        </div>
      </div>
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
  isFirstDepthMenu = false,
}: Menu & { isActive: boolean; handleClickMenu: (name: string) => void; isFirstDepthMenu?: boolean }) {
  const Icon = icon ?? Setting;
  const paddingRight = isFirstDepthMenu ? 'pr-3' : 'pr-6';
  const active = classNames({ active: isActive });

  console.log(active, isActive);

  return (
    <li
      className={`pl-2  pt-2 pb-1 pr-3 ${paddingRight}  hover:bg-white ${active} `}
      onClick={() => handleClickMenu(name)}
    >
      <Link href={to}>
        <div className="flex items-center gap-3">
          <Icon />
          <span>{name}</span>
        </div>
      </Link>
    </li>
  );
}

// const Container = styled.aside`
//   width: 250px;
//   background-color: #eff4fc;
//   color: #676767;
//   font-size: 15px;
//   padding: 20px;
//   ul,
//   li {
//     list-style: none;
//   }
// `;

// const AccordionListTitle = styled.div<{ isOpen?: boolean }>`
//   padding: 8px 10px 8px 8px;
//   cursor: pointer;
//   svg {
//     transition: 0.2s all;
//     transition-duration: 0.2s;
//     ${({ isOpen }) =>
//       isOpen &&
//       css`
//         transform: rotate(180deg);
//       `}
//   }
// `;

// const AccordionListItem = styled.li<{ isActive?: boolean; isFirstDepthMenu?: boolean }>`
//   padding: ${({ isFirstDepthMenu }) => (isFirstDepthMenu ? '8px 10px 8px 4px' : '8px 10px 8px 20px')};
//   &:hover {
//     background-color: white;
//   }
//   ${({ isActive }) =>
//     isActive &&
//     css`
//       color: #056ac9;
//       background-color: #dae8f8;
//       font-weight: bold;

//       svg {
//         path {
//           fill: #056ac9;
//         }
//       }
//     `}
// `;

// const IconTextWrap = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

export default Accordion;
