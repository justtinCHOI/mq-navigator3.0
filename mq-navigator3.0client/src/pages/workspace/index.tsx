import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Header } from '@pages/workspace/styles';
import useCustomWorkspace from '@hooks/useCustomWorkspace';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import { CustomIconButton } from '@components/PlayList/styles';
import useCustomMove from '@hooks/useCustomMove';

const WorkspacePage = () => {
  const { workspaceState } = useCustomWorkspace();
  const { moveToAnalyze, moveToSetting } = useCustomMove();

  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);

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
        <span>{workspaceState?.name}</span>
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
