import { useState } from "react";
import { Option } from "../types";
import { OptionsProps } from "./types";

const OptionsSelectOne: React.FC<OptionsProps> = ({
  options,
  isActive = true,
  defaultSelectedOption,
  optionsClickAction,
}: OptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<
    Option | null | undefined
  >(defaultSelectedOption);

  const selectOption = (option: Option) => {
    optionsClickAction(option);
    setSelectedOption(option);
  };

  if (!options) return <></>;

  return (
    <ul>
      {options.map((o) => (
        <li
          className={
            selectedOption && selectedOption.id
              ? selectedOption.id === o.id
                ? "highlighter"
                : "not-highlighter"
              : ""
          }
          key={o.id}
          onClick={() => (isActive ? selectOption(o) : () => {})}
        >
          {o.name}
        </li>
      ))}
    </ul>
  );
};

export default OptionsSelectOne;
