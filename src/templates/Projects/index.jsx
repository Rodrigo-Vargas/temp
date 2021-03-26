import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Theme from '../../styles/theme';
import GlobalStyles from '../../styles/global';

import { Container, Row, Col } from '../../components/Grid';
import ProjectCard from '../../components/ProjectCard';
import Base from '../Base';
import {
  Title,
  PageDescription,
  SkillFilterItem,
  SkillFilter,
} from './styles';

const ProjectsTemplate = ({ items }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    let itemSkills = [];
    items.forEach(({ node }) => {
      node.frontmatter.skills.forEach((skill) => {
        itemSkills.push({
          name: skill,
          active: false,
        });
      });
    });

    itemSkills = itemSkills.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    itemSkills = itemSkills.reduce((accumulator, currentValue) => {
      const index = accumulator.findIndex((item) => currentValue.name === item.name);
      if (index < 0) {
        accumulator.push(currentValue);
      }

      return accumulator;
    }, []);

    itemSkills.splice(0, 0, {
      name: 'All',
      active: true,
    });

    setSkills(itemSkills);
  }, [items]);

  return (
    <Theme>
      <GlobalStyles />
      <Base>
        <Container>
          <Title>Portfolio</Title>
          <PageDescription>
            Some projects that I made on my spare time to make some profit and learn new skills
          </PageDescription>

          <SkillFilter>
            {
              skills.map((category, i) => (
                <SkillFilterItem key={i} active={category.active} href="">{category.name}</SkillFilterItem>
              ))
            }
          </SkillFilter>

          <Row>
            {items.map(({ node }, i) => (
              <Col key={node.fields.slug} className="w-50">
                <ProjectCard
                  title={node.frontmatter.title}
                  index={i}
                  img={node.frontmatter.cover.url}
                  slug={node.fields.slug}
                  link={node.frontmatter.link}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Base>
    </Theme>
  );
};

ProjectsTemplate.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default ProjectsTemplate;
