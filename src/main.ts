import { PrintState } from './actions/print-state.action';
import { PrintSuccess } from './actions/print-success.action';
import { StateMachine } from './common/state-machine';
import { States } from './common/states.enum';
import { Triggers } from './common/triggers.enum';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

function initTransitions(stateMachine: StateMachine) {
  const printStateAction = new PrintState();
  const printSuccessAction = new PrintSuccess();

  stateMachine.addTransition({
    from: States.LAMBDA,
    to: States.LAMBDA,
    trigger: Triggers.READ_B,
    action: printStateAction,
  });
  stateMachine.addTransition({
    from: States.LAMBDA,
    to: States.A_SEEN,
    trigger: Triggers.READ_A,
    action: printStateAction,
  });

  stateMachine.addTransition({
    from: States.A_SEEN,
    to: States.A_SEEN,
    trigger: Triggers.READ_A,
    action: printStateAction,
  });
  stateMachine.addTransition({
    from: States.A_SEEN,
    to: States.B_SEEN_ONCE,
    trigger: Triggers.READ_B,
    action: printStateAction,
  });

  stateMachine.addTransition({
    from: States.B_SEEN_ONCE,
    to: States.A_SEEN,
    trigger: Triggers.READ_A,
    action: printStateAction,
  });
  stateMachine.addTransition({
    from: States.B_SEEN_ONCE,
    to: States.B_SEEN_TWICE,
    trigger: Triggers.READ_B,
    action: printSuccessAction,
  });

  stateMachine.addTransition({
    from: States.B_SEEN_TWICE,
    to: States.LAMBDA,
    trigger: Triggers.READ_B,
    action: printStateAction,
  });
  stateMachine.addTransition({
    from: States.B_SEEN_TWICE,
    to: States.A_SEEN,
    trigger: Triggers.READ_A,
    action: printStateAction,
  });
}

async function readInput(rl: readline.Interface, stateMachine: StateMachine): Promise<boolean> {
  let answer = await rl.question('Enter a character: ');
  answer = answer.toLowerCase();
  if (answer == 'q') {
    return false;
  }

  if (answer.length > 1 || (answer != 'a' && answer != 'b')) {
    console.log('Invalid input');
    return true;
  }

  if (answer == 'a') {
    stateMachine.handleTrigger(Triggers.READ_A);
  } else {
    stateMachine.handleTrigger(Triggers.READ_B);
  }
  return true;
}

async function main() {
  const stateMachine = new StateMachine(States.LAMBDA);
  initTransitions(stateMachine);

  const rl = readline.createInterface( { input, output });

  console.log('Enter Q to exit');
  while ((await readInput(rl, stateMachine))) {}
  rl.close();
}

main();

