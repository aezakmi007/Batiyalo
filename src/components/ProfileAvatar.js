import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../misc/Helper';

function ProfileAvatar({ name, ...avatarProps }) {
  return (
    <Avatar circle {...avatarProps}>
      {getNameInitials(name)}
    </Avatar>
  );
}

export default ProfileAvatar;
