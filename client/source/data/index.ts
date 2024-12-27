import { BarChartIcon } from '#/components/icons/bar-chart';
import { CookingIcon } from '#/components/icons/cooking';
import { FitnessIcon } from '#/components/icons/fitness';
import { HomeIcon } from '#/components/icons/home';
import { MentalHealthIcon } from '#/components/icons/mental-health';
import { ProductivityIcon } from '#/components/icons/productivity';
import { ProfileIcon } from '#/components/icons/profile';
import { LotusIcon } from '#/components/icons/lotus';
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
import { PiggyBankIcon } from '#/components/icons/piggy-bank';
import { DancingIcon } from '#/components/icons/dancing';
import { CameraIcon } from '#/components/icons/camera';
import { GamesIcon } from '#/components/icons/games';
import { RugbyBallIcon } from '#/components/icons/rugby-ball';
import { HeartInHandIcon } from '#/components/icons/heart-in-hand';
import { BeakerIcon } from '#/components/icons/beaker';
import { MicrochipIcon } from '#/components/icons/microchip';
import { CompassIcon } from '#/components/icons/compass';
import { PawIcon } from '#/components/icons/paw';
import { ClapperboardIcon } from '#/components/icons/clapperboard';
import { YinYangIcon } from '#/components/icons/yinyang';
import { StorytellingIcon } from '#/components/icons/storytelling';
import { ScissorsIcon } from '#/components/icons/scissors';
import { BuildingsIcon } from '#/components/icons/buildings';
import { HeartAndArrowIcon } from '#/components/icons/heart-and-arrow';
import { AirplaneIcon } from '#/components/icons/airplane';
import type { IconProps } from '#/components/icons/props';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { HeartIcon } from '#/components/icons/heart';

export type Category = {
  name: string;
  icon: (props: IconProps) => JSX.Template;
  theme: string;
};

export const categories: Category[] = [
  {
    name: 'Wellness',
    icon: HeartIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Arts',
    icon: ArtsIcon,
    theme: '#FFD992',
  },
  {
    name: 'Mental Health',
    icon: MentalHealthIcon,
    theme: '#DBB2CB',
  },
  {
    name: 'Productivity',
    icon: ProductivityIcon,
    theme: '#FF91ED',
  },
  {
    name: 'Cooking',
    icon: CookingIcon,
    theme: '#6BF2DC',
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
  {
    name: 'Finance',
    icon: PiggyBankIcon,
    theme: '#FF87A2',
  },
  {
    name: 'Fun',
    icon: DancingIcon,
    theme: '#96F396',
  },
  {
    name: 'Games',
    icon: GamesIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Social Connection',
    icon: SocialConnectionIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Photography',
    icon: CameraIcon,
    theme: '#FF91ED',
  },
  {
    name: 'Sports',
    icon: RugbyBallIcon,
    theme: '#DBB2CB',
  },
  {
    name: 'Volunteering',
    icon: HeartInHandIcon,
    theme: '#6BF2DC',
  },
  {
    name: 'Science',
    icon: BeakerIcon,
    theme: '#FFD992',
  },
  {
    name: 'Technology',
    icon: MicrochipIcon,
    theme: '#7288D7',
  },
  {
    name: 'Crafts',
    icon: ScissorsIcon,
    theme: '#FF87A2',
  },
  {
    name: 'Mindfulness',
    icon: LotusIcon,
    theme: '#96F396',
  },
  {
    name: 'Adventure',
    icon: CompassIcon,
    theme: '#FF91ED',
  },
  {
    name: 'Pets',
    icon: PawIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Green Living',
    icon: NatureIcon,
    theme: '#DBB2CB',
  },
  {
    name: 'Philosophy',
    icon: YinYangIcon,
    theme: '#6BF2DC',
  },
  {
    name: 'Film',
    icon: ClapperboardIcon,
    theme: '#FFD992',
  },
  {
    name: 'Urban Exploration',
    icon: BuildingsIcon,
    theme: '#7288D7',
  },
  {
    name: 'Storytelling',
    icon: StorytellingIcon,
    theme: '#FF87A2',
  },
  {
    name: 'Fitness',
    icon: FitnessIcon,
    theme: '#96F396',
  },
  {
    name: 'Romance',
    icon: HeartAndArrowIcon,
    theme: '#BACBB9',
  },
  {
    name: 'Travel',
    icon: AirplaneIcon,
    theme: '#DBB2CB',
  },
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
