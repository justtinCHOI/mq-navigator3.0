import Map from '@components/Map';
import Menu from '@components/Menu';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';

import { Button, Input, Label } from '@pages/member/SignUp/styles';
import gravatar from 'gravatar';
import React, { useCallback, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
import Playbar from '@components/Playbar';
import { IWorkspace } from '@typings/db';
import { ContentLineText, ContentRow, RightContent } from '@components/Playbar/styles';
import useCustomPlaybar from '@hooks/useCustomPlaybar';
import { InfoDiv } from '@components/Map/styles';
import { AxiosError } from 'axios';
import useCustomWorkspace from '@hooks/useCustomWorkspace';

const BasicLayout = () => {
  const { isLogin, memberState, doLogout, deleteSlices, moveToPath } = useCustomMember();
  const { playbarState } = useCustomPlaybar();
  const { currentTime, selectedTime, selectedPoint } = playbarState;
  const { postCreateWorkspaceAsyncHook } = useCustomWorkspace();

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');
  const [nameConflict, setNameConflict] = useState(false);
  const [urlConflict, setUrlConflict] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);

  const onCreateWorkspace = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      try {
        const response = await postCreateWorkspaceAsyncHook({ name: newWorkspace, url: newUrl });
        setShowCreateWorkspaceModal(false);
        setNewWorkspace('');
        setNewUrl('');
        setNameConflict(false);
        setUrlConflict(false);
        toast.success('Workspace created successfully', {
          closeOnClick: true,
          onClose: () => moveToPath(`/${response.url}`),
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 409) {
          const errorMessage = axiosError.response?.data as string;
          if (errorMessage.includes('name')) {
            setNameConflict(true);
          } else if (errorMessage.includes('url')) {
            setUrlConflict(true);
          }
          toast.error('Workspace name or URL already exists. Please choose a different one.');
        } else {
          toast.error('Failed to create workspace');
        }
      }
    },
    [moveToPath, newUrl, newWorkspace, postCreateWorkspaceAsyncHook, setNewUrl, setNewWorkspace],
  );

  const handleClickLogout = useCallback(async () => {
    try {
      await doLogout();
      await deleteSlices();
      toast.success('Logged out successfully', {
        closeOnClick: true,
      });
      setShowUserMenu((prev) => !prev);
      moveToPath('/');
    } catch (error) {
      toast.error('Failed to log out', { position: 'bottom-center' });
    }
  }, [doLogout, deleteSlices, moveToPath]);

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
      <InfoDiv>
        <ContentRow>
          <RightContent className={'whiteFont margin0 padding0'}>
            <ContentLineText className={'whiteFont margin0 padding0'}>currentTime : [{currentTime}]</ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>selectedTime : [{selectedTime}]</ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              selectedTraveledDistance : [{selectedPoint?.traveledDistance}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              selectedLatitude : [{selectedPoint?.coordinate?.latitude}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              selectedLongitude : [{selectedPoint?.coordinate?.longitude}]
            </ContentLineText>
          </RightContent>
          <RightContent className={'whiteFont margin0 padding0'}>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              firstGate : [{playbarState?.firstGate && playbarState.firstGate.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              lastGate : [{playbarState?.lastGate && playbarState.lastGate.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              previousGateBasedOnSelected : [
              {playbarState?.previousGateBasedOnSelected && playbarState.previousGateBasedOnSelected.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              latestGateBasedOnSelected : [
              {playbarState?.latestGateBasedOnSelected && playbarState.latestGateBasedOnSelected.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              nextGateBasedOnSelected : [
              {playbarState?.nextGateBasedOnSelected && playbarState.nextGateBasedOnSelected.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              previousGateBasedOnCurrent : [
              {playbarState?.previousGateBasedOnCurrent && playbarState.previousGateBasedOnCurrent.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              latestGateBasedOnCurrent : [
              {playbarState?.latestGateBasedOnCurrent && playbarState.latestGateBasedOnCurrent.sequence}]
            </ContentLineText>
            <ContentLineText className={'whiteFont margin0 padding0'}>
              nextGateBasedOnCurrent : [
              {playbarState?.nextGateBasedOnCurrent && playbarState.nextGateBasedOnCurrent.sequence}]
            </ContentLineText>
          </RightContent>
        </ContentRow>
      </InfoDiv>
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
              <Link key={ws.id} to={`/workspace/${ws.url}/`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          {isLogin && <AddButton onClick={onClickCreateWorkspace}>+</AddButton>}
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
            <Input
              id="workspace"
              value={newWorkspace}
              onChange={(e) => {
                onChangeNewWorkspace(e);
                setNameConflict(false);
              }}
              style={{ borderColor: nameConflict ? 'red' : 'initial' }}
            />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input
              id="workspace-url"
              value={newUrl}
              onChange={(e) => {
                onChangeNewUrl(e);
                setUrlConflict(false);
              }}
              style={{ borderColor: urlConflict ? 'red' : 'initial' }}
            />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
      <ToastContainer position="bottom-center" />
    </div>
  );
};
export default BasicLayout;
