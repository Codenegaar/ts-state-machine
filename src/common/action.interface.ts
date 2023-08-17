import { States } from './states.enum';
import { Triggers } from './triggers.enum';

export interface Action {
  exec(currentState: States, nextState: States, trigger: Triggers): void;
}
