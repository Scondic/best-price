import { ClearErrors, ShowErrors } from "./show-errors.types.ts";

const clearErrors: ClearErrors = ({ element }) => {
  element?.parentNode?.querySelectorAll("span.typography-caption.typography-red")
  .forEach((targetElement) => {
    if (targetElement.previousElementSibling === element) {
      targetElement.remove();
    }
  });
};

export const showErrors: ShowErrors = ({ errors, element }) => {
  clearErrors({ element });

  if (!errors || !errors._errors.length) {
    return null;
  }


  const component = document.createElement("span");
  component.className = "typography-caption typography-red";
  component.innerHTML = errors._errors.join("<br>") || '';

  element.after(component);

  return component;
};
