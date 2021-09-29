import { useState } from "react";
import { Option } from "../types";
import { OptionItem, OptionList } from "./styles";
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
    <OptionList>
      {options.map((o) => (
        <OptionItem
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
        </OptionItem>
      ))}
    </OptionList>
  );
};

export default OptionsSelectOne;
