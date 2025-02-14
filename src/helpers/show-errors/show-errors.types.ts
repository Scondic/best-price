import { ZodFormattedError } from "zod";

export type ClearErrorsProps = {
  element: HTMLElement
}
export type ClearErrorsReturn = void;
export type ClearErrors = (props: ClearErrorsProps) => ClearErrorsReturn;

export type ShowErrorsProps<Form extends any> = {
  errors?: ZodFormattedError<Form>
  element: HTMLElement
}
export type ShowErrorsReturn = HTMLSpanElement | null;
export type ShowErrors = <Form extends any>(props: ShowErrorsProps<Form>) => ShowErrorsReturn;
