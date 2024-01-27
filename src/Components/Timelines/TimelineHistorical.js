import { Chrono } from 'react-chrono';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Timeline = ({ timelineClicked, setTimelineClicked }) => {
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
        items={[
          {
            title: '1887',
            cardTitle: 'Establishment of Raffles Hotel',
            url: 'https://en.wikipedia.org/wiki/Raffles_Hotel',
            media: {
              name: 'Raffles Hotel',
              source: {
                url: 'https://www.historichotels.org/images/uploads/SINRH/historyimages/Historical_Image_of_Exterior_Circa_1921_Raffles_Hotel_Singapore_Historic_Hotels_Worldwide_in_Singapore_Singapore.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Raffles Hotel, a colonial-era icon, is established in Singapore.',
            cardDetailedText: `Raffles Hotel, an iconic colonial-era establishment, was established in 1887 in Singapore. Founded by the Armenian Sarkies brothers, the hotel quickly became a symbol of luxury and elegance. Over the years, it has hosted numerous famous personalities and played a significant role in Singapore's history.`,
          },
          {
            title: '1915',
            cardTitle: 'Raffles during World War I',
            media: {
              name: 'Raffles Hotel',
              source: {
                url: 'https://collections.museumsvictoria.com.au/content/media/22/572322-large.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Raffles Hotel serves as a base for British soldiers during World War I.`,
            cardDetailedText: `During World War I, Raffles Hotel served as a base for British soldiers. The hotel witnessed the impact of the war on the region and played a role in providing accommodation and support for military personnel.`,
          },
          {
            title: '1989',
            cardTitle: 'Restoration and Reopening',
            media: {
              name: 'Raffles Hotel',
              source: {
                url: 'https://senicaproductions.com/wp-content/uploads/2017/03/1989-last-day-before-close-for-2-yr-reno-national-archives-singapore.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Raffles Hotel undergoes restoration and reopens to the public.`,
            cardDetailedText: `In 1989, Raffles Hotel underwent a comprehensive restoration to preserve its heritage and architectural significance. The hotel reopened its doors to the public, continuing its legacy as a premier luxury destination in Singapore.`,
          },
          {
            title: 'Present',
            cardTitle: 'Modern Elegance',
            media: {
              name: 'Raffles Hotel',
              source: {
                url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/33/be/9c/raffles-hotel-singapore.jpg?w=700&h=-1&s=1',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Raffles Hotel stands as a symbol of modern elegance in Singapore.`,
            cardDetailedText: `Today, Raffles Hotel stands as a symbol of modern elegance while preserving its historical charm. It remains a renowned luxury hotel, offering a unique blend of tradition and sophistication to guests from around the world.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineOldHill = ({ timelineClicked, setTimelineClicked }) => {
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
        items={[
          {
            title: '1884',
            cardTitle: 'Construction of Old Hill Street Police Station',
            url: 'https://en.wikipedia.org/wiki/Old_Hill_Street_Police_Station',
            cardSubtitle:
              'The iconic Old Hill Street Police Station in Singapore is constructed.',
            cardDetailedText: `The construction of the Old Hill Street Police Station in Singapore began in 1884. The distinctive building, with its colorful shutters, was designed by the Public Works Department during the British colonial era. Over the years, it has become an iconic landmark in Singapore.`,
          },
          {
            title: '1930s',
            cardTitle: 'Art Deco Renovations',
            cardSubtitle: `Old Hill Street Police Station undergoes renovations with Art Deco influences.`,
            cardDetailedText: `In the 1930s, Old Hill Street Police Station underwent significant renovations, embracing the Art Deco architectural style. The renovations added to the station's unique appearance, making it stand out in the cityscape.`,
          },
          {
            title: '1997',
            cardTitle: 'Conversion into Arts Space',
            cardSubtitle: `Old Hill Street Police Station is repurposed into an arts space.`,
            cardDetailedText: `In 1997, Old Hill Street Police Station was repurposed into an arts space, providing a hub for creative activities and cultural events. The adaptive reuse of the historic building contributed to the preservation of its architectural heritage.`,
          },
          {
            title: '2010',
            cardTitle: 'Modern Transformation',
            cardSubtitle: `Old Hill Street Police Station undergoes a modern transformation.`,
            cardDetailedText: `In 2010, Old Hill Street Police Station underwent a modern transformation to adapt to contemporary needs. The restoration efforts aimed at preserving the historical significance while incorporating modern amenities. The building continues to be a symbol of Singapore's rich history and architectural diversity.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

export { Timeline, TimelineOldHill };
