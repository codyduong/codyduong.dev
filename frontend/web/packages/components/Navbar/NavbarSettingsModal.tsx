import Modal from 'packages/components/Modal';

interface NavbarSettingsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavbarSettingsModal = ({
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
        id: 'modal-settings',
      }}
      size="large"
    >
      <Modal.Header>Settings</Modal.Header>
      <Modal.Content id="modal-settings-content"></Modal.Content>
    </Modal>
  );
};

export default NavbarSettingsModal;
