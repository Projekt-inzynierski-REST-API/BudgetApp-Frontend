import React from 'react'
import { useState } from 'react'
import { GroupAvatar, GroupAvatarContainer, AvatarImg, AvatarLabel } from './AvatarUploader.style';

export const AvatarUploader = () => {

  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(URL.createObjectURL(file));
    // onAvatarChange(file);
  }

  return (
    <GroupAvatarContainer>
      {avatar ? (
        <GroupAvatar src={avatar} alt="Group Avatar"/>
      ) : (
        <AvatarLabel htmlFor="avatarInput">
          <AvatarImg src='/images/avatar/avatar.png' alt='avatar' />
          <input id="avatarInput" type="file" accept='image/*' onChange={handleAvatarChange} style={{display: 'none'}} />
        </AvatarLabel>
      )}
    </GroupAvatarContainer>
  )
}