import { CreateMenu, CloseModalButton } from '@components/Menu/styles';
import React, { CSSProperties, FC, PropsWithChildren, useCallback } from 'react';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<PropsWithChildren<Props>> = ({ closeButton = true, style, show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
