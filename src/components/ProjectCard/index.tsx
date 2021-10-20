import Image from 'next/image';
import * as Icons from 'components/Icons';

import {
  TagList,
  Tag,
  Title,
  LinkTitle,
  CardWrapper,
  ImageBox,
  ImageWrap,
  CardHeader,
  Meta,
  MetaLink,
} from './styles';

interface ProjectCardProps {
  categories: Array<string>;
  img: string;
  link: string;
  slug: string;
  title: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  categories,
  img,
  link,
  slug,
  title,
}) => {
  console.log(img);
  return(
    <CardWrapper>
      <CardHeader>
        <LinkTitle href={`/projects/${slug}`} data-testid="project-link">
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
          {categories?.map((category, i) => (
            <Tag key={i}>{category}</Tag>
          ))}
        </TagList>
      </CardHeader>
      <ImageBox>
        <ImageWrap>
          {
            (img) &&
              (
                <img src={img} alt={title} />
              )
          }

        </ImageWrap>
      </ImageBox>
    </CardWrapper>
  )
};

export type ProjectCard = {
  index: number,
  title: string,
  img: string,
  slug: string,
  link: string,
};

export default ProjectCard;
