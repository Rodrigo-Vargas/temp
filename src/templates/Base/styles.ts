import styled, { css } from 'styled-components';

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.header.height};
    padding-bottom: ${theme.spacings.xxl};
    padding-top: ${theme.spacings.xxl};
  `}
`;
