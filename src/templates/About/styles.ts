import styled, { css } from 'styled-components';

export const CardTitle = styled.span`
  ${({ theme }) => css`
    padding-left: ${theme.spacings.md};
  `}
`;

export const Content = styled.section`
  ${({ theme }) => css`
    height: 800px;
    position: relative;

    #responsive-trello {
      overflow-x: auto;
      overflow-y: hidden;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .timeline {
      grid-template-columns: repeat(5, 340px) calc(1vw + 0.25rem);
      height: 97.5%;
    }

    .timeline:after {
      content: '';
      display: block;
    }

    .year {
      position: relative;
    }

    .event {
      background-color: ${theme.colors.gray100};
      border: none;
      box-shadow: 0 2px 0 0 rgba(255, 255, 255, 0.4);
    }
    
    .event-list-wrapper {
      background: ${theme.colors.primary600};
      border-radius: 3px;
      bottom: 0;
      position: absolute;
      left:0;
      overflow-y: auto;
      padding: 0.75em;
      right: 0;
      top: 2.5rem;
    }

    .event-list {
      margin-bottom: 1em;
    }

    .button {
      background: #FF6F00;
      color: #fff;
      display: inline-block;
      text-decoration: none;
      text-transform: uppercase;
      padding: 0.5em 0.75em;
      transition: 0.1s ease-in-out;
      font-variation-settings: 'wght' 650;
      font-weight: normal;
    }

      
    .timeline {
      display: grid;
      grid-column-gap: 1em;
      grid-row-gap: 2em;
      width: auto;
      line-height: 1.5;
      padding-left: ${theme.spacings.md};
      padding-right: ${theme.spacings.md};
    }

    .event-list {
      list-style-type: none;
      display: grid;
      grid-gap: 1em;
      margin: 0;
      padding: 0;
    }

    .timeline-title {
      margin-bottom: 0.25rem;
    }
    .timeline img {
      margin-bottom: 0.5rem;
    }
    .event {
      border: 1px solid ${theme.colors.gray300};
      padding: 1em;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    .event-title {
      line-height: 1.2;
      margin-bottom: 0.25rem;
      font-variation-settings: "wght" 600;
      font-weight: normal;
    }

    .event-icon {
      height: 1em;
      width: 1em;
      vertical-align: text-top;
    }

    /* Let's get this party started */
    ::-webkit-scrollbar {
        width: 12px;
    }

    /* Track */
    ::-webkit-scrollbar-track {

    }
  `}
`;