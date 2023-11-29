import styled from "styled-components";

const GroupAvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
`;

const GroupAvatar = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
`;

const AvatarLabel = styled.label`

`;

const AvatarImg = styled.img`
    display: flex;
    width: 100px;
    height:100px;
    cursor: pointer;
`;

export {GroupAvatarContainer, GroupAvatar, AvatarLabel, AvatarImg};