import { Col } from 'components/Grid';
import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.spacings.xl};
  `}
`;

export const SubTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    font-size: ${theme.font.sizes.xl};
    margin-bottom: ${theme.spacings.xs};
  `}
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.primary500};
    font-size: ${theme.font.sizes.xl};
    font-weight: ${theme.font.weight.light};
    margin-bottom: ${theme.spacings.xs};
  `}
`;

export const Meta = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    margin-bottom: ${theme.spacings.lg};

    div {
      display: flex;
      align-items: center;
      padding-right: ${theme.spacings.sm};
    }

    span {
      color: ${theme.colors.gray500};
      font-size: ${theme.font.sizes.xs};
      margin-left: ${theme.spacings.xs};
    }
  `}
`;

export const Content = styled(Col)`
  width: 67%;
`;

export const SideNav = styled(Col)`
  width: 33%;
`;
