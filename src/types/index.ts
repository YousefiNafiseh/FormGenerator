export enum ElementType {
  Text = "text",
  Checkbox = "checkbox",
  Select = "select",
  Radio = "radio",
}

export interface Element {
  type: ElementType;
  name: string;
  choices?: string[];
  requiredIf?: string;
  visibleIf?: string;
  editableIf?: string;
}

export interface Page {
  id?: string;
  name: string;
  elements: Element[];
}
