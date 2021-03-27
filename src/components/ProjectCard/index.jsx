import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from '../Icons';

import {
  TagList,
  Tag,
  Title,
  LinkTitle,
  CardWrapper,
  ImageBox,
  Image,
  CardHeader,
  Meta,
  MetaLink,
} from './styles';

const ProjectCard = ({ title, img, slug, index, link }) => (
  <CardWrapper key={index}>
    <CardHeader>
      <LinkTitle href={`/projects${slug}`} data-testid="project-link">
        <Title>{title}</Title>
      </LinkTitle>
      <Meta>
        {link && (
          <MetaLink target="_blank" href={link}>
            <Icons.ExternalLink style={{ transform: 'scale(0.8)' }} />
          </MetaLink>
        )}
      </Meta>

      <TagList>
        <Tag>HTML</Tag>
        <Tag>Wordpress</Tag>
      </TagList>
    </CardHeader>
    <ImageBox>
      <Image>
        <img src={img} alt={title} />
      </Image>
    </ImageBox>
  </CardWrapper>
);

ProjectCard.defaultProps = {
  link: PropTypes.string,
};

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default ProjectCard;
