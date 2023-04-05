// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Input> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const FirstStory: Story = {
  args: {
    value: '입력',
    //👇 The args you need here will depend on your component
  },
};
