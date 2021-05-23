import { useState } from 'react';
import Clock from 'react-live-clock';
import moment from 'moment';
import { Progress } from '@chakra-ui/progress';
import { Badge, Box, VStack } from '@chakra-ui/layout';
import { useTodos } from '../../logic/useTodos/useTodos';

const timeStart = moment().set('hour', 7);
const timeEnd = moment().set('hour', 24);

const DayProgress: React.FC = () => {
  const { phase, setPhase } = useTodos();
  const [progress, setProgress] = useState(0);

  const handleTimeChange = (): void => {
    const timeNow = moment();
    const progress = Math.max(
      0,
      timeNow.diff(timeStart) / timeEnd.diff(timeStart)
    );
    setProgress(progress + 0.25);

    const previousPhase = phase;
    const nextPhase = Math.floor(progress * 5);
    nextPhase !== previousPhase && setPhase(nextPhase);
  };

  return (
    <VStack
      position='relative'
      alignItems='center'
      m='auto'
      w='96%'
      id='day-progress'
      pb={4}
    >
      <Box position='relative' h='20px' w='100%'>
        <Badge
          colorScheme='green'
          fontWeight={400}
          fontSize='1rem'
          position='absolute'
          left={progress * 100 + '%'}
          top={-30}
          style={{ transform: 'translateX(-50%)' }}
        >
          <Clock
            onChange={handleTimeChange}
            format={'hh:mm:ss a'}
            ticking={true}
            timezone={'Africa/Cairo'}
          />
        </Badge>
        <Progress
          w='100%'
          borderRadius='md'
          colorScheme='green'
          size='sm'
          value={progress * 100}
        />
      </Box>
    </VStack>
  );
};

export default DayProgress;
