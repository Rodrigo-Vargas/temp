import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin-bottom: calc(${theme.spacings.xxl} + 40px);
  `}
`;
