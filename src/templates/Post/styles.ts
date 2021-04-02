import styled, { css } from 'styled-components';

export const Article = styled.article`
  ${({ theme }) => css`
    h1 {
      color: ${theme.colors.primary500};
      font-size: 1.875rem;
      font-weight: 600;
      line-height: 2.25rem;
      margin-bottom: 1.25rem;
    }

    h2 {
      color: ${theme.colors.primary500};
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.75rem;
      margin-bottom: 1.25rem;
      margin-top: 2.5rem;
    }

    img {
      display: block;
      margin: 0 auto;
      padding: ${theme.spacings.xl};
    }

    p {
      color: ${theme.colors.gray500};
      font-weight: 300;
      letter-spacing: 0.025em;
      line-height: 2.25rem;
    }
  `}
`;
