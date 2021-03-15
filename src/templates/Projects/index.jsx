import React from 'react';
import PropTypes from 'prop-types';

import Theme from '../../styles/theme';
import GlobalStyles from '../../styles/global';

import { Container, Row, Col } from '../../components/Grid';
import ProjectCard from '../../components/ProjectCard';
import Base from '../Base';

const ProjectsTemplate = ({ items }) => (
  <Theme>
    <GlobalStyles />
    <Base>
      <Container>
        <Row>
          {items.map(({ node }, i) => (
            <Col key={node.fields.slug} className="w-50">
              <ProjectCard
                title={node.frontmatter.title}
                index={i}
                img={node.frontmatter.cover.url}
                slug={node.fields.slug}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Base>
  </Theme>
);

ProjectsTemplate.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ProjectsTemplate;
