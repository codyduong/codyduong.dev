import Modal from 'packages/components/Modal';
import { useState } from 'react';
import styled from 'styled-components';
import T from 'packages/components/Typography';
import { StyledSwitch } from './common';
import ParagraphWidthInput from './ParagraphWidthInput';
import { useAccessibility } from 'packages/mono-app/AccessibilityContext';

const StyledH3 = styled.h3`
  ${T.P3.bold.css}
  margin: 0 0 ${({ theme }) => theme.spacing.px[25]};
`;

type NavbarSettingChecksKeys = 'paragraphWidth';

type NavbarSettingsChecks = {
  [K in NavbarSettingChecksKeys]?: boolean;
};

interface NavbarSettingsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarAccessibleSettingsModal = ({
  open,
  setOpen,
}: NavbarSettingsModalProps): JSX.Element => {
  const {
    disableInteractionAnimations,
    setDisableInteractionAnimations,
    paragraphWidth,
  } = useAccessibility();
  const [checked, setCheckedObject] = useState<NavbarSettingsChecks>({
    paragraphWidth: !!paragraphWidth,
  });

  const setChecked = (s: NavbarSettingChecksKeys) => {
    return (b: boolean) => {
      setCheckedObject((prev) => ({ ...prev, [s]: b }));
    };
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      containerProps={{
        id: 'modal-accessibility-settings',
      }}
      size="large"
    >
      <Modal.Header exitLabel="Close Accessibility Settings">
        Accessibility Options
      </Modal.Header>
      <Modal.Content gap>
        <div>
          <StyledH3>Visual Adjustments</StyledH3>
          <ParagraphWidthInput
            checked={checked['paragraphWidth']}
            setChecked={setChecked('paragraphWidth')}
          />
          {/**
           * WCAG 1.4.8
           * Foreground and background colors selection
           * Line spacing adjustment (paragraph spacing 1.5x line spacing, leading space is 1.5 spaces wide at paragraph start)
           * Text resizing up to 200%
           */}
        </div>
        <div>
          <StyledH3>Orientation</StyledH3>
          <StyledSwitch
            label="Disable Animation from Interactions"
            checked={disableInteractionAnimations}
            setChecked={() => {
              setDisableInteractionAnimations(!disableInteractionAnimations);
            }}
          />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default NavbarAccessibleSettingsModal;
