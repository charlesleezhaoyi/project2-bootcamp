import { Chrono } from 'react-chrono';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const TimelineParliamentHouse = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1827',
            cardTitle: 'Foundation of Old Parliament House',
            media: {
              name: 'Old Parliament House',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Old_parliament_House%2C_Singapore_-_20150906-02.jpg/800px-Old_parliament_House%2C_Singapore_-_20150906-02.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The foundation of the Old Parliament House marks the beginning of legislative history in Singapore.',
            cardDetailedText: `In 1827, the Old Parliament House was established, marking the beginning of legislative history in Singapore. The building served as the seat of government and witnessed significant events in the colonial era.`,
          },
          {
            title: '1955',
            cardTitle: 'Construction of the New Parliament House',
            media: {
              name: 'New Parliament House Construction',
              source: {
                url: 'https://media.gettyimages.com/photos/the-new-singapore-parliament-house-being-constructed-at-night-picture-id514928003?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The construction of the New Parliament House symbolizes Singapore's post-independence era.`,
            cardDetailedText: `In 1955, construction began on the New Parliament House, symbolizing Singapore's transition to self-governance and the post-independence era. The modern building was designed to accommodate the evolving needs of the nation's legislative processes.`,
          },
          {
            title: '1965',
            cardTitle: 'Independence of Singapore',
            media: {
              name: 'Independence Day',
              source: {
                url: 'https://cdn.britannica.com/s:800x1000/20/69920-050-17A88880/Singapore-Lee-Kuan-Yew-1965.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Singapore gains independence, and Parliament House becomes a symbol of national governance.`,
            cardDetailedText: `On August 9, 1965, Singapore officially gained independence. Parliament House became a symbol of national governance, playing a central role in the legislative processes of the newly formed Republic of Singapore.`,
          },
          {
            title: '1999',
            cardTitle: 'Official Opening of the New Parliament House',
            media: {
              name: 'New Parliament House Opening Ceremony',
              source: {
                url: 'https://media.gettyimages.com/photos/people-attend-the-opening-ceremony-of-the-new-singapore-parliament-picture-id172946232?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The New Parliament House is officially opened.`,
            cardDetailedText: `In 1999, the New Parliament House was officially opened. The ceremony marked a significant milestone in Singapore's history, reflecting the nation's growth and commitment to democratic governance. The modern facility is equipped with state-of-the-art technology to support legislative proceedings.`,
          },
          {
            title: 'Present',
            cardTitle: 'Iconic Symbol of Democracy',
            media: {
              name: 'Parliament House',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-parliament-house-picture-id856608530?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Parliament House stands as an iconic symbol of democracy in Singapore today.`,
            cardDetailedText: `Today, Parliament House stands as an iconic symbol of democracy in Singapore. It continues to be the venue for legislative discussions, debates, and decisions that shape the future of the nation. The building represents Singapore's commitment to democratic principles and transparent governance.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineIstanaSingapore = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1869',
            cardTitle: 'Construction of Istana Singapore',
            media: {
              name: 'Istana Singapore',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/The_Istana%2C_Singapore_%283143%29.jpg/800px-The_Istana%2C_Singapore_%283143%29.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The construction of Istana Singapore, the official residence of the President of Singapore, begins.',
            cardDetailedText: `In 1869, construction began on Istana Singapore, the official residence of the President of Singapore. The historical building serves as a symbol of the nation's leadership.`,
          },
          {
            title: '1942',
            cardTitle: 'Japanese Occupation of Istana',
            media: {
              name: 'Istana during Japanese Occupation',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/6791de3c-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `During World War II, Istana Singapore is occupied by Japanese forces.`,
            cardDetailedText: `During the Japanese occupation of Singapore in 1942, Istana Singapore witnessed a period of historical significance as it was occupied by Japanese forces. The building reflects the wartime history of the region.`,
          },
          {
            title: '1959',
            cardTitle: 'Istana Becomes the Official Residence',
            media: {
              name: 'Istana Official Residence',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Istana%2C_Singapore_%2837214829536%29.jpg/800px-Istana%2C_Singapore_%2837214829536%29.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `With Singapore's self-governance, Istana becomes the official residence of the President.`,
            cardDetailedText: `In 1959, with Singapore attaining self-governance, Istana Singapore became the official residence of the President. The building's role evolved to reflect the changing political landscape of the nation.`,
          },
          {
            title: '1965',
            cardTitle: 'Independence and Istana',
            media: {
              name: 'Independence Day at Istana',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/5fd1e4b6-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Istana plays a role in the celebrations as Singapore gains independence.`,
            cardDetailedText: `On August 9, 1965, as Singapore gained independence, Istana Singapore played a significant role in the celebrations. The building stands as a witness to the historical moment.`,
          },
          {
            title: 'Present',
            cardTitle: 'Preserving Heritage and Tradition',
            media: {
              name: 'Istana Singapore Today',
              source: {
                url: 'https://media.gettyimages.com/photos/the-istana-presidential-palace-in-singapore-picture-id831224176?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Istana continues to be a symbol of heritage and tradition.`,
            cardDetailedText: `Today, Istana Singapore continues to serve as the official residence of the President and a symbol of the nation's heritage and tradition. It is a key site for state ceremonies and events.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineSupremeCourt = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1937',
            cardTitle: 'Construction of Old Supreme Court Building',
            media: {
              name: 'Old Supreme Court Building',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Old_Supreme_Court_Building%2C_Singapore_-_20040723.jpg/800px-Old_Supreme_Court_Building%2C_Singapore_-_20040723.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The construction of the Old Supreme Court Building marks the establishment of the judicial system in Singapore.',
            cardDetailedText: `In 1937, the construction of the Old Supreme Court Building began, marking the establishment of the judicial system in Singapore. The building played a crucial role in the legal history of the region.`,
          },
          {
            title: '1942',
            cardTitle: 'Japanese Occupation and Legal Changes',
            media: {
              name: 'Japanese Occupation Legal Changes',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/9768e001-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `During the Japanese occupation, legal changes impact the Supreme Court.`,
            cardDetailedText: `During the Japanese occupation of Singapore in 1942, the legal landscape of the Supreme Court underwent significant changes. The building witnessed alterations in the legal system during this period.`,
          },
          {
            title: '1954',
            cardTitle: 'New Supreme Court Building',
            media: {
              name: 'New Supreme Court Building Construction',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/New_Supreme_Court_Building%2C_Singapore_-_20040724.jpg/800px-New_Supreme_Court_Building%2C_Singapore_-_20040724.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Construction of the new Supreme Court Building begins.`,
            cardDetailedText: `In 1954, construction began on the new Supreme Court Building, reflecting Singapore's commitment to modernize its legal infrastructure. The new facility was designed to meet the evolving needs of the judiciary.`,
          },
          {
            title: '1969',
            cardTitle: 'Official Opening of the New Supreme Court Building',
            media: {
              name: 'New Supreme Court Building Opening Ceremony',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/6b1ea6b6-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The new Supreme Court Building is officially opened.`,
            cardDetailedText: `In 1969, the new Supreme Court Building was officially opened, marking a significant milestone in the legal history of Singapore. The modern facility became the central hub for judicial proceedings.`,
          },
          {
            title: 'Present',
            cardTitle: 'Symbol of Justice and Rule of Law',
            media: {
              name: 'Supreme Court Building Today',
              source: {
                url: 'https://media.gettyimages.com/photos/supreme-court-of-singapore-picture-id1130970486?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Supreme Court Building remains a symbol of justice and the rule of law.`,
            cardDetailedText: `Today, the Supreme Court Building stands as a symbol of justice and the rule of law in Singapore. It continues to be the seat of the judiciary, upholding legal principles and serving as a key institution in the nation's legal system.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineCityHall = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1926',
            cardTitle: 'Construction of City Hall Singapore',
            media: {
              name: 'City Hall Singapore',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Singapore_City_Hall%2C_Singapore_-_20050512.jpg/800px-Singapore_City_Hall%2C_Singapore_-_20050512.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The construction of City Hall marks the beginning of civic governance in Singapore.',
            cardDetailedText: `In 1926, the construction of City Hall Singapore began, marking the beginning of civic governance in Singapore. The building played a crucial role in the civic and administrative history of the region.`,
          },
          {
            title: '1942',
            cardTitle: 'World War II and City Hall',
            media: {
              name: 'City Hall during World War II',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/7e75c6e3-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `City Hall witnesses the impact of World War II and Japanese occupation.`,
            cardDetailedText: `During World War II in 1942, City Hall Singapore witnessed the impact of the conflict and Japanese occupation. The building reflects the challenges faced during this historical period.`,
          },
          {
            title: '1951',
            cardTitle: 'Post-War Reconstruction of City Hall',
            media: {
              name: 'City Hall Reconstruction',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/3e0c98bf-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `City Hall undergoes reconstruction post-World War II.`,
            cardDetailedText: `After the war in 1951, City Hall underwent reconstruction efforts to restore and rebuild the damaged parts. The reconstruction symbolized the resilience and determination of the people.`,
          },
          {
            title: '1959',
            cardTitle: 'City Hall as Civic Center',
            media: {
              name: 'City Hall Civic Functions',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Singapore_City_Hall_Interior%2C_Singapore_-_20060205.jpg/800px-Singapore_City_Hall_Interior%2C_Singapore_-_20060205.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `City Hall becomes a central hub for civic functions.`,
            cardDetailedText: `In 1959, City Hall assumed a central role as a hub for civic functions, hosting events and activities that contributed to the cultural and civic life of Singapore.`,
          },
          {
            title: 'Present',
            cardTitle: 'Heritage Landmark and Cultural Venue',
            media: {
              name: 'City Hall Today',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-city-hall-and-the-supreme-court-picture-id1188161027?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `City Hall remains a heritage landmark and cultural venue.`,
            cardDetailedText: `Today, City Hall Singapore stands as a heritage landmark and cultural venue. The historic building continues to be an integral part of Singapore's identity, hosting various cultural events and preserving the city's rich history.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineNationalGallery = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1996',
            cardTitle: 'National Gallery of Singapore Established',
            media: {
              name: 'National Gallery of Singapore',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-national-gallery-picture-id1054745556?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The National Gallery of Singapore is officially established.`,
            cardDetailedText: `In 1996, the National Gallery of Singapore was officially established within the historic Supreme Court Building. The gallery serves as a cultural institution, showcasing a diverse collection of artworks and preserving the nation's artistic heritage.`,
          },
          {
            title: '2015',
            cardTitle: 'Official Opening of the National Gallery',
            media: {
              name: 'National Gallery Opening Ceremony',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-national-gallery-opens-to-public-picture-id490678048?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The National Gallery of Singapore is officially opened to the public.`,
            cardDetailedText: `In 2015, the National Gallery of Singapore was officially opened to the public, marking a milestone in the cultural landscape of the city. The gallery continues to play a vital role in promoting art and culture.`,
          },
          {
            title: '2018',
            cardTitle: 'Special Exhibition: [Event Name]',
            media: {
              name: 'Special Exhibition',
              source: {
                url: '[Image URL for the Special Exhibition]',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The National Gallery hosts a special exhibition.`,
            cardDetailedText: `In 2018, the National Gallery of Singapore hosted a special exhibition, showcasing unique artworks and providing a platform for artistic expression. The event attracted art enthusiasts and contributed to the gallery's mission of fostering creativity and appreciation for the arts.`,
          },
          {
            title: 'Present',
            cardTitle: 'Celebrating Art and Heritage',
            media: {
              name: 'National Gallery Today',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-national-gallery-at-dusk-picture-id623416742?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The National Gallery stands as a hub for celebrating art and heritage in Singapore.`,
            cardDetailedText: `Today, the National Gallery of Singapore stands as a hub for celebrating art and heritage. Housed within the historic City Hall and Supreme Court Building, it continues to contribute to Singapore's vibrant cultural scene.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineFullertonBuilding = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1928',
            cardTitle: 'Construction of The Fullerton Building',
            media: {
              name: 'The Fullerton Building Construction',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/The_Fullerton_Building%2C_Singapore_%28cropped%29.jpg/800px-The_Fullerton_Building%2C_Singapore_%28cropped%29.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The construction of The Fullerton Building, formerly known as the General Post Office, begins.',
            cardDetailedText: `In 1928, the construction of The Fullerton Building began, originally serving as the General Post Office. The building has since played a significant role in Singapore's history and skyline.`,
          },
          {
            title: '1951',
            cardTitle: 'Post-War Reconstruction of The Fullerton Building',
            media: {
              name: 'The Fullerton Building Reconstruction',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/219fb2b1-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Fullerton Building undergoes reconstruction after World War II.`,
            cardDetailedText: `After World War II in 1951, The Fullerton Building underwent reconstruction efforts to restore and revitalize the structure. The building became a symbol of resilience and renewal for the city.`,
          },
          {
            title: '1997',
            cardTitle: 'Conversion into The Fullerton Hotel',
            media: {
              name: 'The Fullerton Hotel Conversion',
              source: {
                url: 'https://media.gettyimages.com/photos/the-fullerton-hotel-singapore-city-picture-id164073729?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Fullerton Building is converted into The Fullerton Hotel.`,
            cardDetailedText: `In 1997, The Fullerton Building underwent a transformation and was converted into The Fullerton Hotel. The historic landmark now serves as a luxurious hotel, preserving its architectural grandeur.`,
          },
          {
            title: 'Present',
            cardTitle: 'The Fullerton Building Today',
            media: {
              name: 'The Fullerton Hotel Today',
              source: {
                url: 'https://media.gettyimages.com/photos/fullerton-hotel-at-night-in-singapore-picture-id545226358?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Fullerton Building stands as an iconic symbol in Singapore's skyline.`,
            cardDetailedText: `Today, The Fullerton Building, now The Fullerton Hotel, stands as an iconic symbol in Singapore's skyline. It continues to be a prominent part of the city's heritage, offering a blend of history and modern luxury.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelinePadang = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1822',
            cardTitle: 'Establishment of The Padang',
            media: {
              name: 'The Padang',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Singapore_-_The_Padang_Panorama_-_20040722-01.jpg/800px-Singapore_-_The_Padang_Panorama_-_20040722-01.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The Padang is established as an open playing field and public space.',
            cardDetailedText: `In 1822, The Padang was established as an open playing field and public space. It has since played a central role in the recreational, social, and civic life of Singapore.`,
          },
          {
            title: '1929',
            cardTitle: 'Transformation of The Padang',
            media: {
              name: 'The Padang Transformation',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/5ebfb8bb-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Padang undergoes transformation, becoming a sporting and recreational hub.`,
            cardDetailedText: `In 1929, The Padang underwent significant transformation, becoming a sporting and recreational hub in Singapore. The open space became a venue for various sports and community events.`,
          },
          {
            title: '1959',
            cardTitle: 'National Day Parade at The Padang',
            media: {
              name: 'National Day Parade at The Padang',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/03199998-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Padang hosts the first National Day Parade.`,
            cardDetailedText: `In 1959, The Padang hosted the first National Day Parade, marking a significant moment in Singapore's history. The iconic venue became a central location for celebrating the nation's independence.`,
          },
          {
            title: 'Present',
            cardTitle: 'The Padang Today',
            media: {
              name: 'The Padang Today',
              source: {
                url: 'https://media.gettyimages.com/photos/the-padang-singapore-picture-id1204460191?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Padang remains a vital public space and historical landmark.`,
            cardDetailedText: `Today, The Padang continues to be a vital public space and historical landmark in Singapore. It hosts various events, sports activities, and remains an integral part of the city's cultural and recreational fabric.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineRafflesPlace = ({ timelineClicked, setTimelineClicked }) => {
  return (
    <>
      <Button
        onClick={() => {
          setTimelineClicked(false);
        }}
      >
        <CancelOutlinedIcon />
      </Button>
      <Chrono
        theme={{
          primary: 'maroon',
          cardTitleColor: 'maroon',
          iconBackgroundColor: 'maroon',
          titleColor: 'maroon',
          titleColorActive: 'maroon',
          // cardMediaBgColor: 'maroon',
          // cardBgColor: 'black',
          // cardForeColor: 'maroon',
        }}
        items={[
          {
            title: '1822',
            cardTitle: 'Founding of Raffles Place',
            media: {
              name: 'Raffles Place',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Raffles_Place_Singapore_3.jpg/800px-Raffles_Place_Singapore_3.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Raffles Place is founded as a commercial center by Sir Stamford Raffles.',
            cardDetailedText: `In 1822, Raffles Place was founded as a commercial center by Sir Stamford Raffles. It quickly became a hub for trade and business, playing a crucial role in the economic development of Singapore.`,
          },
          {
            title: '1858',
            cardTitle: `Singapore's First Commercial Square`,
            media: {
              name: 'Raffles Place in 1860s',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/2c29bcec-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Raffles Place officially becomes Singapore's first commercial square.`,
            cardDetailedText: `In 1858, Raffles Place was officially designated as Singapore's first commercial square. The area continued to grow as a bustling center for trade and finance.`,
          },
          {
            title: '1915',
            cardTitle: 'Rise of Skyscrapers in Raffles Place',
            media: {
              name: 'Skyscrapers in Raffles Place',
              source: {
                url: 'https://www.nas.gov.sg/archivesonline/photographs/record-details/c31a02bb-1161-11e3-83d5-0050568939ad',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Skyscrapers begin to define the skyline of Raffles Place.`,
            cardDetailedText: `In 1915, the rise of skyscrapers began to define the skyline of Raffles Place. The area evolved into a financial district, showcasing modern architecture and becoming a symbol of economic progress.`,
          },
          {
            title: 'Present',
            cardTitle: 'Raffles Place Today',
            media: {
              name: 'Raffles Place Today',
              source: {
                url: 'https://media.gettyimages.com/photos/raffles-place-business-district-singapore-picture-id1251417160?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Raffles Place remains a key financial and commercial hub.`,
            cardDetailedText: `Today, Raffles Place continues to be a key financial and commercial hub in Singapore. The area is characterized by modern skyscrapers, bustling financial activities, and serves as a focal point of the city's economic vitality.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

export {
  TimelineParliamentHouse,
  TimelineIstanaSingapore,
  TimelineSupremeCourt,
  TimelineCityHall,
  TimelineNationalGallery,
  TimelineFullertonBuilding,
  TimelinePadang,
  TimelineRafflesPlace,
};
