import { BarChartIcon } from '#/components/icons/bar-chart';
import { CookingIcon } from '#/components/icons/cooking';
import { FitnessIcon } from '#/components/icons/fitness';
import { HomeIcon } from '#/components/icons/home';
import { MentalHealthIcon } from '#/components/icons/mental-health';
import { ProductivityIcon } from '#/components/icons/productivity';
import { ProfileIcon } from '#/components/icons/profile';
import type { IconProps } from '#/components/icons/props';
import { WellnessIcon } from '#/components/icons/wellness';
import { ArtsIcon } from '#/components/icons/arts';
import { MusicIcon } from '#/components/icons/music';
import { LiteratureIcon } from '#/components/icons/literature';
import { DigitalDesignIcon } from '#/components/icons/digital-design';
import { NatureIcon } from '#/components/icons/nature';
import { SocialConnectionIcon } from '#/components/icons/social-connection';
import { GlobeIcon } from '#/components/icons/globe';
import { BriefcaseIcon } from '#/components/icons/briefcase';
import { HomeCareIcon } from '#/components/icons/home-care';
import { HangerIcon } from '#/components/icons/hanger';
import type { JSX } from '@adbl/unfinished/jsx-runtime';

export type Category = {
  name: string;
  icon: (props: IconProps) => JSX.Template;
  theme: string;
};

export const categories: Category[] = [
  {
    name: 'Wellness',
    icon: WellnessIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Mental Health',
    icon: MentalHealthIcon,
    theme: '#DBB2CB',
  },
  {
    name: 'Cooking',
    icon: CookingIcon,
    theme: '#6BF2DC',
  },
  {
    name: 'Arts',
    icon: ArtsIcon,
    theme: '#FFD992',
  },
  {
    name: 'Music',
    icon: MusicIcon,
    theme: '#7288D7',
  },
  {
    name: 'Literature',
    icon: LiteratureIcon,
    theme: '#FF87A2',
  },
  {
    name: 'Digital Design',
    icon: DigitalDesignIcon,
    theme: '#96F396',
  },
  {
    name: 'Nature',
    icon: NatureIcon,
    theme: '#FF91ED',
  },
  {
    name: 'Social Connection',
    icon: SocialConnectionIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Culture',
    icon: GlobeIcon,
    theme: '#DBB2CB',
  },
  {
    name: 'Profession',
    icon: BriefcaseIcon,
    theme: '#6BF2DC',
  },
  {
    name: 'Home Care',
    icon: HomeCareIcon,
    theme: '#FFD992',
  },
  {
    name: 'Style',
    icon: HangerIcon,
    theme: '#7288D7',
  },
  // {
  //   name: 'Finance',
  //   icon: FinanceIcon,
  //   theme: '#FF87A2',
  // },
  // {
  //   name: 'Fun',
  //   icon: FunIcon,
  //   theme: '#96F396',
  // },
  // {
  //   name: 'Photography',
  //   icon: PhotographyIcon,
  //   theme: '#FF91ED',
  // },
  // {
  //   name: 'Games',
  //   icon: GamesIcon,
  //   theme: '#BACBB9',
  // },
  // {
  //   name: 'Sports',
  //   icon: SportsIcon,
  //   theme: '#DBB2CB',
  // },
  // {
  //   name: 'Volunteering',
  //   icon: VolunteeringIcon,
  //   theme: '#6BF2DC',
  // },
  // {
  //   name: 'Science',
  //   icon: ScienceIcon,
  //   theme: '#FFD992',
  // },
  // {
  //   name: 'Technology',
  //   icon: TechnologyIcon,
  //   theme: '#7288D7',
  // },
  // {
  //   name: 'Crafts',
  //   icon: CraftsIcon,
  //   theme: '#FF87A2',
  // },
  // {
  //   name: 'Mindfulness',
  //   icon: MindfulnessIcon,
  //   theme: '#96F396',
  // },
  // {
  //   name: 'Adventure',
  //   icon: AdventureIcon,
  //   theme: '#FF91ED',
  // },
  // {
  //   name: 'Pets',
  //   icon: PetsIcon,
  //   theme: '#BACBB9',
  // },
  // {
  //   name: 'Green Living',
  //   icon: GreenLivingIcon,
  //   theme: '#DBB2CB',
  // },
  // {
  //   name: 'Philosophy',
  //   icon: PhilosophyIcon,
  //   theme: '#6BF2DC',
  // },
  // {
  //   name: 'Film',
  //   icon: FilmIcon,
  //   theme: '#FFD992',
  // },
  // {
  //   name: 'Urban Exploration',
  //   icon: UrbanExplorationIcon,
  //   theme: '#7288D7',
  // },
  // {
  //   name: 'Storytelling',
  //   icon: StorytellingIcon,
  //   theme: '#FF87A2',
  // },
  {
    name: 'Fitness',
    icon: FitnessIcon,
    theme: '#96F396',
  },
  {
    name: 'Productivity',
    icon: ProductivityIcon,
    theme: '#FF91ED',
  },
  // {
  //   name: 'Romance',
  //   icon: RomanceIcon,
  //   theme: '#BACBB9',
  // },
  // {
  //   name: 'Travel',
  //   icon: TravelIcon,
  //   theme: '#DBB2CB',
  // },
];

export interface NavigationLink {
  name: string;
  path: string;
  icon: (props: IconProps) => JSX.Template;
}

export const navigationBarLinks: NavigationLink[] = [
  {
    name: 'Home',
    path: '/home',
    icon: HomeIcon,
  },
  {
    name: 'Insights',
    path: '/insights',
    icon: BarChartIcon,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: ProfileIcon,
  },
];
