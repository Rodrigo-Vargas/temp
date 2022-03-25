import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faMapMarkerAlt, faRocket } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import Base from "templates/Base";

import { CardDescription, CardTitle, Content, EventTitle } from './styles';

export type AboutTemplateProps = {
  data: Array<YearData>;
}

type YearData = {
  year: number;
  items: Array<ItemData>;
}

type ItemData = {
  category: string;
  date?: string;
  description?: string;
  image?: string;
  title: string;
}

const AboutTemplate = ({ data } : AboutTemplateProps) => {
  
  function renderIcon(category: string) {
    switch(category)
    {
      case 'job':
        return <FontAwesomeIcon icon={faRocket} />
      case 'travel':
          return <FontAwesomeIcon icon={faMapMarkerAlt} />
      default:
          return <FontAwesomeIcon icon={faGraduationCap} />    
    }
  }

  return (
    <Base>
      <Content>
        <div id="responsive-trello" className="trello">
          <div className="timeline">
            <div className="year">
              <div className="bio">
                <h1 className="timeline-title">How are you doing?</h1>
                <div className="event-list-wrapper">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Selfie"
                    className="bio-img"
                    width="600"
                    height="600"
                  />
  
                  <p>I am Rodrigo Vargas!</p>
                </div>
              </div>
            </div>
  
            {
              data.map((year, i) => (
                <div key={i} className="year">
                  <h2 className="timeline-title">{year.year}</h2>
                  <div className="event-list-wrapper">
                    <ul className="event-list">
                      {
                        year.items.map((card, i) => (
                          <li key={i} className="event icon-rocket">
                            <EventTitle className="event-title">
                              { renderIcon(card.category) }
      
                              <CardTitle>{ card.title }</CardTitle>
                            </EventTitle>
  
                            <CardDescription>
                              {
                                card.image && (
                                  <Image
                                    src={ card.image }
                                    alt={ card.title }
                                    width="100%" height="100%"
                                    layout={'responsive'} />
                                )
                              }                                
                              {
                                card.description && (
                                  <p>{ card.description }</p>
                                )
                              }
                            </CardDescription>
      
                            <time className="meta">{ card.date }</time>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Content>
    </Base>
  );
}

export default AboutTemplate;
