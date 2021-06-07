import React from "react";
import Clock from "react-live-clock";
import { Progress } from "@chakra-ui/progress";
import { Badge, Box, VStack } from "@chakra-ui/layout";
import { differenceInMilliseconds } from "date-fns";

import useDayProgress from "./useDayProgress";

const DayProgress: React.FC = () => {
  const { modifiedProgress, setProgress, times } = useDayProgress();

  return (
    <VStack
      position="relative"
      alignItems="center"
      m="auto"
      w="96%"
      id="day-progress"
      pb={4}
    >
      <Box position="relative" h="20px" w="100%">
        <Badge
          variant="solid"
          colorScheme="teal"
          textTransform="lowercase"
          fontWeight={400}
          fontSize="1rem"
          position="absolute"
          left={modifiedProgress * 100 + "%"}
          top={-30}
          style={{ transform: "translateX(-50%)" }}
        >
          <Clock
            onChange={() =>
              setProgress(
                differenceInMilliseconds(new Date(), times.start) /
                  differenceInMilliseconds(times.end, times.start)
              )
            }
            format={"hh:mm:ss a"}
            ticking={true}
            timezone={"Africa/Cairo"}
          />
        </Badge>
        <Progress
          w="100%"
          borderRadius="md"
          colorScheme="teal"
          size="sm"
          value={modifiedProgress * 100}
        />
      </Box>
    </VStack>
  );
};

export default DayProgress;
