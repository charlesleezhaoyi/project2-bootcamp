import React from 'react';
import { Box } from '@mui/material';
import { TimelineParliamentHouse } from './Timelines/TimelinePolitical';

const PoliticalLandmarkTimelineCollection = ({
  landmarkName,
  timelineClicked,
  setTimelineClicked,
}) => {
  const getTimelineComponent = () => {
    switch (landmarkName) {
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

export default PoliticalLandmarkTimelineCollection;
