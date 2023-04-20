import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Tab as HeadlessTab } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

type ExtractProps<T> = T extends React.ComponentType<infer P> ? P : T;
type TabContainerProps = ExtractProps<typeof HeadlessTab.List> & {
  variants?: 'normal' | 'box';
};

export interface TabProps {
  variants?: 'normal' | 'box';
  titleList: string[];
  contentList: ReactNode[];
  defaultIndex?: number;
  onChangeTab?: (index: number) => void;
  className?: string;
}

const Tab = ({
  variants = 'normal',
  titleList = ['내 설정', '전사 설정'],
  contentList = [],
  defaultIndex = 0,
  onChangeTab,
  className,
}: TabProps) => {
  const handleChangeTabIndex = (index: number) => {
    onChangeTab?.(index);
  };

  return (
    <HeadlessTab.Group manual defaultIndex={defaultIndex} onChange={handleChangeTabIndex}>
      <TabContainer variants={variants} className={className}>
        {titleList.map(title => (
          <HeadlessTab key={`${title}`} as={Fragment}>
            {({ selected }) => (
              <TabButton selected={selected} variants={variants}>
                {title}
              </TabButton>
            )}
          </HeadlessTab>
        ))}
      </TabContainer>
      <HeadlessTab.Panels>
        {contentList.map((content, index) => (
          <HeadlessTab.Panel key={`content-${index}`}>{content}</HeadlessTab.Panel>
        ))}
      </HeadlessTab.Panels>
    </HeadlessTab.Group>
  );
};

export default Tab;

const TabContainer = styled(HeadlessTab.List)<TabContainerProps>`
  margin-bottom: ${({ variants }) => variants === 'box' && '15px'};
  border-bottom: ${({ theme, variants }) => variants === 'normal' && `2px solid ${theme.basic.gray[50]}`};
`;

const TabButton = styled.button<{ selected: boolean; variants: 'normal' | 'box' }>`
  :hover {
    color: ${({ theme }) => theme.basic.blue[500]};
  }

  ${({ variants, selected, theme }) => {
    switch (variants) {
      case 'box':
        return css({
          fontSize: '14px',
          backgroundColor: `${selected ? theme.semantic.background.layout : theme.basic.gray[50]}`,
          padding: '6px 28px',
          borderRadius: '2px',
          border: `1px solid ${selected ? theme.basic.blue[500] : 'transparent'}`,
          color: `${selected && theme.basic.blue[500]}`,
        });

      default:
        return css({
          fontSize: '15px',
          marginBottom: '-2px',
          outline: 'none',
          padding: '10px 24px',
          transition: 'border 0.3s ease-in-out',
          color: `${selected ? theme.basic.blue[500] : theme.basic.gray[200]}`,
          borderBottom: `2px solid ${selected ? theme.basic.blue[500] : theme.basic.gray[50]}`,
        });
    }
  }}
`;
