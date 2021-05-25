import { useState } from 'react';
import Clock from 'react-live-clock';
import { Progress } from '@chakra-ui/progress';
import { Badge, Box, VStack } from '@chakra-ui/layout';
import { differenceInMilliseconds, differenceInMinutes, set } from 'date-fns';
import { usePhases } from '../../logic/usePhases/usePhases';

var adhan = require('adhan');
const prayers: any = {};

const getPrayerFactors = (prayerTimes, timeStart, timeEnd) => {
  const prayerFactors = {
    dhuhr:
      differenceInMilliseconds(prayerTimes['dhuhr'], timeStart) /
      differenceInMilliseconds(timeEnd, timeStart),
    asr:
      differenceInMilliseconds(prayerTimes['asr'], timeStart) /
      differenceInMilliseconds(timeEnd, timeStart),
    maghrib:
      differenceInMilliseconds(prayerTimes['maghrib'], timeStart) /
      differenceInMilliseconds(timeEnd, timeStart),
    isha:
      differenceInMilliseconds(prayerTimes['isha'], timeStart) /
      differenceInMilliseconds(timeEnd, timeStart),
  };

  return prayerFactors;
};
var params = adhan.CalculationMethod.MuslimWorldLeague();
const lat = 31.0984699;
const long = 29.769729199999997;
const co = new adhan.Coordinates(lat, long);
const pTimess = new adhan.PrayerTimes(co, new Date(), params);
prayers.times = pTimess;
const factors = getPrayerFactors(
  pTimess,
  set(new Date(), { hours: 7 }),
  set(new Date(), { hours: 24 })
);
prayers.factors = factors;

const DayProgress: React.FC = () => {
  const { currentPhase, setCurrentPhase, times, isFollowPrayers } = usePhases();
  const [progress, setProgress] = useState(0);

  const handleTimeChange = (): void => {
    const timeNow = new Date();
    let progress =
      differenceInMilliseconds(timeNow, times.start) /
      differenceInMilliseconds(times.end, times.start);

    setProgress(progress);

    const cPrayer = prayers.times?.currentPrayer();
    const currentPrayerTime = prayers.times?.timeForPrayer(cPrayer);

    if (cPrayer && differenceInMinutes(new Date(), currentPrayerTime) < 15) {
      setCurrentPhase(cPrayer);
      return;
    }
  };

  let prog = progress;
  if (isFollowPrayers) {
    if (prog > prayers.factors.isha) {
      prog =
        0.8 +
        ((prog - prayers.factors.isha) * 0.2) / (1 - prayers.factors.isha);
    } else if (prog > prayers.factors.maghrib) {
      prog =
        0.6 +
        ((prog - prayers.factors.maghrib) * 0.2) /
          (prayers.factors.isha - prayers.factors.maghrib);
    } else if (prog > prayers.factors.asr) {
      prog =
        0.4 +
        ((prog - prayers.factors.asr) * 0.2) /
          (prayers.factors.maghrib - prayers.factors.asr);
    } else if (prog > prayers.factors.dhuhr) {
      prog =
        0.2 +
        ((prog - prayers.factors.dhuhr) * 0.2) /
          (prayers.factors.asr - prayers.factors.dhuhr);
    } else {
      prog = (prog * 0.2) / prayers.factors.dhuhr;
    }
  }
  const previousPhase = currentPhase;
  const nextPhase = Math.floor(progress * 5 + 1);
  nextPhase !== previousPhase && setCurrentPhase(nextPhase);

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
          colorScheme='teal'
          textTransform='lowercase'
          fontWeight={400}
          fontSize='1rem'
          position='absolute'
          left={prog * 100 + '%'}
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
          colorScheme='teal'
          size='sm'
          value={prog * 100}
        />
      </Box>
    </VStack>
  );
};

export default DayProgress;
