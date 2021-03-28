import styled, { css } from 'styled-components';

export const FooterWraper = styled.footer`
  ${({ theme }) => css`
    background: ${theme.colors.primary600};
    color: ${theme.colors.gray50};
    padding: ${theme.spacings.lg} 0;
  `}
`;
