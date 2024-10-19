import React, { useCallback, useState } from 'react';
import Switch from 'react-switch';
import { Outlet } from 'react-router-dom';
import { Container, Header } from '@pages/workspace/styles';
import useCustomWorkspace from '@hooks/useCustomWorkspace';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import { CustomIconButton } from '@components/Playbar/styles';
import useCustomMove from '@hooks/useCustomMove';
import useCustomPlaybar from '@hooks/useCustomPlaybar';

const WorkspacePage = () => {
  const { workspaceState } = useCustomWorkspace();
  const { moveToAnalyze, moveToSetting } = useCustomMove();

  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const { isLive, handleLiveToggle } = useCustomPlaybar();

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowInviteWorkspaceModal(false);
  }, []);

  const onClickMapIcon = useCallback(() => {
    return moveToAnalyze();
  }, [moveToAnalyze]);

  const onClickSettingIcon = useCallback(() => {
    return moveToSetting();
  }, [moveToSetting]);

  return (
    <Container>
      <Header>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-start', alignItems: 'center', gap: '15px' }}>
          <span>{workspaceState?.name}</span>
          <Switch
            onChange={handleLiveToggle}
            checked={isLive}
            offColor="#888"
            onColor="#ff4d4d"
            offHandleColor="#fff"
            onHandleColor="#fff"
            handleDiameter={21}
            height={30}
            width={70}
            className="react-switch"
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 10px rgba(255, 77, 77, 0.5)"
          />
          <span>{isLive ? 'Live Data Mode' : 'Data Standby Mode'}</span>
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <span>{workspaceState?.members.length}</span>
          <CustomIconButton onClick={onClickInviteWorkspace}>
            <i className="fa-lg fa-solid fa-user-plus"></i>
          </CustomIconButton>
          <CustomIconButton onClick={onClickMapIcon}>
            <i className="fa-regular fa-map fa-lg"></i>
          </CustomIconButton>
          <CustomIconButton onClick={onClickSettingIcon}>
            <i className="fa-lg fa-solid fa-sliders"></i>
          </CustomIconButton>
        </div>
      </Header>
      <Outlet />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
    </Container>
  );
};

export default WorkspacePage;
