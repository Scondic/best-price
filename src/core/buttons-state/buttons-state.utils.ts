import { State } from "./buttons-state.types";

let state: State = State.NEW;

const buttonNewState = document.querySelector('#new-state') as HTMLButtonElement;
const buttonUsedState = document.querySelector('#used-state') as HTMLButtonElement;
const buttonsState = document.querySelector('#advertisement-buttons') as HTMLDivElement;

function updateButtons() {
  if (state === State.NEW) {
    buttonNewState.classList.add("button-secondary");
    buttonNewState.classList.remove("button-outline");
    buttonUsedState.classList.add("button-outline");
    buttonUsedState.classList.remove("button-secondary");
  } else {
    buttonUsedState.classList.add("button-secondary");
    buttonUsedState.classList.remove("button-outline");
    buttonNewState.classList.add("button-outline");
    buttonNewState.classList.remove("button-secondary");
  }
}

buttonNewState.addEventListener("click", () => {
  state = State.NEW;
  updateButtons();
});

buttonUsedState.addEventListener("click", () => {
  state = State.USED;
  updateButtons();
});

export { buttonNewState, buttonUsedState, buttonsState, state };
