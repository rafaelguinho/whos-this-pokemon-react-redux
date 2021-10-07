import { Option } from "../types";

export interface OptionsProps {
  options: Option[] | null;
  defaultSelectedOption?: Option | null;
  isActive?: boolean;
  wrongOptionSelected?: boolean | null;
  optionsClickAction: Function;
}
