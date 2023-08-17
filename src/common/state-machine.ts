import { Action } from './action.interface';
import { States } from './states.enum';
import { Transition } from './transition';
import { Triggers } from './triggers.enum';

export class StateMachine {
  private _transitions: Transition[] = [];
  private _state!: States;

  public constructor(initialState: States) {
    this._state = initialState;
  }

  /**
   * Add a new transition. If a transition with the same
   * `from` and `trigger` exists, it is replaced.
   * @param transition Transition to add
   */
  public addTransition(transition: Transition): void {
    //Check if a transition with the same source and same trigger exists
    let replaced = false;
    this._transitions.forEach((mTransition, index) => {
      if (mTransition.from === transition.from && mTransition.trigger === transition.trigger) {
        //Replace
        this._transitions[index] = transition;
        replaced = true;
        return;
      }
    });

    if (!replaced) {
      this._transitions.push(transition);
    }
  }

  /**
   * Handles a trigger. This function can be called at an
   * HTTP route handler, an event listener, manually or
   * however you like.
   * @param trigger The trigger that has to be handled
   */
  public handleTrigger(trigger: Triggers): void {
    for (const transition of this._transitions) {
      if (transition.from === this._state && transition.trigger === trigger) {
        if (transition.action) {
          transition.action.exec(this._state, transition.to, trigger);
        }
        this._state = transition.to;
        break;
      }
    }
  }
}
