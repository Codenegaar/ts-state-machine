# Introduction

I had an idea of implementing a state machine using TypeScript and
here is the result. It's a pretty simple state machine that detects an 'a'
followed by two 'b's. It can be applied to any state machine.

# How to run

- First, make sure you have Node.js version 18+.

- Clone the repo:

`git clone https://github.com/Codenegaar/ts-state-machine.git`

- Install dependencies:

```
cd ts-state-machine
npm i
```

- Build and run

```
npm run build
npm start
```

- Write an input and get a response!

# Structure and modification

A state machine consists of:

- States: Defined in `src/common/states.enum.ts`
- Triggers: Events that cause the state machine to react, defined at `src/common/triggers.enum.ts`
- Actions: Optional, reusable logic to perform when a transition from state `A` to state `B` occurs. Actions are classes which implement the action interface found at `src/common/action.interface.ts`

To construct your state machine, create your states and triggers enums
(or modify the existing ones) and create your actions if needed.
Instantiate the `StateMachine` class with an initial state.
Then add the transitions (see `src/common/transition.ts`) and call the
`handleTrigger` method of the state machine whenever you need.
For example on an API call, a job scheduler handler, an interval or whatever.
