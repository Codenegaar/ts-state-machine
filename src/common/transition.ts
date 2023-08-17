import { Action } from './action.interface';
import { States } from './states.enum';
import { Triggers } from './triggers.enum';

export class Transition {
  public from!: States;
  public to!: States;
  public trigger!: Triggers;
  public action?: Action;
}
