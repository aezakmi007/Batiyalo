import React from 'react';
import { useParams } from 'react-router';
import { Button, Icon, IconButton, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import useModalState from '../../../misc/custom-hooks';
import { auth, database } from '../../../misc/firebase';

function AskFcmBtnModal() {
  const isReceivingFcm = useCurrentRoom(v => v.isReceivingFcm);
  const { chatId } = useParams();
  const { isOpen, close, open } = useModalState();

  const onAccept = () => {
    database
      .ref(`/rooms/${chatId}/fcmUsers`)
      .child(auth.currentUser.uid)
      .set(true);
  };
  const onCancel = () => {
    database
      .ref(`/rooms/${chatId}/fcmUsers`)
      .child(auth.currentUser.uid)
      .remove();
  };

  return (
    <>
      <IconButton
        icon={<Icon icon="podcast" />}
        color="blue"
        size="sm"
        circle
        appearance={isReceivingFcm ? 'default' : 'ghost'}
        onClick={open}
      />

      <Modal show={isOpen} onHide={close} size="xs" backdrop="static">
        <Modal.Header>
          <Modal.Title>Notifications Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isReceivingFcm ? (
            <div classNme="text-center">
              <Icon classNme="text-green mb-3" icon="check-circel" size="5x" />
              <h6>
                You Are subcribed to broadcast messages sent by admins of this
                room
              </h6>
            </div>
          ) : (
            <div className="text-center">
              <Icon
                className="text-blue mb-3"
                icon="question-circle"
                size="5x"
              />
              <h6>
                Do you want to subscribe to messages sent by admins of this Room
              </h6>
            </div>
          )}
          <p className="mt-2">
            To receive notifications make sure you allow notifications to your
            browser
          </p>
          <p>
            Permission :{' '}
            {Notification.permission === 'granted' ? (
              <span className="text-green">Granted</span>
            ) : (
              <span className="text-red">Denied</span>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {isReceivingFcm ? (
            <Button color="green" onClick={onCancel}>
              I changed my mind
            </Button>
          ) : (
            <Button color="green" onClick={onAccept}>
              Yes I do
            </Button>
          )}
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AskFcmBtnModal;
