import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Header } from '@pages/workspace/styles';
import { MenuScroll } from '@layouts/BasicLayout/styles';
import useCustomWorkspace from '@hooks/useCustomWorkspace';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';

const WorkspacePage = () => {
  const { workspaceState } = useCustomWorkspace();

  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowInviteWorkspaceModal(false);
  }, []);

  return (
    <Container>
      <Header>
        <span>{workspaceState?.name}</span>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <span>{workspaceState?.members.length}</span>
          <button
            onClick={onClickInviteWorkspace}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      <MenuScroll>
        <Outlet />
      </MenuScroll>
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
    </Container>
  );
};

export default WorkspacePage;
