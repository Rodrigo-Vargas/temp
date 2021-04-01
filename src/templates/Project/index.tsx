import React from 'react';
import Theme from '../../styles/theme-provider';
import Base from '../Base';
import { Col, Container, Row } from '../../components/Grid';
import Slider from '../../components/Slider';
import GlobalStyles from '../../styles/global';
import * as Icons from '../../components/Icons';

import {
  Button,
  ButtonsWrapper,
  Excerpt,
  NextProjectWrapper,
  NextProjectTitle,
  NextProjectSubTitle,
  ProjectContent,
  SecondaryTitle,
  TechUsedWrapper,
  Title,
} from './styles';

interface ProjectTemplateProps {
  pageContext: {
    node: {
      frontmatter: {
        excerpt: string;
        images: [
          {
            publicURL: string;
          }
        ];
        link: string;
        sourceUrl: string;
        skills: Array<string>;
        title: string;
      };
      html: string;
    };
    next: {
      frontmatter: {
        cover: {
          publicURL: string;
        };
        title: string;
      };
      fields: {
        slug: string;
      };
    };
  };
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({ pageContext }) => {
  console.log(pageContext);
  const { node, next } = pageContext;
  const { frontmatter, html } = node;

  return (
    <Theme>
      <GlobalStyles />
      <Base>
        <Container>
          <div>
            <Title>{frontmatter.title}</Title>
            <Excerpt>{frontmatter.excerpt}</Excerpt>

            <ButtonsWrapper>
              {frontmatter.link && (
                <Button href={frontmatter.link} target="_blank">
                  <Icons.ExternalLink />
                  <span>Visit the website</span>
                </Button>
              )}

              {frontmatter.sourceUrl && (
                <Button href={frontmatter.sourceUrl} target="_blank">
                  <Icons.Github />
                  <span>Source Code</span>
                </Button>
              )}
            </ButtonsWrapper>

            <Slider>
              {frontmatter.images?.map((image, i) => (
                <div key={i}>
                  <img src={image.publicURL} alt={frontmatter.title} />
                </div>
              ))}
            </Slider>

            <SecondaryTitle>About this project</SecondaryTitle>

            <ProjectContent>
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </ProjectContent>

            <TechUsedWrapper>
              <SecondaryTitle>Technologies Used</SecondaryTitle>
              {frontmatter.skills?.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </TechUsedWrapper>
          </div>
        </Container>

        {next && (
          <NextProjectWrapper>
            <Container>
              <Row style={{ alignItems: 'center' }}>
                <Col className="w-50">
                  <NextProjectSubTitle>NEXT PROJECT</NextProjectSubTitle>
                  <NextProjectTitle>{next.frontmatter.title}</NextProjectTitle>

                  <Button href={`/projects${next.fields.slug}`}>
                    <Icons.ChevronRight />
                    <span>View Project</span>
                  </Button>
                </Col>

                {next.frontmatter.cover && (
                  <Col className="w-50">
                    <img
                      src={next.frontmatter.cover.publicURL}
                      alt={next.frontmatter.title}
                    />
                  </Col>
                )}
              </Row>
            </Container>
          </NextProjectWrapper>
        )}
      </Base>
    </Theme>
  );
};

export default ProjectTemplate;
