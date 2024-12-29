import { CookingIcon } from '#/components/icons/cooking';
import { FitnessIcon } from '#/components/icons/fitness';
import { MentalHealthIcon } from '#/components/icons/mental-health';
import { ProductivityIcon } from '#/components/icons/productivity';
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
  uuid: string;
  name: string;
  icon: (props: IconProps) => JSX.Template;
  theme: string;
};

export type SendableCategory = Omit<Category, 'icon'>;

export const categories: Category[] = [
  {
    uuid: 'f3380eb1-50f9-4267-be5b-d36b38224ccb',
    name: 'Wellness',
    icon: HeartIcon,
    theme: '#b9f5b6',
  },
  {
    uuid: 'e3387a6a-1c7c-40c7-b0a9-d0c649b97fc2',
    name: 'Arts',
    icon: ArtsIcon,
    theme: '#FFD992',
  },
  {
    uuid: '0863a3f1-cdaa-4c44-b81c-2dc1688512ec',
    name: 'Mental Health',
    icon: MentalHealthIcon,
    theme: '#e9a9d0',
  },
  {
    uuid: 'ae810201-0287-4693-89fa-7baf85250c15',
    name: 'Productivity',
    icon: ProductivityIcon,
    theme: '#91f2ff',
  },
  {
    uuid: '50bea016-e6d9-41ee-81bc-30e052fa3236',
    name: 'Cooking',
    icon: CookingIcon,
    theme: '#6BF2DC',
  },
  {
    uuid: '080f644f-f4c9-4707-b95b-295b52067295',
    name: 'Music',
    icon: MusicIcon,
    theme: '#a3b7ff',
  },
  {
    uuid: 'aebc34b3-c27c-4ebd-93e3-55ea0ec371bd',
    name: 'Literature',
    icon: LiteratureIcon,
    theme: '#FF87A2',
  },
  {
    uuid: '11aea0c0-833a-49f4-b476-047d55ecb081',
    name: 'Digital Design',
    icon: DigitalDesignIcon,
    theme: '#96F396',
  },
  {
    uuid: 'd20ddac4-0f86-46bb-aae1-68f32ed9ce0b',
    name: 'Nature',
    icon: NatureIcon,
    theme: '#FF91ED',
  },
  {
    uuid: '31eadc4c-9e8a-45f5-a359-8bdc8c77c8e6',
    name: 'Culture',
    icon: GlobeIcon,
    theme: '#DBB2CB',
  },
  {
    uuid: '63d65083-7c4c-4788-9e15-9ee4c1536f98',
    name: 'Profession',
    icon: BriefcaseIcon,
    theme: '#6BF2DC',
  },
  {
    uuid: '4cbda9bd-2a21-47e8-bb30-9cf64fd5b7de',
    name: 'Home Care',
    icon: HomeCareIcon,
    theme: '#FFD992',
  },
  {
    uuid: '210004f4-483a-4c7e-bb24-78f688388e15',
    name: 'Style',
    icon: HangerIcon,
    theme: '#b2e9f9',
  },
  {
    uuid: '193bedec-9eef-41bd-ae60-a5844bff2315',
    name: 'Finance',
    icon: PiggyBankIcon,
    theme: '#FF87A2',
  },
  {
    uuid: 'e0f0c8a0-c7e7-4f8f-b0d0-a8c0b1c3c1f7',
    name: 'Fun',
    icon: DancingIcon,
    theme: '#96F396',
  },
  {
    uuid: 'b3914b4c-b478-473b-bf93-6a7aa4cf1d4b',
    name: 'Games',
    icon: GamesIcon,
    theme: '#BACBB9',
  },
  {
    uuid: '4404226c-f2f7-460b-9015-05535259717f',
    name: 'Social Connection',
    icon: SocialConnectionIcon,
    theme: '#94e4d6',
  },
  {
    uuid: '07a7cf24-9631-4d61-b996-635240a15392',
    name: 'Photography',
    icon: CameraIcon,
    theme: '#FF91ED',
  },
  {
    uuid: '4913f1fa-900e-4316-8f3b-7e21f0109839',
    name: 'Sports',
    icon: RugbyBallIcon,
    theme: '#DBB2CB',
  },
  {
    uuid: '487aeb86-c09e-4a8f-a812-5a98ab89f769',
    name: 'Volunteering',
    icon: HeartInHandIcon,
    theme: '#6BF2DC',
  },
  {
    uuid: '67ecd6c6-3b59-4ffa-a1fa-63fda1d9b967',
    name: 'Science',
    icon: BeakerIcon,
    theme: '#FFD992',
  },
  {
    uuid: '2dfc9cd0-9b7a-4cec-92e5-513446b5a11a',
    name: 'Technology',
    icon: MicrochipIcon,
    theme: '#7288D7',
  },
  {
    uuid: 'a86594a3-892d-43e2-8217-a6746aa5b6b4',
    name: 'Crafts',
    icon: ScissorsIcon,
    theme: '#FF87A2',
  },
  {
    uuid: '50a42338-5e8a-4f3f-a5c8-6734bbff4a75',
    name: 'Mindfulness',
    icon: LotusIcon,
    theme: '#96F396',
  },
  {
    uuid: '31d97f48-0c7c-424d-aec7-f129cf6f4ad7',
    name: 'Adventure',
    icon: CompassIcon,
    theme: '#FF91ED',
  },
  {
    uuid: 'bff4ca65-2688-4535-920d-ee076bcf1291',
    name: 'Pets',
    icon: PawIcon,
    theme: '#BACBB9',
  },
  {
    uuid: '5434428a-1364-435d-aa09-69fcce3d6b24',
    name: 'Green Living',
    icon: NatureIcon,
    theme: '#DBB2CB',
  },
  {
    uuid: '9b3ced97-ea85-4b6c-85ae-5e4fc4a83a29',
    name: 'Philosophy',
    icon: YinYangIcon,
    theme: '#6BF2DC',
  },
  {
    uuid: '0bd0e999-8568-4b62-bcb4-afe41ca84995',
    name: 'Film',
    icon: ClapperboardIcon,
    theme: '#FFD992',
  },
  {
    uuid: 'e2265443-e29e-4111-922f-6a9710cba0bb',
    name: 'Urban Exploration',
    icon: BuildingsIcon,
    theme: '#7288D7',
  },
  {
    uuid: '6d6e79f0-3eee-4371-ab2a-0fdccfe653af',
    name: 'Storytelling',
    icon: StorytellingIcon,
    theme: '#FF87A2',
  },
  {
    uuid: '920eadfd-f0e0-4967-965b-41ae73b49c16',
    name: 'Fitness',
    icon: FitnessIcon,
    theme: '#96F396',
  },
  {
    uuid: '396229e8-8605-4372-846d-b1e3c0eedb00',
    name: 'Romance',
    icon: HeartAndArrowIcon,
    theme: '#fd5fb7',
  },
  {
    uuid: '57b2e580-a608-4245-a5fd-5af24acac1c5',
    name: 'Travel',
    icon: AirplaneIcon,
    theme: '#DBB2CB',
  },
];
