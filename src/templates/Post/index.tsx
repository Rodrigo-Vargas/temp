import Base from 'templates/Base';
import { Container } from 'components/Grid';

import { Article } from './styles';

export type PostTemplateProps = {
  frontmatter: {
    title: string;
  };
  content: string;
}

const PostTemplate: React.FC<PostTemplateProps> = ({ frontmatter, content }) => (
  <Base>
    <Container>
      <Article>
        <h1>{frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Article>
    </Container>
  </Base>
);

export default PostTemplate;
