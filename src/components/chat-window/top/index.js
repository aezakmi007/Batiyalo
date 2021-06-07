import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';

import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import AskFcmBtnModal from './AskFcmBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';
import RoomIfoBtmModal from './RoomIfoBtmModal';
import SendFcmBtnModal from './SendFcmBtnModal';

function ChatTop() {
  const name = useCurrentRoom(v => v.name);
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const isMobile = useMediaQuery('(max-width: 992px)');

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-item-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">todo</ButtonToolbar>
        <AskFcmBtnModal />
        {isAdmin && <EditRoomBtnDrawer />}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        {isAdmin && <SendFcmBtnModal />}
        <RoomIfoBtmModal />
      </div>
    </>
  );
}

export default memo(ChatTop);
