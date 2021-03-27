import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ThemeProvider from '../../styles/theme-provider';
import GlobalStyles from '../../styles/global';

import { Container, Row, Col } from '../../components/Grid';
import ProjectCard from '../../components/ProjectCard';
import Base from '../Base';
import {
  Title,
  PageDescription,
  SkillFilterItem,
  SkillFilter,
  SelectedFilterDisplay,
} from './styles';

const ProjectsTemplate = ({ items }) => {
  const [skills, setSkills] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    let itemSkills = [];
    items.forEach(({ node }) => {
      node.frontmatter.skills.forEach(skill => {
        itemSkills.push(skill);
      });
    });

    itemSkills = itemSkills.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    itemSkills = itemSkills.reduce((accumulator, currentValue) => {
      const index = accumulator.findIndex(item => currentValue === item);
      if (index < 0) {
        accumulator.push(currentValue);
      }

      return accumulator;
    }, []);

    itemSkills.splice(0, 0, 'All');

    setSkills(itemSkills);
  }, [items]);

  const handleFilterClick = category => {
    if (category === 'All') {
      setSelectedFilter(null);
      return;
    }
    setSelectedFilter(category);
  };

  return (
    <ThemeProvider>
      <GlobalStyles />
      <Base>
        <Container>
          <Title>Works</Title>
          <PageDescription>
            Some examples of my work that I made on my spare time to make some
            profit and learn new skills
          </PageDescription>

          <SkillFilter>
            {skills.map(category => (
              <SkillFilterItem
                key={category}
                active={
                  category === selectedFilter ||
                  (category === 'All' && !selectedFilter)
                }
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </SkillFilterItem>
            ))}

            {selectedFilter && (
              <SelectedFilterDisplay>
                <span>Showing projects of {selectedFilter}</span>
              </SelectedFilterDisplay>
            )}
          </SkillFilter>

          <Row>
            {(selectedFilter
              ? items.filter(
                  ({ node }) =>
                    node.frontmatter.skills.filter(
                      skill => skill == selectedFilter
                    ).length > 0
                )
              : items
            ).map(({ node }, i) => (
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
    </ThemeProvider>
  );
};

ProjectsTemplate.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
};

export default ProjectsTemplate;
