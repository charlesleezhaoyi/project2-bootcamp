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

import { TimelineParliamentHouse } from './Timelines/TimelinePolitical';

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
