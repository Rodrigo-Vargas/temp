import styled, { css } from 'styled-components';

export const Content = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacers.p28};
  `}
`;

export const Another = {};
