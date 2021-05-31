import React from 'react';
import { Modal } from 'rsuite';
import useModalState from '../../../misc/custom-hooks';

function ImageBtnModal({ src, filename }) {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <input
        type="image"
        src={src}
        alt="file"
        onClick={open}
        className="mw-100 mh-100 w-auto"
      />
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{filename}</Modal.Title>
        </Modal.Header>
        <Modal.Boady>
          <div>
            <img src={src} height="100%" width="100%" alt="file" />
          </div>
        </Modal.Boady>
        <Modal.Footer>
          <a href={src} target="blank" rel="noopener noreferre">
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageBtnModal;
