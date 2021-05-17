import React from 'react';
import styled, { css } from 'styled-components';
import { accents } from '../../../../config/styles/theme';

interface IProps {}

const TodoModal: React.FC<IProps> = ({ formData, handleFormChange }) => {
  return (
    <Wrapper className=''>
      <div className='form-field-wrapper accent'>
        <label htmlFor='accent' className='field-label'>
          Accent
        </label>
        <ul>
          {accents.map((accent, i) => (
            <li key={i}>
              <input
                onChange={handleFormChange}
                type='radio'
                name='accent'
                id={`accent-${i}`}
                value={i}
                checked={i === formData.accent}
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
      <div className='form-field-wrapper type'>
        <label htmlFor='type' className='field-label'>
          Type
        </label>
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
      <div className='form-field-wrapper progress'>
        <label htmlFor='type' className='field-label'>
          Progress
        </label>
        <ul className=''>
          <li>
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
              <GrFormSubtract style={{ color: 'white' }} size={20} />
            </button>
          </li>
          <li>{formData.progress * 100}%</li>

          <li>
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
              <GrFormAdd size={20} />
            </button>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default TodoModal;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.5em;
  padding-top: 3em;
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .form-field-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    display: flex;
    align-items: center;

    ul {
      width: 70%;
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .field-label {
    width: 25%;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.light1};
    text-align: right;
  }

  .progress {
    ul {
      justify-content: space-between;
    }
    button {
      cursor: pointer;

      background-color: ${({ theme }) => theme.colors.dark1};
      color: ${({ theme }) => theme.colors.light1};
      height: 100%;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};

      svg {
        path {
          stroke: ${({ theme }) => theme.colors.light1};
        }
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
  .accent {
    ul {
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
