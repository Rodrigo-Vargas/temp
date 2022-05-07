import {
  SectionTitle
} from 'templates/Resume/styles';
import { Company, Item, List, Location, Period, Title } from './styles';

const Experience = ({data}) => (
  <div>
    <SectionTitle>Relevant Experience</SectionTitle>

    {
      data.experiences.map((item, key) => (
        <Item key={key}>
          <div>
            <Title>{item.title}</Title>
            <Company>@ {item.company}</Company>
          </div>
          <div>
            <Period>{item.period} // </Period>
            <Location>{item.location}</Location>
          </div>
          <List>
            {
              item.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))
            }
          </List>
        </Item>
      ))
    }
  </div>
)

export default Experience;
