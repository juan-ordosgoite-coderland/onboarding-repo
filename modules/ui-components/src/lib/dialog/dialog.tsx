import { Dialog } from '@base-ui/react/dialog';
import './dialog.css';

interface CustomDialogProps {
  children: React.ReactNode;
}

export function MyDialog({ children }: CustomDialogProps) {
  return <Dialog.Root>{children}</Dialog.Root>;
}

MyDialog.Trigger = function MyDialogTrigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
};

MyDialog.Portal = function MyDialogPortal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="dialog-backdrop">
        {children}
      </Dialog.Backdrop>
    </Dialog.Portal>
  );
};

MyDialog.Popup = function MyDialogPopup({ children }: { children: React.ReactNode }) {
  return <Dialog.Popup className="dialog-popup">{children}</Dialog.Popup>;
};

MyDialog.Title = function MyDialogTitle({ children }: { children: React.ReactNode }) {
  return <Dialog.Title className="dialog-title">{children}</Dialog.Title>;
};

MyDialog.Description = function MyDialogDescription({ children }: { children: React.ReactNode }) {
  return <Dialog.Description className="dialog-description">{children}</Dialog.Description>;
};

MyDialog.Close = function MyDialogClose({ children }: { children: React.ReactNode }) {
  return <Dialog.Close className="dialog-close">{children}</Dialog.Close>;
};