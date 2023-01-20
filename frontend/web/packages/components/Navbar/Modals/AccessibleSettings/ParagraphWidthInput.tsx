import { StyledSwitch } from './common';

interface ParagraphWidthInputProps {
  checked: boolean | undefined;
  setChecked: React.Dispatch<boolean>;
}

const ParagraphWidthInput = ({
  checked,
  setChecked,
}: ParagraphWidthInputProps): JSX.Element => {
  return (
    <>
      <StyledSwitch
        label="Limit Paragraph Width"
        checked={checked}
        setChecked={setChecked}
        aria-controls="paragraph-width"
      />
      <label htmlFor="paragraph-width-input">Paragraph Width: </label>
      <input inputMode="numeric" id="paragraph-width-input" />
    </>
  );
};

export default ParagraphWidthInput;
