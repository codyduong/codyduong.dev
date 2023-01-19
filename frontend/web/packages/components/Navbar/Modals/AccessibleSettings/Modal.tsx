import Modal from 'packages/components/Modal';
import Switch from 'packages/components/Switch';
import { useState } from 'react';
import styled from 'styled-components';
import T from 'packages/components/Typography';

const StyledH3 = styled.h3`
  ${T.P3.bold.css}
  margin: 0 0 ${({ theme }) => theme.spacing.px[25]};
`;

const StyledSwitch = styled(Switch)`
  margin-left: ${({ theme }) => `-${theme.spacing.px[50]}`};
`;

type NavbarSettingChecksKeys = 'disableMotion' | 'paragraphWidth';

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
      {() => {
        const [checked, setCheckedObject] = useState<NavbarSettingsChecks>({});

        const setChecked = (s: NavbarSettingChecksKeys) => {
          return (b: boolean) => {
            setCheckedObject((prev) => ({ ...prev, [s]: b }));
          };
        };

        return (
          <>
            <Modal.Header exitLabel="Close Accessibility Settings">
              Accessibility Options
            </Modal.Header>
            <Modal.Content gap>
              <div>
                <StyledH3>Visual Adjustments</StyledH3>
                <StyledSwitch
                  label="Limit Paragraph Width"
                  checked={checked['paragraphWidth']}
                  setChecked={setChecked('paragraphWidth')}
                  aria-controls="paragraph-width"
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
                  checked={checked['disableMotion']}
                  setChecked={setChecked('disableMotion')}
                />
              </div>
            </Modal.Content>
          </>
        );
      }}
    </Modal>
  );
};

export default NavbarAccessibleSettingsModal;
