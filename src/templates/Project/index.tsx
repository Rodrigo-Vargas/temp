import Base from '../Base';
import { Col, Container, Row } from 'components/Grid';
import Slider from 'components/Slider';
import * as Icons from 'components/Icons';

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

export type ProjectTemplateProps = {
  node: {
    frontmatter: {
      excerpt: string;
      images: Array<string>;
      hidePortfolio
      link: string;
      sourceUrl: string;
      skills: Array<string>;
      title: string;
    };
    content: string;
  };
  next: {
    frontmatter: {
      cover: string;
      title: string;
    };
    slug: string;
  };
}

const ProjectTemplate = (props: ProjectTemplateProps) => {
  const { node, next } = props;
  const { frontmatter, content } = node;

  return (
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

          {frontmatter.images && !frontmatter.hidePortfolio && (
            <Slider>
              {frontmatter.images?.map((image, i) => (
                <div key={i}>
                  <img src={image} alt={frontmatter.title} />
                </div>
              ))}
            </Slider>
          )}

          <SecondaryTitle>About this project</SecondaryTitle>

          <ProjectContent>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: content }}
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

                <Button href={`/projects${next.slug}`}>
                  <Icons.ChevronRight />
                  <span>View Project</span>
                </Button>
              </Col>

              {next.frontmatter.cover && (
                <Col className="w-50">
                  <img
                    src={next.frontmatter.cover}
                    alt={next.frontmatter.title}
                  />
                </Col>
              )}
            </Row>
          </Container>
        </NextProjectWrapper>
      )}
    </Base>
  );
}

export default ProjectTemplate;
