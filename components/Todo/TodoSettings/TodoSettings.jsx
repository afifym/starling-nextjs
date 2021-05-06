import React, { useState } from 'react';
import styled from 'styled-components';
import { accents } from '../../../styles/theme';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 1em;

  label {
    width: 20%;
    color: black;
    font-weight: bold;
  }
  h4 {
    color: black;
  }

  .accent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ul {
      display: flex;
      align-items: center;
      height: 25px;

      li {
        display: flex;
        align-items: center;
      }
      label {
        cursor: pointer;
        display: block;
        width: 25px;
        height: 25px;
        margin: 0 0.2em;
      }
      input {
        padding: 0;
        margin: 0;
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + label {
          border: 3px solid rgb(192, 192, 192);
          border-radius: 50%;
        }
      }
    }
  }
`;

const TodoSettings = ({ formData, handleFormChange }) => {
  return (
    <Wrapper className=''>
      <div className='form-control accent'>
        <label htmlFor='accent'>Accent</label>
        <ul className=''>
          {accents.map((accent, i) => (
            <li key={i}>
              <input
                onChange={handleFormChange}
                type='radio'
                name='accent'
                id={`accent-${i}`}
                value={i}
              />
              <label
                style={{ backgroundColor: accent }}
                htmlFor={`accent-${i}`}
                className={`accent-${i}`}
              ></label>
            </li>
          ))}
        </ul>
      </div>
      <div className='form-control type'>
        <label htmlFor='type'>Type</label>
        <ul className=''>
          {['task', 'habit', 'goal'].map((type, i) => (
            <li key={i}>
              <input
                onChange={handleFormChange}
                type='radio'
                name='type'
                id={`type-${i}`}
                value={type}
              />
              <label htmlFor={`type-${i}`} className={`type-${i}`}>
                {type}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className=' form-control progress'>
        <label htmlFor='type'>Progress</label>
        <ul className=''>
          <button
            onClick={() =>
              handleFormChange({
                target: {
                  name: 'progress',
                  value: Math.min(1, formData.progress + 0.25),
                },
              })
            }
          >
            +
          </button>
          <button
            onClick={() =>
              handleFormChange({
                target: {
                  name: 'progress',
                  value: Math.max(0, formData.progress - 0.25),
                },
              })
            }
          >
            -
          </button>
        </ul>
      </div>
    </Wrapper>
  );
};

export default TodoSettings;
