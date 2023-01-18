import Modal from 'packages/components/Modal';
import Switch from 'packages/components/Switch';
import { useState } from 'react';
import styled from 'styled-components';
import T from 'packages/components/Typography';

const StyledH3 = styled.h3`
  ${T.P3.bold.css}
  margin: 0;
`;

const StyledSwitch = styled(Switch)`
  margin-left: ${({ theme }) => `-${theme.spacing.px[50]}`};
`;

type NavbarSettingChecksKeys = 'disableMotion';

type NavbarSettingsChecks = {
  [K in NavbarSettingChecksKeys]?: boolean;
};

interface NavbarSettingsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarSettingsModal = ({
  open,
  setOpen,
}: NavbarSettingsModalProps): JSX.Element => {
  const [checked, setCheckedObject] = useState<NavbarSettingsChecks>({});

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
        id: 'modal-settings',
      }}
      size="large"
    >
      <Modal.Header>Settings</Modal.Header>
      <Modal.Content id="modal-settings-content">
        <StyledH3>Accessibility Options</StyledH3>
        <StyledSwitch
          label="Disable motion animation"
          checked={checked['disableMotion']}
          setChecked={setChecked('disableMotion')}
        />
      </Modal.Content>
    </Modal>
  );
};

export default NavbarSettingsModal;
