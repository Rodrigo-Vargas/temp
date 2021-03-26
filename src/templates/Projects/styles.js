import styled, { css } from 'styled-components';

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

export const SkillFilterItem = styled.a`
  ${({ theme }) => css`
    border: 1px solid #4338ca;
    padding: 5px 20px 5px 40px;
    border-radius: 20px;
    position: relative;
    background: #fff;
    color: #4338ca;
    text-decoration: none;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: all 0.5s;

    &:before {
      content: "";
      height: 20px;
      width: 20px;
      background-color: #4338ca;
      position: absolute;
      left: 5px;
      border-radius: 50%;
      top: calc(50% - 10px);
    }

    &:after {
      height: 8px;
      width: 8px;
      background-color: #fff;
      position: absolute;
      left: 11px;
      z-index: 6;
      content: "";
      border-radius: 50%;
      top: calc(50% - 4px);
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

    ${({ active }) => active && `
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
