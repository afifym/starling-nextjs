import { useState } from 'react';
import Clock from 'react-live-clock';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  text-align: center;
`;
const DayProgress = () => {
  //   const [time, setTime] = useState(`${22} : ${22} : ${22} ${22}`);

  let timeNow = moment();
  let timeStart = new Date('07:00:00');
  let timeEnd = new Date('24:00:00');
  //   timeStart.setHours(1, 0, 0);
  //   timeEnd.setHours(24, 0, 0);

  //   function realTimeClock() {
  //     timeNow = new Date();
  //     let hours = timeNow.getHours();
  //     let minutes = timeNow.getMinutes();
  //     let seconds = timeNow.getSeconds();
  //     let amPm = hours < 12 ? 'am' : 'pm';
  //     hours = hours === 0 ? 24 : hours;
  //     hours = hours > 12 ? hours - 12 : hours;
  //     hours = ('0' + hours).slice(-2);
  //     minutes = ('0' + minutes).slice(-2);
  //     seconds = ('0' + seconds).slice(-2);

  //     let progress = (timeNow - timeStart) / (timeEnd - timeStart);
  //     document
  //       .querySelector('.todo-progress')
  //       .setAttribute('style', `width: ${progress * 100}%`);
  //     document
  //       .querySelector('.clock')
  //       .setAttribute('style', `left: ${progress * 100}%`);
  //     setTime(`${hours} : ${minutes} : ${seconds} ${amPm}`);
  //     setCurrentPhase(Math.floor(progress * numPhases));

  //   }

  //   setInterval(realTimeClock, 500);

  return (
    <Wrapper id='day-progress'>
      <Clock format={'hh:mm:ss a'} ticking={true} timezone={'Africa/Cairo'} />
    </Wrapper>
  );
};

export default DayProgress;
