import { Chrono } from 'react-chrono';
import { Button } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const TimelineBukitTimah = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1883',
            cardTitle: 'Discovery of Bukit Timah Hill',
            media: {
              name: 'Bukit Timah Nature Reserve',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bukit_Timah_Nature_Reserve%2C_Singapore_-_20150602-01.jpg/800px-Bukit_Timah_Nature_Reserve%2C_Singapore_-_20150602-01.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Bukit Timah Hill is discovered, and the area becomes a focus for scientific study.',
            cardDetailedText: `In 1883, Bukit Timah Hill was discovered, and the area became a focus for scientific study. The diverse flora and fauna in the region attracted researchers, making it an important natural site in Singapore.`,
          },
          {
            title: '1886',
            cardTitle: 'Establishment of Bukit Timah Nature Reserve',
            media: {
              name: 'Bukit Timah Nature Reserve Entrance',
              source: {
                url: 'https://media.gettyimages.com/photos/entrance-to-bukit-timah-nature-reserve-singapore-picture-id1124882762?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Bukit Timah Nature Reserve is officially established.`,
            cardDetailedText: `In 1886, Bukit Timah Nature Reserve was officially established, becoming one of the first nature reserves in the world. The reserve aimed to protect the unique biodiversity of the area.`,
          },
          {
            title: '1951',
            cardTitle: 'Preservation Efforts and Expansion',
            media: {
              name: 'Bukit Timah Nature Reserve Trail',
              source: {
                url: 'https://media.gettyimages.com/photos/bukit-timah-nature-reserve-singapore-picture-id1124882750?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Preservation efforts lead to the expansion of Bukit Timah Nature Reserve.`,
            cardDetailedText: `In 1951, ongoing preservation efforts led to the expansion of Bukit Timah Nature Reserve. Additional land was designated to safeguard the rich biodiversity and ecological importance of the region.`,
          },
          {
            title: 'Present',
            cardTitle: 'Bukit Timah Nature Reserve Today',
            media: {
              name: 'Bukit Timah Nature Reserve Today',
              source: {
                url: 'https://media.gettyimages.com/photos/bukit-timah-nature-reserve-singapore-picture-id622529774?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Bukit Timah Nature Reserve remains a biodiversity hotspot.`,
            cardDetailedText: `Today, Bukit Timah Nature Reserve remains a biodiversity hotspot in Singapore. The reserve is a haven for nature enthusiasts, researchers, and those seeking to explore the diverse ecosystems within an urban setting.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineBotanicGardens = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1859',
            cardTitle: 'Establishment of Singapore Botanic Gardens',
            media: {
              name: 'Singapore Botanic Gardens',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Singapore_Botanic_Gardens_2.jpg/800px-Singapore_Botanic_Gardens_2.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The Singapore Botanic Gardens is established as a colonial botanic garden.',
            cardDetailedText: `In 1859, the Singapore Botanic Gardens was established as a colonial botanic garden. It played a crucial role in the cultivation of plants, horticultural research, and the promotion of agricultural activities during the colonial period.`,
          },
          {
            title: '1877',
            cardTitle: 'Rubber Industry Revolution',
            media: {
              name: 'Rubber Trees at Singapore Botanic Gardens',
              source: {
                url: 'https://media.gettyimages.com/photos/rubber-trees-in-the-singapore-botanic-gardens-picture-id183827766?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Singapore Botanic Gardens contributes to the rubber industry revolution.`,
            cardDetailedText: `In 1877, the Singapore Botanic Gardens played a key role in the rubber industry revolution. The cultivation and experimentation with rubber trees contributed significantly to the economic development of the region.`,
          },
          {
            title: '2015',
            cardTitle: 'UNESCO World Heritage Site Designation',
            media: {
              name: 'UNESCO World Heritage Site Plaque',
              source: {
                url: 'https://media.gettyimages.com/photos/unveiling-of-unesco-world-heritage-site-plaque-for-singapore-botanic-picture-id514164724?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Singapore Botanic Gardens is designated a UNESCO World Heritage Site.`,
            cardDetailedText: `In 2015, the Singapore Botanic Gardens received the prestigious designation as a UNESCO World Heritage Site. The recognition highlighted the cultural and historical significance of the gardens.`,
          },
          {
            title: 'Present',
            cardTitle: 'Botanic Gardens Today',
            media: {
              name: 'Singapore Botanic Gardens Today',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-botanic-gardens-picture-id477794207?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Singapore Botanic Gardens remains a renowned botanical institution.`,
            cardDetailedText: `Today, the Singapore Botanic Gardens remains a renowned botanical institution and a popular destination for locals and visitors. Its lush landscapes, diverse plant collections, and historical significance continue to make it a cherished part of Singapore's heritage.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineMacRitchieReservoir = ({
  timelineClicked,
  setTimelineClicked,
}) => {
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
            title: '1867',
            cardTitle: 'Construction of MacRitchie Reservoir',
            media: {
              name: 'MacRitchie Reservoir Construction',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/MacRitchie_Reservoir.jpg/800px-MacRitchie_Reservoir.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'MacRitchie Reservoir is constructed to store water for the growing population.',
            cardDetailedText: `In 1867, MacRitchie Reservoir was constructed to store water for the growing population of Singapore. The reservoir played a vital role in ensuring a sustainable water supply for the region.`,
          },
          {
            title: '1894',
            cardTitle: 'Introduction of Water Sports',
            media: {
              name: 'Water Sports at MacRitchie Reservoir',
              source: {
                url: 'https://media.gettyimages.com/photos/canoeing-at-macritchie-reservoir-singapore-picture-id497824198?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Water sports are introduced at MacRitchie Reservoir.`,
            cardDetailedText: `In 1894, MacRitchie Reservoir became a popular destination for water sports. Activities such as canoeing and boating added recreational value to the reservoir, attracting locals and tourists alike.`,
          },
          {
            title: '1920',
            cardTitle: 'MacRitchie Nature Trail',
            media: {
              name: 'MacRitchie Nature Trail',
              source: {
                url: 'https://media.gettyimages.com/photos/boardwalk-in-macritchie-reservoir-singapore-picture-id497824172?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The MacRitchie Nature Trail is established.`,
            cardDetailedText: `In 1920, the MacRitchie Nature Trail was established, providing visitors with the opportunity to explore the natural beauty and biodiversity surrounding the reservoir. The trail has since become a popular spot for hiking and nature enthusiasts.`,
          },
          {
            title: 'Present',
            cardTitle: 'MacRitchie Reservoir Park Today',
            media: {
              name: 'MacRitchie Reservoir Park Today',
              source: {
                url: 'https://media.gettyimages.com/photos/macritchie-reservoir-picture-id1044039934?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `MacRitchie Reservoir Park remains a scenic and recreational destination.`,
            cardDetailedText: `Today, MacRitchie Reservoir Park remains a scenic and recreational destination in Singapore. The reservoir, nature trail, and surrounding greenery provide a peaceful retreat for visitors seeking a break from urban life.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineFortCanning = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '14th Century',
            cardTitle: 'Historical Significance of Fort Canning Hill',
            media: {
              name: 'Fort Canning Park',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fort_Canning_Park%2C_Singapore_-_20120128-02.jpg/800px-Fort_Canning_Park%2C_Singapore_-_20120128-02.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Fort Canning Hill holds historical significance dating back to the 14th century.',
            cardDetailedText: `Fort Canning Hill has historical significance dating back to the 14th century, with evidence of ancient settlements. It has witnessed various events, transitions, and developments throughout Singapore's history.`,
          },
          {
            title: '19th Century',
            cardTitle: 'Construction of Fort Canning Reservoir',
            media: {
              name: 'Fort Canning Reservoir',
              source: {
                url: 'https://media.gettyimages.com/photos/fort-canning-singapore-picture-id1170871545?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Fort Canning Reservoir is constructed to enhance water supply.`,
            cardDetailedText: `In the 19th century, Fort Canning Reservoir was constructed to enhance the water supply for the colonial settlement. The reservoir played a crucial role in providing a sustainable water source for the growing population.`,
          },
          {
            title: 'World War II',
            cardTitle: 'Fort Canning as a Military Headquarters',
            media: {
              name: 'Fort Canning Bunker',
              source: {
                url: 'https://media.gettyimages.com/photos/fort-canning-bunker-picture-id1212396004?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Fort Canning serves as a military headquarters during World War II.`,
            cardDetailedText: `During World War II, Fort Canning became a strategic military headquarters. The hill was used for planning and coordination, and remnants of bunkers can still be explored today.`,
          },
          {
            title: 'Present',
            cardTitle: 'Fort Canning Park Today',
            media: {
              name: 'Fort Canning Park Today',
              source: {
                url: 'https://media.gettyimages.com/photos/fort-canning-park-singapore-picture-id1204476252?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Fort Canning Park stands as a historic and recreational landmark.`,
            cardDetailedText: `Today, Fort Canning Park stands as a historic and recreational landmark in Singapore. Visitors can explore the lush greenery, historical sites, and enjoy cultural events within the park.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineGardensByTheBay = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '2006',
            cardTitle: 'Planning and Development Begins',
            media: {
              name: 'Gardens by the Bay',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Gardens_by_the_Bay_at_Dusk%2C_Singapore_-_20130315.jpg/800px-Gardens_by_the_Bay_at_Dusk%2C_Singapore_-_20130315.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Planning and development of Gardens by the Bay begin as part of Singapore\'s vision for a "City in a Garden."',
            cardDetailedText: `In 2006, planning and development of Gardens by the Bay began as part of Singapore's vision for a "City in a Garden." The project aimed to enhance green spaces in the city and create a sustainable, world-class garden.`,
          },
          {
            title: '2011',
            cardTitle: 'Official Opening of Gardens by the Bay',
            media: {
              name: 'Supertree Grove',
              source: {
                url: 'https://media.gettyimages.com/photos/the-supertree-grove-at-gardens-by-the-bay-in-singapore-picture-id157999458?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Gardens by the Bay is officially opened to the public.`,
            cardDetailedText: `In 2011, Gardens by the Bay was officially opened to the public. The iconic Supertree Grove, Flower Dome, and Cloud Forest attractions became instant landmarks in Singapore's landscape.`,
          },
          {
            title: '2012',
            cardTitle: 'UNESCO World Heritage Site Nomination',
            media: {
              name: 'Gardens by the Bay Night View',
              source: {
                url: 'https://media.gettyimages.com/photos/gardens-by-the-bay-singapore-at-night-picture-id182574972?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Gardens by the Bay contributes to Singapore's UNESCO World Heritage Site nomination.`,
            cardDetailedText: `In 2012, Gardens by the Bay contributed to Singapore's UNESCO World Heritage Site nomination. The garden showcases innovative horticulture and sustainable practices.`,
          },
          {
            title: 'Present',
            cardTitle: 'Gardens by the Bay Today',
            media: {
              name: 'Gardens by the Bay Today',
              source: {
                url: 'https://media.gettyimages.com/photos/gardens-by-the-bay-singapore-picture-id1209544050?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Gardens by the Bay continues to be a premier horticultural attraction.`,
            cardDetailedText: `Today, Gardens by the Bay continues to be a premier horticultural attraction, offering visitors a breathtaking blend of nature, art, and sustainable technology. The garden has become a symbol of Singapore's commitment to environmental sustainability and urban greenery.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineMountFaber = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1845',
            cardTitle: 'Discovery of Mount Faber',
            media: {
              name: 'Mount Faber Park',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mount_Faber_Park%2C_Singapore_-_20150811-02.jpg/800px-Mount_Faber_Park%2C_Singapore_-_20150811-02.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Mount Faber is discovered, showcasing lush greenery and panoramic views.',
            cardDetailedText: `In 1845, Mount Faber was discovered, showcasing lush greenery and panoramic views of the surrounding areas. The hill quickly became a popular spot for nature lovers and those seeking scenic landscapes.`,
          },
          {
            title: '1905',
            cardTitle: 'Faber Point Tea Kiosk',
            media: {
              name: 'Faber Point Tea Kiosk',
              source: {
                url: 'https://media.gettyimages.com/photos/tea-kiosk-faber-point-singapore-picture-id1211235459?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Faber Point Tea Kiosk is established.`,
            cardDetailedText: `In 1905, the Faber Point Tea Kiosk was established, providing a quaint spot for visitors to enjoy refreshments while taking in the picturesque views from Mount Faber.`,
          },
          {
            title: '1974',
            cardTitle: 'Development of Mount Faber Park',
            media: {
              name: 'Mount Faber Cable Car',
              source: {
                url: 'https://media.gettyimages.com/photos/the-mount-faber-cable-car-travelling-to-the-top-station-picture-id973869708?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Mount Faber Park undergoes development, including the introduction of a cable car.`,
            cardDetailedText: `In 1974, Mount Faber Park underwent development, including the introduction of the Mount Faber Cable Car, providing visitors with a unique and scenic transportation experience.`,
          },
          {
            title: 'Present',
            cardTitle: 'Mount Faber Park Today',
            media: {
              name: 'Mount Faber Park Today',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-mount-faber-park-viewpoint-picture-id1203835797?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Mount Faber Park remains a cherished nature destination in Singapore.`,
            cardDetailedText: `Today, Mount Faber Park remains a cherished nature destination in Singapore. With its well-maintained trails, iconic viewpoints, and recreational facilities, the park continues to attract locals and tourists alike.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineChekJawa = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '2000',
            cardTitle: 'Discovery and Conservation Efforts Begin',
            media: {
              name: 'Chek Jawa Wetlands',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Chek_Jawa_-_Boardwalk.jpg/800px-Chek_Jawa_-_Boardwalk.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Discovery of Chek Jawa leads to conservation efforts to protect its unique biodiversity.',
            cardDetailedText: `In 2000, the discovery of Chek Jawa's unique ecosystem led to conservation efforts to protect its rich biodiversity. The wetlands became a focal point for environmental awareness and preservation.`,
          },
          {
            title: '2001',
            cardTitle: 'Public Access to Chek Jawa',
            media: {
              name: 'Chek Jawa Boardwalk',
              source: {
                url: 'https://media.gettyimages.com/photos/boardwalk-at-chek-jawa-wetlands-picture-id1176932284?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Chek Jawa is opened to the public with the introduction of a boardwalk.`,
            cardDetailedText: `In 2001, Chek Jawa was opened to the public with the introduction of a boardwalk, allowing visitors to explore the wetlands while minimizing impact on its delicate ecosystem.`,
          },
          {
            title: '2007',
            cardTitle: 'Chek Jawa Visitor Centre',
            media: {
              name: 'Chek Jawa Visitor Centre',
              source: {
                url: 'https://media.gettyimages.com/photos/chek-jawa-wetlands-singapore-picture-id471516567?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Chek Jawa Visitor Centre is established.`,
            cardDetailedText: `In 2007, the Chek Jawa Visitor Centre was established, serving as an educational hub to inform visitors about the importance of wetland ecosystems and the conservation efforts in place.`,
          },
          {
            title: 'Present',
            cardTitle: 'Chek Jawa Wetlands Today',
            media: {
              name: 'Chek Jawa Wetlands Today',
              source: {
                url: 'https://media.gettyimages.com/photos/chek-jawa-singapore-picture-id157312315?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Chek Jawa Wetlands remains a haven for biodiversity and nature enthusiasts.`,
            cardDetailedText: `Today, Chek Jawa Wetlands remains a haven for biodiversity and nature enthusiasts. The ongoing conservation efforts have preserved its unique ecosystems, making it an important landmark for environmental awareness and education.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelinePulauUbin = ({ timelineClicked, setTimelineClicked }) => {
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
            title: 'Early 19th Century',
            cardTitle: 'Settlement on Pulau Ubin',
            media: {
              name: 'Pulau Ubin Village',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Keluang_Beach%2C_Pulau_Ubin%2C_Singapore_-_2007.jpg/800px-Keluang_Beach%2C_Pulau_Ubin%2C_Singapore_-_2007.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Pulau Ubin becomes a settlement with villages and granite quarrying.',
            cardDetailedText: `In the early 19th century, Pulau Ubin became a settlement with villages and granite quarrying activities. The island was home to communities engaged in various trades and activities.`,
          },
          {
            title: 'Mid-20th Century',
            cardTitle: 'Decline in Granite Quarrying',
            media: {
              name: 'Abandoned Granite Quarry',
              source: {
                url: 'https://media.gettyimages.com/photos/abandoned-granite-quarry-on-pulau-ubin-singapore-picture-id693156506?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Granite quarrying on Pulau Ubin experiences a decline.`,
            cardDetailedText: `By the mid-20th century, granite quarrying on Pulau Ubin experienced a decline, leading to the abandonment of some quarries. The island transitioned to a more relaxed and natural state.`,
          },
          {
            title: 'Present',
            cardTitle: 'Pulau Ubin Today',
            media: {
              name: 'Pulau Ubin Landscape',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-pulau-ubin-keluang-hill-landscape-view-picture-id1147549447?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Pulau Ubin is a rustic retreat and a glimpse into Singapore's past.`,
            cardDetailedText: `Today, Pulau Ubin is a rustic retreat and a glimpse into Singapore's past. The island is known for its natural beauty, biodiversity, and as a preserved area that contrasts with the modern urban landscape of Singapore.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

export {
  TimelineBukitTimah,
  TimelineBotanicGardens,
  TimelineMacRitchieReservoir,
  TimelineFortCanning,
  TimelineGardensByTheBay,
  TimelineMountFaber,
  TimelineChekJawa,
  TimelinePulauUbin,
};
