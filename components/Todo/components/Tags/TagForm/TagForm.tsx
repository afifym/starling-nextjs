import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { accents } from '../../../../../config/styles/theme';
import { ITag } from '../../../../../config/interfaces';
import { TagItem } from '../Tags';
import { userTags } from '../../../../../config/data/mock';

interface IProps {
  id: string;
}

const TagForm: React.FC<IProps> = ({ id }) => {
  const [formData, setFormData] = useState<ITag>({
    name: '',
    color: 0,
  } as ITag);

  useEffect(() => {
    const tag = userTags.find((item) => item.id === id);
    setFormData(tag);
  }, [id]);

  const handleNameClick = (e) => {
    e.stopPropagation();
  };

  console.log('TAG FORM: ', formData);

  return (
    <Wrapper>
      <form className=''>
        <div className='name-field'>
          <input
            type='text'
            placeholder='e.g. habit'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            onClick={handleNameClick}
          />
        </div>
        <div className='color-field'>
          <ul>
            {accents.map((accent, i) => (
              <li key={i}>
                <input
                  onChange={() => setFormData({ ...formData })}
                  type='radio'
                  name='color'
                  id={`color-${i}`}
                  value={i}
                  checked={i === formData.color}
                />
                <label
                  style={{ backgroundColor: accent }}
                  htmlFor={`color-${i}`}
                  className={`color-${i}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </form>
      <div className='user-tags'>
        <p>Your Tags</p>
        <ul>
          {userTags.map((tag) => (
            <Tag color={accents[tag.color]} key={tag.id}>
              {tag.name}
            </Tag>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};
export default TagForm;

const Wrapper = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: absolute;
  top: 30px;
  z-index: 10;

  border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};
  background-color: ${({ theme }) => theme.colors.dark1};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .name-field {
    input {
      height: 30px;
      padding: 0.2em;

      color: ${({ theme }) => theme.colors.dark1};
      border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};
      outline: none;
      border: none;
    }
  }

  .name-field,
  .color-field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .color-field {
    margin: 0.5em 0;
    display: flex;
    align-items: center;

    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        display: flex;
        align-items: center;
      }

      label {
        cursor: pointer;
        display: block;
        width: 25px;
        height: 25px;
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

  .user-tags {
    display: flex;
    flex-direction: column;
    align-items: center;

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin: 0 0.2em;

        p {
          padding: 0.5em;
          border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius2};
        }
      }
    }
  }
`;
