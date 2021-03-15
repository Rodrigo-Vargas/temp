import React from 'react';
import PropTypes from 'prop-types';

import {
  Wrapper, TagList, Tag, Title, Link, ImageBox, Image,
} from './styles';

const ProjectCard = ({
  title, img, slug, index,
}) => (
  <Wrapper key={index}>
    <Link href={`/projects/${slug}`} data-testid="project-link">
      <TagList>
        <Tag>HTML</Tag>
        <Tag>Wordpress</Tag>
      </TagList>
      <Title>{title}</Title>
      <ImageBox>
        <Image>
          <img src={img} alt={title} />
        </Image>
      </ImageBox>
    </Link>
  </Wrapper>
);

ProjectCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProjectCard;
