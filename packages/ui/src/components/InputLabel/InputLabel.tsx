import Input, { InputProps } from "../Input/Input";
import { Label } from "../Label";
import { LabelProps } from "../Label/Label";

export interface InputLabelProps {
  labelProps: Omit<LabelProps, "children">;
  inputProps: InputProps;
}

const InputLabel = ({ labelProps, inputProps }: InputLabelProps) => {
  return (
    <Label {...labelProps}>
      <Input {...inputProps} />
    </Label>
  );
};

export default InputLabel;
