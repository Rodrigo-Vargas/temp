import styled, { css } from 'styled-components';

type SkillFilterItemProps = {
  active: boolean
}

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary700};
    font-size: ${theme.spacings.xl};
    margin-bottom: ${theme.spacings.xs};
    padding-top: ${theme.spacings.xl};
  `}
`;

export const PageDescription = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    font-weight: 300;
    margin-bottom: ${theme.spacings.xl};
  `}
`;

export const SkillFilter = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;
`;

export const SkillFilterItem = styled.a<SkillFilterItemProps>`
  ${({ theme, active }) => css`
    background: #fff;
    border: 1px solid ${theme.colors.primary700};
    border-radius: 20px;
    color: ${theme.colors.primary700};
    cursor: pointer;
    position: relative;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 5px 20px 5px 40px;
    text-decoration: none;
    transition: all 0.4s;

    &:before {
      content: '';
      height: 20px;
      width: 20px;
      background-color: #4338ca;
      position: absolute;
      left: 5px;
      border-radius: 50%;
      top: calc(50% - 10px);
      transition: all 0.4s 0.5s;
    }

    &:after {
      height: 8px;
      width: 8px;
      background-color: #fff;
      position: absolute;
      left: 11px;
      z-index: 6;
      content: '';
      border-radius: 50%;
      top: calc(50% - 4px);
      transition: all 0.4s 0.5s;
    }

    &:hover {
      background-color: #4338ca;
      color: #fff;

      &:before {
        background-color: #fff;
      }

      &:after {
        background-color: #4338ca;
      }
    }

    ${active &&
      css`
      background-color: #4338ca;
      color: #fff;

      &:before {
        background-color: #fff;
      }

      &:after {
        background-color: #4338ca;
      }
    `}
  `}
`;

export const SelectedFilterDisplay = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.gray500};
    margin-top: ${theme.spacings.lg};
    width: 100%;
  `}
`;
