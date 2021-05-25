import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { differenceInMilliseconds, set } from 'date-fns';
import { updatePhaseType } from '../../firebase/firestore';
import { useAuth } from '../useAuth/useAuth';
var adhan = require('adhan');

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

interface IPhaseContext {
  times: {
    start: Date;
    end: Date;
  };
  setTimes: React.Dispatch<
    SetStateAction<{
      start: Date;
      end: Date;
    }>
  >;
  currentPhase: any;
  setCurrentPhase: React.Dispatch<SetStateAction<any>>;
  phases: number[];
  prayers: any;
  setPhases: React.Dispatch<SetStateAction<number[]>>;
  changePhaseType: (type: boolean) => void;
  isFollowPrayers: boolean;
  setIsFollowPrayers: React.Dispatch<SetStateAction<boolean>>;
  isPrayerTime: boolean;
  setIsPrayerTime: React.Dispatch<SetStateAction<boolean>>;
}

const PhasesContext = createContext<IPhaseContext>(undefined as IPhaseContext);

export function usePhases() {
  return useContext(PhasesContext);
}

var params = adhan.CalculationMethod.MuslimWorldLeague();

const lat = 31.0984699;
const long = 29.769729199999997;
const co = new adhan.Coordinates(lat, long);

const pTimess = new adhan.PrayerTimes(co, new Date(), params);

export const PhasesProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const [times, setTimes] = useState({
    start: set(new Date(), { hours: 7 }),
    end: set(new Date(), { hours: 24 }),
  });
  const [phases, setPhases] = useState([0, 1, 2, 3, 4, 5]);
  const [currentPhase, setCurrentPhase] = useState(1 as any);
  const [prayers, setPrayers] = useState({
    times: pTimess,
    factors: getPrayerFactors(pTimess, times.start, times.end),
  } as any);
  const [isPrayerTime, setIsPrayerTime] = useState(false);
  const [isFollowPrayers, setIsFollowPrayers] = useState(false);

  useEffect(() => {
    // const prayerTimes = new adhan.PrayerTimes(
    //   co,
    //   new Date(),
    //   params
    // );
    // const prayersFactors = getPrayerFactors(
    //   prayerTimes,
    //   times.start,
    //   times.end
    // );
    // setPrayers({ times: prayerTimes, factors: prayersFactors });
    // navigator.geolocation.getCurrentPosition(({ coords }) => {
    //   var params = adhan.CalculationMethod.MuslimWorldLeague();
    //   const prayerTimes = new adhan.PrayerTimes(
    //     new adhan.Coordinates(coords.latitude, coords.longitude),
    //     new Date(),
    //     params
    //   );
    //   const prayersFactors = getPrayerFactors(
    //     prayerTimes,
    //     times.start,
    //     times.end
    //   );
    //   console.log('coords', coords);
    //   console.log('For: ', prayerTimes, prayersFactors);
    //   setPrayers({ times: prayerTimes, factors: prayersFactors });
    // });
  }, []);

  const changePhaseType = (type: boolean): void => {
    console.log('NEW Set: ', type);

    updatePhaseType(currentUser.uid, type);
    setIsFollowPrayers(type);
  };

  const value = {
    times,
    setTimes,
    phases,
    setPhases,
    currentPhase,
    setCurrentPhase,
    prayers,
    changePhaseType,
    isFollowPrayers,
    setIsFollowPrayers,
    isPrayerTime,
    setIsPrayerTime,
    setPrayers,
  };

  return (
    <PhasesContext.Provider value={value}>{children}</PhasesContext.Provider>
  );
};

export default PhasesProvider;
