import { differenceInMilliseconds, differenceInMinutes } from 'date-fns';
import { useState } from 'react';
import { usePhases } from '../../logic/usePhases/usePhases';
var adhan = require('adhan');

const prayersArr = ['sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
const getPrayerFactors = (prayerTimes, timeStart: Date, timeEnd: Date) => {
  const prayerFactors = {
    sunrise: 0,
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

const isPrayerInRange = (time: Date, prayerTime: Date): boolean => {
  return !!(
    differenceInMinutes(time, prayerTime) > 0 &&
    differenceInMinutes(time, prayerTime) < 30
  );
};

var params = adhan.CalculationMethod.MuslimWorldLeague();
const lat = 31.0984699;
const long = 29.769729199999997;
const co = new adhan.Coordinates(lat, long);

const useDayProgress = () => {
  const { currentPhase, setCurrentPhase, times, isFollowPrayers } = usePhases();
  const [progress, setProgress] = useState(0);

  const pTimess = new adhan.PrayerTimes(co, new Date(), params);

  const factors = getPrayerFactors(pTimess, times.start, times.end);

  let modifiedProgress = 0;

  if (isFollowPrayers) {
    const currentPrayer = pTimess.currentPrayer();
    const currentPrayerTime = pTimess.timeForPrayer(currentPrayer);

    for (let i = 0; i < 5; i++) {
      if (prayersArr[i] === currentPrayer) {
        const currentPrayerFactor = factors[prayersArr[i]];
        const nextPrayerFactor = factors[prayersArr[i + 1]] || 1;
        const currentPhaseFactor = nextPrayerFactor - currentPrayerFactor;
        const phaseProgress = progress - currentPrayerFactor;
        modifiedProgress += (phaseProgress * 0.2) / currentPhaseFactor;
        break;
      }
      modifiedProgress += 0.2;
    }

    if (isPrayerInRange(new Date(), currentPrayerTime)) {
      currentPhase !== currentPrayer && setCurrentPhase(currentPrayer);
    } else {
      const previousPhase = currentPhase;
      const nextPhase = Math.floor(modifiedProgress * 5 + 1);
      nextPhase !== previousPhase && setCurrentPhase(nextPhase);
    }
  } else {
    modifiedProgress = progress;
    const previousPhase = currentPhase;
    const nextPhase = Math.floor(modifiedProgress * 5 + 1);
    nextPhase !== previousPhase && setCurrentPhase(nextPhase);
  }

  return { modifiedProgress, setProgress, times };
};

export default useDayProgress;
