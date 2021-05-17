import React from 'react';
import { ITodo } from '../../../config/interfaces';
import { useTodos } from '../../../logic/useTodos/useTodos';
import styled, { css } from 'styled-components';

interface IProps {
  phase: number;
}

const Wrapper = styled.div`
  @keyframes next-btn {
    0% {
      transform: scale(1.1);
      opacity: 1;
    }

    100% {
      transform: scale(1.3);
      opacity: 0.1;
    }
  }

  height: 10vh;
  margin-bottom: 2em;

  .next-container {
    width: fit-content;
    margin: auto;

    h6 {
      font-size: 0.8rem;
      margin-bottom: 0.5em;
      text-align: left;
      padding-left: 1em;
      /* transform: translateX(24px); */
    }

    .next-title {
      cursor: pointer;
      width: fit-content;
      padding: 0.5em 1.6em;
      margin: auto;
      color: ${({ theme }) => theme.colors.dark1};

      position: relative;
      border-radius: 48px;
      font-size: 1.5rem;
      background-color: ${({ theme }) => theme.colors.light1};
      filter: drop-shadow(0px 0px 5px #222);

      transition: all 0.3s ease;

      &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;

        border-radius: 48px;
        border: 1px solid ${({ theme }) => theme.colors.light1};
        left: 0;
        top: 0;
        animation: next-btn 1s ease infinite;
      }
    }
  }
`;

const NextTodo: React.FC<IProps> = ({ phase }) => {
  const { todos } = useTodos();
  const nextTodo = todos[phase][0];

  return (
    <Wrapper>
      <div className='next-container'>
        <h6>Next Up:</h6>
        <h1 className='next-title'>{nextTodo.title}</h1>
      </div>
    </Wrapper>
  );
};

export default NextTodo;
