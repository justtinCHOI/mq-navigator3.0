import Map from '@components/Map';
import PlayList from '@components/PlayList';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';

import { Button, Input, Label } from '@pages/member/SignUp/styles';
import gravatar from 'gravatar';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Link, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import useCustomMember from '@hooks/useCustomMember';
import { postCreateWorkspace } from '@api/workspaceApi';
import { IWorkspace } from '@typings/db';

const BasicLayout = () => {
  const params = useParams<{ workspaceUrl?: string }>();
  const { workspaceUrl } = params;
  const { memberState } = useCustomMember();

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);

  const { doLogout, moveToPath } = useCustomMember();

  const handleClickLogout = () => {
    doLogout();
    alert('로그아웃되었습니다.');
    moveToPath('/');
  };

  const onCreateWorkspace = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) {
        return;
      }
      if (!newUrl || !newUrl.trim()) {
        return;
      }
      const workspaceCreateParam = {
        workspace: newWorkspace,
        url: newUrl,
      };
      postCreateWorkspace(workspaceCreateParam)
        .then(() => {
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newWorkspace, newUrl, setNewWorkspace, setNewUrl],
  );

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowInviteWorkspaceModal(false);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  }, []);

  if (memberState === false) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div>
      <Header>
        {memberState && (
          <RightMenu>
            <span onClick={onClickUserProfile}>
              <ProfileImg src={gravatar.url(memberState.email, { s: '28px', d: 'retro' })} alt={memberState.nickname} />
            </span>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(memberState.email, { s: '36px', d: 'retro' })} alt={memberState.nickname} />
                  <div>
                    <span id="profile-name">{memberState.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={handleClickLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </RightMenu>
        )}
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {memberState?.Workspaces.map((ws: IWorkspace) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <Map />
          <PlayList />
        </Channels>
        <Chats>
          <WorkspaceName onClick={toggleWorkspaceModal}>
            {memberState?.Workspaces.find((v: IWorkspace) => v.url === workspaceUrl)?.name}
          </WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>{memberState?.Workspaces.find((v: IWorkspace) => v.url === workspaceUrl)?.name}</h2>
                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                <button onClick={handleClickLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
          </MenuScroll>
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <ToastContainer position="bottom-center" />
    </div>
  );
};
export default BasicLayout;
