import { useState, useEffect } from "react";
import { Option } from "../types";
import { OptionItem, OptionList } from "./styles";
import { OptionsProps } from "./types";

const OptionsSelectOne: React.FC<OptionsProps> = ({
  options,
  isActive = true,
  wrongOptionSelected,
  defaultSelectedOption,
  optionsClickAction,
}: OptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<
    Option | null | undefined
  >(defaultSelectedOption);

  useEffect(() => {
    setSelectedOption(defaultSelectedOption);
  }, [options, defaultSelectedOption]);

  const selectOption = (option: Option) => {
    optionsClickAction(option);
    setSelectedOption(option);
  };

  if (!options) return <></>;

  return (
    <OptionList>
      {options.map((o) => (
        <OptionItem
          wrongOption={
            wrongOptionSelected === true && selectedOption?.id === o.id
          }
          className={
            selectedOption && selectedOption.id
              ? selectedOption.id === o.id
                ? "highlighter"
                : "not-highlighter"
              : isActive
              ? ""
              : "not-highlighter"
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
