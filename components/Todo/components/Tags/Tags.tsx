import React from 'react';
import styled from 'styled-components';
import { ITag } from '../../../../config/interfaces';
import { accents } from '../../../../config/styles/theme';
import { userTags } from '../../../../config/data/mock';
import { Tag } from '@chakra-ui/tag';
import { HStack } from '@chakra-ui/layout';

interface IProps {
  tagsIDs: string[];
}

const Tags: React.FC<IProps> = ({ tagsIDs }) => {
  const tags: ITag[] = userTags.filter((tag) => tagsIDs.includes(tag.id));

  return (
    <HStack>
      {tags.map((tag, i) => (
        <Tag key={i} bg={accents[tag.color]}>
          {tag.name}
        </Tag>
      ))}
    </HStack>
  );
};

export default Tags;

export const TagItem = styled.p<{ color: string }>`
  cursor: pointer;
  margin-right: 0.35em;
  padding: 0.1em 0.7em;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.85rem;
  font-weight: 500;

  border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius2};
  background-color: ${({ color }) => color};

  span {
    margin-left: 0.5em;
  }
`;
