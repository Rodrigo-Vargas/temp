import { SectionTitle } from "templates/Resume/styles";
import { Description, Title } from "./style";

const Skill = ({data}) => (
  <div>
    <SectionTitle>Skills</SectionTitle>
    {
      data.skills.map((skill, index) => (
        <div key={index}>
          <Title>{skill.title}</Title>
          <Description>{skill.description}</Description>
        </div>
      ))
    }
  </div>
)

export default Skill;
