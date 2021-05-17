import React, { useEffect, useState } from 'react';
import { useTodos } from '../../../../logic/useTodos/useTodos';
import styled, { css } from 'styled-components';
import { ITag } from '../../../../config/interfaces';
import { accents } from '../../../../config/styles/theme';
import { FaEdit } from 'react-icons/fa';
import TagForm from './TagForm/TagForm';
import { tags as userTags } from '../../../../logic/useTodos/useTodos';

interface IProps {
  id: string;
  isExpanded: boolean;
}

const Tags: React.FC<IProps> = ({ id, isExpanded }) => {
  const { getTodo } = useTodos();
  const [tags, setTags] = useState<ITag[]>([] as ITag[]);
  const [tagToChange, setTagToChange] = useState('');

  useEffect(() => {
    const tagsArr = [];
    const todo = getTodo(id);
    todo.tags.forEach((tagId) => {
      const tag = userTags.find((item) => item.id === tagId);
      tagsArr.push(tag);
    });
    setTags(tagsArr);
  }, []);

  return (
    <Wrapper>
      <ul className='tags-list'>
        {tags.map((tag, i) => (
          <li
            onClick={() => setTagToChange(tag.id)}
            className='tag-item'
            key={i}
          >
            <Tag color={accents[tag.color]}>
              {tag.name}{' '}
              {isExpanded && (
                <FaEdit style={{ marginLeft: '0.5em' }} size={12} />
              )}
            </Tag>
          </li>
        ))}
      </ul>
      {isExpanded && tagToChange !== '' && <TagForm id={tagToChange} />}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  /* position: absolute; */
  z-index: 10;
  top: 43px;
  left: 1em;

  .tags-list {
    display: flex;
  }
`;

export const Tag = styled.p<{ color: string }>`
  cursor: pointer;
  margin-right: 0.3em;
  padding: 0.3em 0.5em;

  display: flex;
  align-items: center;

  font-size: 0.85rem;
  font-weight: 500;

  border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius2};
  background-color: ${({ color }) => color};

  span {
    margin-left: 0.5em;
  }
`;
