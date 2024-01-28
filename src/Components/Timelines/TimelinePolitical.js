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

export { TimelineParliamentHouse };
