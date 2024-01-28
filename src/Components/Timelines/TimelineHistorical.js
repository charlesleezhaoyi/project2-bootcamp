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

const TimelineFordFactory = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1942',
            cardTitle: 'Japanese Occupation and Ford Factory',
            media: {
              name: 'Former Ford Factory',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Former_Ford_Factory%2C_21_Apr_06.JPG/800px-Former_Ford_Factory%2C_21_Apr_06.JPG',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'During the Japanese Occupation, the Former Ford Factory in Singapore played a significant role.',
            cardDetailedText: `The Former Ford Factory, located in Bukit Timah, Singapore, is known for its historical significance during World War II. In 1942, it became the site where the Japanese forces surrendered to the British, marking the end of the Battle of Singapore. The factory also served as a location for the internment of Allied prisoners of war.`,
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
            cardSubtitle: `Singapore gains independence from Malaysia.`,
            cardDetailedText: `On August 9, 1965, Singapore officially gained independence from Malaysia. The separation marked the end of a short-lived merger between the two countries. The independence of Singapore led to the formation of the Republic of Singapore, and it became a sovereign nation.`,
          },
          {
            title: '1990',
            cardTitle: 'Lee Kuan Yew Steps Down',
            media: {
              name: 'Lee Kuan Yew',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Lee_Kuan_Yew_in_March_1999.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Lee Kuan Yew steps down as Prime Minister.`,
            cardDetailedText: `In 1990, Lee Kuan Yew, the founding Prime Minister of Singapore, stepped down from his position after over three decades of leadership. His decision marked a transition in Singaporean politics and paved the way for a new era under the leadership of his successor, Goh Chok Tong.`,
          },
          {
            title: 'Present',
            cardTitle: 'Historical Landmark',
            media: {
              name: 'Former Ford Factory',
              source: {
                url: 'https://media.gettyimages.com/photos/interior-of-the-former-ford-factory-which-was-used-as-a-surrender-in-picture-id1221889749?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Former Ford Factory stands as a historical landmark in Singapore today.`,
            cardDetailedText: `Nowadays, the Former Ford Factory serves as a museum and memorial, preserving the memory of the war years in Singapore. Visitors can explore exhibits and learn about the historical events that took place within its walls during the tumultuous period of the Japanese Occupation.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineChangiMuseum = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1942',
            cardTitle: 'Japanese Occupation and Changi Chapel and Museum',
            media: {
              name: 'Changi Chapel and Museum',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Changi_Chapel_and_Museum_%28Front%29%2C_Singapore_-_20140713.jpg/800px-Changi_Chapel_and_Museum_%28Front%29%2C_Singapore_-_20140713.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'During the Japanese Occupation, Changi Chapel and Museum in Singapore played a significant role.',
            cardDetailedText: `Changi Chapel and Museum, located in Changi, Singapore, is known for its historical significance during World War II. In 1942, it witnessed the suffering of prisoners of war during the Japanese Occupation. The museum today stands as a testament to the resilience and courage of those who lived through those challenging times.`,
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
            cardSubtitle: `Singapore gains independence from Malaysia.`,
            cardDetailedText: `On August 9, 1965, Singapore officially gained independence from Malaysia. The separation marked the end of a short-lived merger between the two countries. The independence of Singapore led to the formation of the Republic of Singapore, and it became a sovereign nation.`,
          },
          {
            title: '1990',
            cardTitle: 'Lee Kuan Yew Steps Down',
            media: {
              name: 'Lee Kuan Yew',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Lee_Kuan_Yew_in_March_1999.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Lee Kuan Yew steps down as Prime Minister.`,
            cardDetailedText: `In 1990, Lee Kuan Yew, the founding Prime Minister of Singapore, stepped down from his position after over three decades of leadership. His decision marked a transition in Singaporean politics and paved the way for a new era under the leadership of his successor, Goh Chok Tong.`,
          },
          {
            title: 'Present',
            cardTitle: 'Historical Landmark',
            media: {
              name: 'Changi Chapel and Museum',
              source: {
                url: 'https://media.gettyimages.com/photos/changi-chapel-and-museum-entrance-picture-id1159622139?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Changi Chapel and Museum stands as a historical landmark in Singapore today.`,
            cardDetailedText: `Changi Chapel and Museum serves as a poignant reminder of the wartime experiences of those in Singapore. It is a place of remembrance and education, where visitors can gain insights into the sacrifices made and the resilience shown during World War II.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineKranjiWarMemorial = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1942',
            cardTitle: 'Japanese Occupation and Kranji War Memorial',
            media: {
              name: 'Kranji War Memorial',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kranji_War_Cemetery.JPG/800px-Kranji_War_Cemetery.JPG',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'During the Japanese Occupation, Kranji War Memorial in Singapore played a significant role.',
            cardDetailedText: `Kranji War Memorial, located in Kranji, Singapore, holds historical significance from World War II. In 1942, it witnessed the challenges and sacrifices of those who fought during the Japanese Occupation. The memorial stands as a tribute to the men and women who gave their lives in the defense of freedom and justice.`,
          },
          {
            title: '1967',
            cardTitle: 'Dedication of Kranji War Memorial',
            media: {
              name: 'Kranji War Memorial Dedication',
              source: {
                url: 'https://media.gettyimages.com/photos/the-dedication-of-the-kranji-war-cemetery-and-memorial-singapore-18th-picture-id185727371?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Kranji War Memorial is officially dedicated to honor the fallen.`,
            cardDetailedText: `On a solemn occasion in 1967, the Kranji War Memorial was officially dedicated to honor the memory of the servicemen and women who sacrificed their lives during World War II. The dedication ceremony marked the commitment to preserving the legacy of those who fought and ensuring that their sacrifices would not be forgotten.`,
          },
          {
            title: '1971',
            cardTitle: 'Expansion of Kranji War Memorial',
            media: {
              name: 'Kranji War Memorial Expansion',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-kranji-war-cemetery-picture-id1132366475?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Kranji War Memorial undergoes expansion to accommodate more graves.`,
            cardDetailedText: `In 1971, recognizing the need for additional space, the Kranji War Memorial underwent expansion to accommodate more graves. The expansion allowed for the inclusion of additional servicemen and women who had served during World War II, ensuring their resting place within the memorial.`,
          },
          {
            title: 'Present',
            cardTitle: 'Historical Landmark',
            media: {
              name: 'Kranji War Memorial',
              source: {
                url: 'https://media.gettyimages.com/photos/kranji-war-cemetery-and-memorial-picture-id1159578379?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Kranji War Memorial stands as a historical landmark in Singapore today.`,
            cardDetailedText: `Today, Kranji War Memorial is a solemn place of remembrance and reflection. It commemorates the lives of those who fought and died in the line of duty during World War II. The memorial serves as a tribute to the bravery and sacrifice of the servicemen and women who contributed to the defense of Singapore and the region.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineBukitChandu = ({ timelineClicked, setTimelineClicked }) => {
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
            title: '1942',
            cardTitle: 'Battle of Pasir Panjang and Bukit Chandu',
            media: {
              name: 'Reflections at Bukit Chandu',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Reflections_at_Bukit_Chandu.JPG/800px-Reflections_at_Bukit_Chandu.JPG',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'During the Battle of Pasir Panjang, Bukit Chandu in Singapore played a crucial role.',
            cardDetailedText: `Bukit Chandu, located in Pasir Panjang, Singapore, was the site of intense fighting during the Battle of Pasir Panjang in 1942. It was a critical moment in World War II, where Allied forces made a last stand against the advancing Japanese. The location is now commemorated as "Reflections at Bukit Chandu," dedicated to preserving the memory of the battle and the heroism displayed by the soldiers.`,
          },
          {
            title: '1988',
            cardTitle: 'Opening of Reflections at Bukit Chandu',
            media: {
              name: 'Reflections at Bukit Chandu Opening',
              source: {
                url: 'https://media.gettyimages.com/photos/reflections-at-bukit-chandu-singapore-picture-id184539633?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Reflections at Bukit Chandu opens to the public.`,
            cardDetailedText: `In 1988, Reflections at Bukit Chandu was officially opened to the public. The museum and interpretive center aim to provide insights into the Battle of Pasir Panjang and the experiences of those involved. It serves as a memorial to the soldiers who fought bravely during the battle and educates visitors about the wartime history of Singapore.`,
          },
          {
            title: '1997',
            cardTitle: 'Designation as National Monument',
            media: {
              name: 'Reflections at Bukit Chandu National Monument',
              source: {
                url: 'https://media.gettyimages.com/photos/reflections-at-bukit-chandu-singapore-picture-id86209273?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Reflections at Bukit Chandu is designated as a National Monument.`,
            cardDetailedText: `In 1997, recognizing its historical significance, Reflections at Bukit Chandu was designated as a National Monument of Singapore. The acknowledgment underscores the importance of preserving the site as part of the nation's heritage and honoring the sacrifices made during the Battle of Pasir Panjang.`,
          },
          {
            title: 'Present',
            cardTitle: 'Historical Landmark',
            media: {
              name: 'Reflections at Bukit Chandu',
              source: {
                url: 'https://media.gettyimages.com/photos/reflections-at-bukit-chandu-singapore-picture-id184539633?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Reflections at Bukit Chandu stands as a historical landmark in Singapore today.`,
            cardDetailedText: `Today, Reflections at Bukit Chandu continues to be a place of reflection and remembrance. It stands as a testament to the courage and sacrifice of those who defended Singapore during the Battle of Pasir Panjang. The museum invites visitors to learn about the wartime history of the region and the resilience of the people during challenging times.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineFortCanningHill = ({ timelineClicked, setTimelineClicked }) => {
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
              name: 'Fort Canning Hill',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fort_Canning_Park%2C_Singapore_-_20190209.jpg/800px-Fort_Canning_Park%2C_Singapore_-_20190209.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'Fort Canning Hill has historical significance dating back to the 14th century.',
            cardDetailedText: `Fort Canning Hill has been a site of historical importance for centuries. In the 14th century, it was known as Bukit Larangan, meaning "Forbidden Hill" in Malay. The hill has witnessed various chapters in Singapore's history, from ancient times through colonial periods to the present day.`,
          },
          {
            title: '19th Century',
            cardTitle: 'Colonial Era and Fort Canning Residency',
            media: {
              name: 'Fort Canning Residency',
              source: {
                url: 'https://media.gettyimages.com/photos/fort-canning-singapore-picture-id148012092?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Fort Canning served as the site for the official residence of colonial governors.`,
            cardDetailedText: `During the 19th century, Fort Canning Hill became the site for the official residence of colonial governors, known as Fort Canning Residency. The hill played a crucial role in the colonial administration, overlooking the surrounding areas and serving as a strategic location for governance.`,
          },
          {
            title: 'World War II',
            cardTitle: 'Fort Canning as a Military Headquarters',
            media: {
              name: 'Fort Canning Bunker',
              source: {
                url: 'https://media.gettyimages.com/photos/tourist-visited-to-fort-canning-park-in-singapore-picture-id1139302983?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `During World War II, Fort Canning was used as a military headquarters.`,
            cardDetailedText: `In World War II, Fort Canning Hill served a strategic role as a military headquarters. The hill was equipped with bunkers and tunnels to coordinate defense efforts. It witnessed significant events during the war and played a part in the history of Singapore's wartime experience.`,
          },
          {
            title: 'Present',
            cardTitle: 'Cultural and Recreational Hub',
            media: {
              name: 'Fort Canning Green',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-cityscape-with-fort-canning-hill-at-night-picture-id848598642?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `Fort Canning Hill is a cultural and recreational hub in present times.`,
            cardDetailedText: `Today, Fort Canning Hill has transformed into a cultural and recreational hub. It hosts events, concerts, and cultural activities. The hill's lush greenery, historical artifacts, and iconic landmarks make it a popular destination for both locals and tourists, preserving its historical legacy while embracing modern uses.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

const TimelineCivilianWarMemorial = ({
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
            title: '1942-1945',
            cardTitle: 'Japanese Occupation and the Sook Ching Massacres',
            media: {
              name: 'Civilian War Memorial',
              source: {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Civilian_War_Memorial%2C_Singapore_-_20190613.jpg/800px-Civilian_War_Memorial%2C_Singapore_-_20190613.jpg',
              },
              type: 'IMAGE',
            },
            cardSubtitle:
              'The Civilian War Memorial commemorates those who suffered during the Japanese Occupation and the Sook Ching Massacres.',
            cardDetailedText: `The Civilian War Memorial in Singapore commemorates the civilians who suffered during the Japanese Occupation from 1942 to 1945 and the tragic events of the Sook Ching Massacres. The memorial stands as a poignant reminder of the hardships faced by the local population during this period of World War II.`,
          },
          {
            title: '1967',
            cardTitle: 'Construction and Unveiling',
            media: {
              name: 'Civilian War Memorial Unveiling',
              source: {
                url: 'https://media.gettyimages.com/photos/the-civilian-war-memorial-at-beach-road-in-singapore-1967-picture-id505342890?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Civilian War Memorial is constructed and officially unveiled.`,
            cardDetailedText: `In 1967, the Civilian War Memorial was constructed and officially unveiled. The monument was erected to honor the civilian victims of the Japanese Occupation and to memorialize the lives lost during the Sook Ching Massacres. It serves as a symbol of remembrance and reflection for future generations.`,
          },
          {
            title: '1987',
            cardTitle: 'Designation as a National Monument',
            media: {
              name: 'Civilian War Memorial National Monument Plaque',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-national-monument-sign-civilian-war-memorial-picture-id1316191565?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Civilian War Memorial is designated as a National Monument.`,
            cardDetailedText: `In 1987, recognizing its historical and cultural significance, the Civilian War Memorial was designated as a National Monument of Singapore. The designation highlights the importance of preserving the site and its memory for future generations.`,
          },
          {
            title: 'Present',
            cardTitle: 'Symbol of Remembrance',
            media: {
              name: 'Civilian War Memorial',
              source: {
                url: 'https://media.gettyimages.com/photos/singapore-cityscape-with-civilian-war-memorial-in-the-foreground-picture-id544198620?s=2048x2048',
              },
              type: 'IMAGE',
            },
            cardSubtitle: `The Civilian War Memorial stands as a symbol of remembrance in present times.`,
            cardDetailedText: `Today, the Civilian War Memorial stands as a solemn symbol of remembrance in Singapore. It is a place where people can pay tribute to the civilian victims of war and reflect on the resilience and strength of the community during challenging times. The monument continues to be a significant landmark in the cityscape.`,
          },
        ]}
        mode="VERTICAL_ALTERNATING"
      />
    </>
  );
};

export {
  Timeline,
  TimelineOldHill,
  TimelineFordFactory,
  TimelineChangiMuseum,
  TimelineKranjiWarMemorial,
  TimelineBukitChandu,
  TimelineFortCanningHill,
  TimelineCivilianWarMemorial,
};
