import type { SendableCategory } from '../categories';
import type { GoalProps, GoalState } from '../entities';

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
    };
    export type GetExampleSearchGoalInstruction = {
      type: 'goals.search-example';
      selected: string[];
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
    export type Request =
      | Echo<unknown>
      | GetRecommendedGoals
      | Ping
      | GetExampleSearchGoalInstruction
      | GetAutoCompleteSuggestions
      | UpdateGoals
      | RecordGoalState;
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
    : unknown;

  export interface Message<T extends Requests.Request | unknown = unknown> {
    id: string;
    message: T;
  }

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
