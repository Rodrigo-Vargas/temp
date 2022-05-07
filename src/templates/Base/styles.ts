import styled, { css } from 'styled-components';

type ContentProps = {
  hideShell: boolean
}

export const Content = styled.div<ContentProps>`
  ${({ theme, hideShell }) => css`
    padding-bottom: ${theme.spacings.xxl};
    ${!hideShell &&
      css`
      margin-top: ${theme.header.height};
      padding-top: ${theme.spacings.xxl};
      `
    }
  `}
`;
