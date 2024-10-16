import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      .flex {
        display: flex;
      }
    `}
  />
);

export default GlobalStyles;
