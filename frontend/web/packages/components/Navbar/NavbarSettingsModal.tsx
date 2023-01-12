import loadable from 'packages/components/SpinkitLoadable';
import type { default as ModalType } from 'packages/components/Modal';

const Modal = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/components/Modal'),
  { ssr: false }
) as unknown as typeof ModalType;

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
