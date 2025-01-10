import type { GoalColor } from '#/library/goal-color';
import type { IconName } from '#/library/icon-name';
import type { SendableCategory } from '../categories';
import type { GoalProps, GoalState, UserMetadata } from '../entities';

export namespace WorkerProtocol {
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
    };
    export type UpdateGoals = {
      type: 'goals.update';
      lastLoadedChunk: number;
      latestChunk: number;
      categoryList: Array<SendableCategory>;
    };
    export type RecordGoalState = {
      type: 'goals.record';
      goalStates: GoalState[];
      date: string;
    };
    export type GetInsightsOverview = {
      type: 'insights.overview';
      todaysData: GoalState[];
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
    export type Request =
      | Echo<unknown>
      | GetRecommendedGoals
      | Ping
      | GetExampleSearchGoalInstruction
      | GetAutoCompleteSuggestions
      | UpdateGoals
      | RecordGoalState
      | GetInsightsOverview
      | GetInsightsHistory
      | RecordMetadata;
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
    ? boolean | null
    : T extends Requests.RecordGoalState
    ? boolean | null
    : T extends Requests.GetInsightsOverview
    ? InsightsOverview
    : T extends Requests.RecordMetadata
    ? boolean | null
    : T extends Requests.GetInsightsHistory
    ? InsightHistoryDetails
    : unknown;

  export interface Message<T extends Requests.Request | unknown = unknown> {
    id: string;
    message: T;
  }

  export type Handler<T extends WorkerProtocol.Requests.Request> = (
    data: WorkerProtocol.Message<T>
  ) => Promise<WorkerProtocol.Response<T>>;

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

export interface PromiseHandler {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  resolve: Function;
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  reject: Function;
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
