import Map from '@components/Map';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';

import { Button, Input, Label } from '@pages/member/SignUp/styles';
import gravatar from 'gravatar';
import React, { useCallback, useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

import {
  AddButton,
  CenterDiv,
  Header,
  LogOutButton,
  ProfileImg,
  ProfileModal,
  RightDiv,
  RightMenu,
  WorkspaceButton,
  Workspaces,
  WorkspaceWrapper,
} from './styles';
import useCustomMember from '@hooks/useCustomMember';
import { postCreateWorkspace } from '@api/workspaceApi';
import Playbar from '@components/Playbar';
import { IWorkspace } from '@typings/db';

const BasicLayout = () => {
  const { isLogin, memberState } = useCustomMember();
  const { doLogout, moveToPath } = useCustomMember();

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);

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
        name: newWorkspace,
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

  const handleClickLogout = () => {
    doLogout();
    alert('로그아웃되었습니다.');
    moveToPath('/');
  };

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
  }, []);

  if (!memberState) {
    return <Navigate to="/member/login" />;
  }
  return (
    <div>
      <Header>
        {isLogin && memberState && (
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
          {memberState?.workspaces?.map((ws: IWorkspace) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          {/*</Link>*/}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <CenterDiv>
          <Map />
          <Playbar />
        </CenterDiv>
        <RightDiv>
          <Outlet />
        </RightDiv>
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
      <ToastContainer position="bottom-center" />
    </div>
  );
};
export default BasicLayout;
