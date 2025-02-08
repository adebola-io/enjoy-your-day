import type { GoalColor } from '#/library/goal-color';
import type { IconName } from '#/library/icon-name';
import type { SendableCategory } from '../../data/categories';
import type {
  GoalProps,
  GoalState,
  GoalPropsSerialized,
  GoalStateSerialized,
  UserMetadata,
} from '../../data/entities';

export namespace Db {
  export namespace Requests {
    export type Ping = {
      type: 'ping';
    };
    export type Echo<T> = {
      type: 'echo';
      value: T;
    };
    export type GetRecommendedGoals = {
      type: 'goals.today';
      categories: string[];
      preferredInvolvementLevel: number;
    };
    export type GetExampleSearchGoalInstruction = {
      type: 'goals.search-example';
      selected: string[];
      categories: string[];
    };
    export type GetAutoCompleteSuggestions = {
      type: 'goals.autocomplete';
      query: string;
      addedUuids: string[];
      maxResults: number;
    };
    export type UpdateGoals = {
      type: 'goals.update';
      lastLoadedChunk: number;
      latestChunk: number;
      categoryList: Array<SendableCategory>;
    };
    export type RecordGoalState = {
      type: 'goals.record';
      goalStates: GoalStateSerialized[];
      date: string;
    };
    export type GetGoalByUuid = {
      type: 'goals.get';
      uuid: string;
    };
    export type GetInsightsOverview = {
      type: 'insights.overview';
      todaysData: GoalStateSerialized[];
    };
    export type GetInsightsHistory = {
      type: 'insights.history';
      start: string;
      end: string;
    };
    export type RecordMetadata = {
      type: 'metadata.record';
      metadata: UserMetadata;
    };
    export type UpdateUsername = {
      type: 'metadata.update.username';
      username: string;
    };
    export type GetUserUuid = {
      type: 'metadata.uuid';
    };
    export type StoreDeviceToken = {
      type: 'metadata.store.deviceToken';
      deviceToken: string;
    };
    export type GetDeviceToken = {
      type: 'metadata.get.deviceToken';
    };
    export type ResetAllData = {
      type: 'metadata.reset';
    };
    export type Request =
      | Echo<unknown>
      | GetRecommendedGoals
      | Ping
      | GetExampleSearchGoalInstruction
      | GetAutoCompleteSuggestions
      | UpdateGoals
      | RecordGoalState
      | GetGoalByUuid
      | GetInsightsOverview
      | GetInsightsHistory
      | RecordMetadata
      | UpdateUsername
      | GetUserUuid
      | StoreDeviceToken
      | GetDeviceToken
      | ResetAllData;
  }

  export type Response<T extends Requests.Request> = T extends Requests.Ping
    ? 'pong'
    : T extends Requests.Echo<infer U>
    ? U
    : T extends Requests.GetRecommendedGoals
    ? GoalProps[]
    : T extends Requests.GetExampleSearchGoalInstruction
    ? string
    : T extends Requests.GetAutoCompleteSuggestions
    ? GoalProps[]
    : T extends Requests.UpdateGoals
    ? true | { error: string; updateFailedAtChunk: number }
    : T extends Requests.RecordGoalState
    ? boolean | null
    : T extends Requests.GetGoalByUuid
    ? GoalPropsSerialized | null
    : T extends Requests.GetInsightsOverview
    ? InsightsOverview
    : T extends Requests.RecordMetadata
    ? boolean | null
    : T extends Requests.GetInsightsHistory
    ? InsightHistoryDetails
    : T extends Requests.UpdateUsername
    ? boolean | null
    : T extends Requests.GetUserUuid
    ? string
    : T extends Requests.StoreDeviceToken
    ? boolean | null
    : T extends Requests.GetDeviceToken
    ? string | null
    : T extends Requests.ResetAllData
    ? boolean
    : unknown;

  export interface Message<T extends Requests.Request | unknown = unknown> {
    id: string;
    message: T;
  }

  export type Listener = (<T extends Db.Requests.Request>(
    event: MessageEvent<Db.Message<T>>
  ) => void) & {
    handlerMap?: MessageHandlerMap;
  };

  export type Fn = <T extends Db.Requests.Request>(
    message: T
  ) => Promise<Db.Response<T>>;

  export type Handler<T extends Db.Requests.Request> = (
    data: Db.Message<T>
  ) => Promise<Db.Response<T>>;

  type RequestFromType<T> = Requests.Request extends infer V
    ? V extends Requests.Request
      ? T extends V['type']
        ? V
        : never
      : never
    : never;

  export type MessageHandlerMap = {
    [key in Requests.Request['type']]: (
      data: Message<RequestFromType<key>>
    ) => Promise<Response<RequestFromType<key>>>;
  };
}

export interface InsightsOverview {
  userBadge: {
    icon: IconName;
    name: string;
    description: string;
  };
  cards: Array<InsightCardDetails>;
}

export interface InsightCardDetails {
  name: string;
  value: string | number;
  suffix?: string;
  icon: IconName;
  color: GoalColor;
  description: string;
}

export interface InsightHistoryDetails {
  maxChartValue: number;
  chartData: HistoryChartItem[];
}

export interface HistoryChartItem {
  date: string;
  total: number;
  categories: string[];
  completed: GoalState[];
  unfinished: GoalState[];
}
