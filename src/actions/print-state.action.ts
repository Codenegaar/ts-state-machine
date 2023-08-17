import { Action } from 'src/common/action.interface';
import { States } from 'src/common/states.enum';
import { Triggers } from 'src/common/triggers.enum';

export class PrintState implements Action {
  public exec(currentState: States, nextState: States, trigger: Triggers): void {
    console.log(`Transited from ${currentState} to ${nextState}`);
  }
}
