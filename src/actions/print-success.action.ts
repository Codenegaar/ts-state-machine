import { Action } from 'src/common/action.interface';
import { States } from 'src/common/states.enum';
import { Triggers } from 'src/common/triggers.enum';

export class PrintSuccess implements Action {
  public exec(currentState: States, nextState: States, trigger: Triggers): void {
    console.log(`Detected an 'a' followed by 2 'b's!`);
  }
}
