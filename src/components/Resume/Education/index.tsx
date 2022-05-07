import { SectionTitle } from 'templates/Resume/styles';
import { Description, Title } from '../Skill/style';

const Education = ({data}) => (
  <div>
    <SectionTitle>Education</SectionTitle>
    {
      data.education.map((educationItem, index) => (
        <div key={index}>
          <Title>{educationItem.title}</Title>
          <Description>{educationItem.description}</Description>
        </div>
      ))
    }
  </div>
)

export default Education;
