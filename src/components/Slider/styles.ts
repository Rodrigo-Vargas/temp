import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: calc(${theme.spacings.xxl} + 40px);
  `}
`;
