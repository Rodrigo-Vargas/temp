import React, { useEffect, useState } from 'react';

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

interface ProjectsTemplateProps {
  items: [
    {
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          categories: Array<string>;
          cover: {
            publicURL: string;
          };
          link: string;
          skills: Array<string>;
          title: string;
        };
      };
    }
  ];
}

const ProjectsTemplate: React.FC<ProjectsTemplateProps> = ({ items }) => {
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    let itemSkills: Array<string> = [];
    items.forEach(({ node }) => {
      node.frontmatter.categories?.forEach(skill => {
        itemSkills.push(skill);
      });
    });

    itemSkills = itemSkills.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    itemSkills = itemSkills.reduce(
      (accumulator: Array<string>, currentValue: string) => {
        const index = accumulator.findIndex(item => currentValue === item);
        if (index < 0) {
          accumulator.push(currentValue);
        }

        return accumulator;
      },
      []
    );

    itemSkills.splice(0, 0, 'All');

    setCategories(itemSkills);
  }, [items]);

  const handleFilterClick = (category: string) => {
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
            {categories.map(category => (
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
            ).map(({ node }) => (
              <Col key={node.fields.slug} className="w-50">
                <ProjectCard
                  title={node.frontmatter.title}
                  categories={node.frontmatter.categories}
                  img={node.frontmatter.cover?.publicURL}
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

export default ProjectsTemplate;
