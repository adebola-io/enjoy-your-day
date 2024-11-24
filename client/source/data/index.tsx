import { CreativityIcon } from '@/components/icons/creativity';
import { FitnessIcon } from '@/components/icons/fitness';
import { GrowthIcon } from '@/components/icons/growth';
import { HobbiesIcon } from '@/components/icons/hobbies';
import { LearningIcon } from '@/components/icons/learning';
import { ProductivityIcon } from '@/components/icons/productivity';
import { IconProps } from '@/components/icons/props';
import { SelfCareIcon } from '@/components/icons/self-care';
import { WellnessIcon } from '@/components/icons/wellness';
import { useLocalStorage } from '@adbl/dom-cells/lib/useLocalStorage';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

/**
 * Reactive reference to the user's name.
 */
export const name = useLocalStorage<string>('username', '');

export type Category = {
  name: string;
  icon: (props: IconProps) => JSX.Template;
  theme: string;
};

export const categories: Category[] = [
  {
    name: 'Wellness',
    icon: (props) => <WellnessIcon {...props} />,
    theme: '#BACBB9',
  },
  {
    name: 'Self-care',
    icon: (props) => <SelfCareIcon {...props} />,
    theme: '#DBB2CB',
  },
  {
    name: 'Creativity',
    icon: (props) => <CreativityIcon {...props} />,
    theme: '#6BF2DC',
  },
  {
    name: 'Productivity',
    icon: (props) => <ProductivityIcon {...props} />,
    theme: '#FFD992',
  },
  {
    name: 'Fitness',
    icon: (props) => <FitnessIcon {...props} />,
    theme: '#7288D7',
  },
  {
    name: 'Learning',
    icon: (props) => <LearningIcon {...props} />,
    theme: '#FF87A2',
  },
  {
    name: 'Growth',
    icon: (props) => <GrowthIcon {...props} />,
    theme: '#96F396',
  },
  {
    name: 'Hobbies',
    icon: (props) => <HobbiesIcon {...props} />,
    theme: '#FF91ED',
  },
];
