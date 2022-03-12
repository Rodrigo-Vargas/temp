import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Container, Row, Col } from '../../components/Grid';
import ProjectCard from 'components/ProjectCard';
import Base from '../Base';

import {
  Title,
  PageDescription,
  SkillFilterItem,
  SkillFilter,
  SelectedFilterDisplay,
} from './styles';

export type ProjectsTemplateProps = {
  items: [
    {
      slug: string;
      frontmatter: {
        categories: Array<string>;
        cover: string;
        link: string;
        locale: string;
        skills: Array<string>;
        title: string;
      };
    }
  ];
}

const ProjectsTemplate: React.FC<ProjectsTemplateProps> = ({ items }) => {
  const { defaultLocale } = useRouter();
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    let itemSkills: Array<string> = [];
    items.forEach(({ frontmatter }) => {
      frontmatter.categories?.forEach(skill => {
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
                (item) =>
                item.frontmatter.categories.filter(
                    skill => skill === selectedFilter
                  ).length > 0
              )
            : items
          ).map((item) => {
            const localizedUrl =
              item.frontmatter.locale == defaultLocale ? '' : `${item.frontmatter.locale}/`;

            const projectUrl = `/${localizedUrl}projects/${item.slug}`;

            return (
              <Col key={item.slug} className="w-50">
                <ProjectCard
                  title={item.frontmatter.title}
                  categories={item.frontmatter.categories}
                  img={item.frontmatter.cover}
                  url={projectUrl}
                  link={item.frontmatter.link}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </Base>
  );
};

export default ProjectsTemplate;
