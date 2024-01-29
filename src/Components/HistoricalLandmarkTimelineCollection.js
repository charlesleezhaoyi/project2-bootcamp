import React from 'react';
import { Box } from '@mui/material';
import {
  Timeline,
  TimelineOldHill,
  TimelineFordFactory,
  TimelineChangiMuseum,
  TimelineKranjiWarMemorial,
  TimelineBukitChandu,
  TimelineFortCanningHill,
  TimelineCivilianWarMemorial,
} from './Timelines/TimelineHistorical';

import {
  TimelineCityHall,
  TimelineFullertonBuilding,
  TimelineIstanaSingapore,
  TimelineNationalGallery,
  TimelinePadang,
  TimelineParliamentHouse,
  TimelineRafflesPlace,
  TimelineSupremeCourt,
} from './Timelines/TimelinePolitical';
import {
  TimelineBotanicGardens,
  TimelineBukitTimah,
  TimelineChekJawa,
  TimelineFortCanning,
  TimelineGardensByTheBay,
  TimelineMacRitchieReservoir,
  TimelineMountFaber,
} from './Timelines/TimelineNature';

const HistoricalLandmarkTimelineCollection = ({
  landmarkName,
  timelineClicked,
  setTimelineClicked,
}) => {
  const getTimelineComponent = () => {
    switch (landmarkName) {
      case 'Raffles Hotel':
        return (
          <Timeline
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Old Hill Street Police Station':
        return (
          <TimelineOldHill
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Former Ford Factory':
        return (
          <TimelineFordFactory
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Changi Chapel and Museum':
        return (
          <TimelineChangiMuseum
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Kranji War Memorial':
        return (
          <TimelineKranjiWarMemorial
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Bukit Chandu':
        return (
          <TimelineBukitChandu
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Fort Canning Hill':
        return (
          <TimelineFortCanningHill
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Civilian War Memorial':
        return (
          <TimelineCivilianWarMemorial
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      case 'Parliament House':
        return (
          <TimelineParliamentHouse
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Istana Singapore':
        return (
          <TimelineIstanaSingapore
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Supreme Court':
        return (
          <TimelineSupremeCourt
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'City Hall':
        return (
          <TimelineCityHall
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'National Gallery of Singapore':
        return (
          <TimelineNationalGallery
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'The Fullerton Building':
        return (
          <TimelineFullertonBuilding
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'The Padang':
        return (
          <TimelinePadang
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Raffles Place':
        return (
          <TimelineRafflesPlace
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Bukit Timah Nature Reserve':
        return (
          <TimelineBukitTimah
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Singapore Botanic Gardens':
        return (
          <TimelineBotanicGardens
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'MacRitchie Reservoir Park':
        return (
          <TimelineMacRitchieReservoir
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Fort Canning Park':
        return (
          <TimelineFortCanning
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Gardens By The Bay':
        return (
          <TimelineGardensByTheBay
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Mount Faber Park':
        return (
          <TimelineMountFaber
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );

      case 'Chek Jawa Wetlands':
        return (
          <TimelineChekJawa
            timelineClicked={timelineClicked}
            setTimelineClicked={setTimelineClicked}
            mode="VERTICAL_ALTERNATING"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {landmarkName && timelineClicked && (
        <Box className="overlay">{getTimelineComponent()}</Box>
      )}
    </>
  );
};

export default HistoricalLandmarkTimelineCollection;
