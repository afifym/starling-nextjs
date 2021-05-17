import { useState } from 'react';
import Clock from 'react-live-clock';
import styled from 'styled-components';
import moment from 'moment';
import NextTodo from './NextTodo/NextTodo';

const Wrapper = styled.div`
  text-align: center;
  margin: 2em auto;
  width: 90%;
  position: relative;

  .clock {
    position: absolute;
    transform: translateX(-50%);
    top: -30px;
  }

  .progress-container {
    height: 20px;
    width: 100%;
    position: relative;

    .gray-bar {
      background-color: ${({ theme }) => theme.colors.dark3};
      border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};
      opacity: 0.7;
      height: 100%;
      width: 100%;
    }

    .green-bar {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};

      background-color: green;
      height: 100%;
      width: 40px;
    }
  }
`;

const timeStart = moment().set('hour', 7);
const timeEnd = moment().set('hour', 24);

const DayProgress: React.FC = () => {
  const [phase, setPhase] = useState(0);
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

    // console.log('Day Progress: ', progress);
  };

  return (
    <Wrapper className='' id='day-progress'>
      <header>
        <NextTodo phase={phase} />
      </header>
      <div className='progress-container'>
        <div className='clock' style={{ left: progress * 100 + '%' }}>
          <Clock
            onChange={handleTimeChange}
            format={'hh:mm:ss a'}
            ticking={true}
            timezone={'Africa/Cairo'}
          />
        </div>
        <div className='gray-bar'>
          <span
            className='green-bar'
            style={{ width: progress * 100 + '%' }}
          ></span>
        </div>
      </div>
    </Wrapper>
  );
};

export default DayProgress;
