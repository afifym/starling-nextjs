import { Button, IconButton } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Badge, Box, Center, Flex, HStack, Text } from '@chakra-ui/layout';
import { MenuButton } from '@chakra-ui/menu';
import {
  Menu,
  MenuList,
  MenuItem,
  Collapse,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { colors } from '../../../../../../config/data/mock';
import { ITag, ITodo } from '../../../../../../config/interfaces';
import { useTodos } from '../../../../../../logic/useTodos/useTodos';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiAddLine } from 'react-icons/ri';
import FormWrapper from '../shared/FormWrapper';
import { v4 as uuid } from 'uuid';

interface IProps {
  todo: ITodo;
}

const getTagsInfo = (tagIDs, userTags) => {
  const tagInfo = tagIDs.map((id) => userTags.find((t) => t.id === id) || {});
  return tagInfo;
};

const FormTags: React.FC<IProps> = ({ todo }) => {
  const { changeTags, removeTag, tags, changeUserTags } = useTodos();
  const tagsInfo: ITag[] = getTagsInfo(todo.tags, tags);
  const [isNewTag, setIsNewTag] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    color: 'green',
  });

  const editTag = (tagID, { name, color }) => {
    const tagss = JSON.parse(JSON.stringify(tags));
    const tag = tagss.find((t) => t.id === tagID);
    if (tag) {
      tag.name = name;
      tag.color = color;
    }
    changeUserTags(tags);
  };

  const handleRemoveTag = (tagID: string) => {
    changeTags(todo.id, [...todo.tags.filter((id) => id !== tagID)]);
  };

  const handleAddTag = (tagID: string) => {
    changeTags(todo.id, [...todo.tags, tagID]);
  };

  const handleAddClick = () => {
    if (isNewTag) {
      const newTag = { ...formData, id: uuid() };
      newTag.name = newTag.name || 'new tag';
      changeUserTags([...tags, newTag]);
      setIsNewTag(false);
      setFormData({
        name: '',
        color: 'green',
      });
    } else {
      setIsNewTag(true);
    }
  };

  const deleteTag = (tagID) => {
    removeTag(tagID);
    changeUserTags([...tags.filter((t) => t.id !== tagID)]);
  };

  return (
    <FormWrapper label='Tags'>
      <Box position='relative' zIndex={10}>
        <Menu>
          <MenuButton bg='none' px={0} as={Button}>
            {tagsInfo.length > 0 ? (
              tagsInfo.map((tag, i) => (
                <Badge
                  key={i}
                  textTransform='none'
                  borderRadius='md'
                  py={2}
                  px={3.5}
                  m={1}
                  fontSize='0.9em'
                  colorScheme={tag.color}
                >
                  {tag.name}
                </Badge>
              ))
            ) : (
              <Text px={3}>add tags</Text>
            )}
          </MenuButton>
          <MenuList>
            {tags.map((tag, i) => (
              <TagMenuItem
                key={i}
                isIncluded={todo.tags.includes(tag.id)}
                tag={tag}
                handleAddTag={handleAddTag}
                editTag={editTag}
                handleRemoveTag={handleRemoveTag}
                deleteTag={deleteTag}
              />
            ))}
            <MenuItem>
              <IconButton
                size='sm'
                ml='auto'
                aria-label='new-tag'
                variant={isNewTag ? 'solid' : 'ghost'}
                colorScheme={isNewTag ? 'whatsapp' : 'grey'}
                icon={isNewTag ? <FaCheck /> : <RiAddLine size={18} />}
                onClick={handleAddClick}
              />
            </MenuItem>
            <Collapse in={isNewTag} animateOpacity>
              <CollapseForm formData={formData} setFormData={setFormData} />
            </Collapse>
          </MenuList>
        </Menu>
      </Box>
    </FormWrapper>
  );
};

export default FormTags;

interface ITagMenuItem {
  tag: ITag;
  handleAddTag: (tagID: string) => void;
  editTag: any;
  isIncluded: boolean;
  handleRemoveTag: any;
  deleteTag: any;
}

const TagMenuItem: React.FC<ITagMenuItem> = ({
  tag,
  handleAddTag,
  editTag,
  isIncluded,
  handleRemoveTag,
  deleteTag,
}) => {
  const [isEditingTag, setIsEditingTag] = useState(false);

  const [formData, setFormData] = useState({
    name: tag.name,
    color: tag.color,
  });

  const handleEditClick = (e) => {
    e.stopPropagation();

    if (isEditingTag) {
      editTag(tag.id, { ...formData });
      setIsEditingTag(false);
    } else {
      setIsEditingTag(true);
    }
  };

  const handleTagClick = () => {
    if (isIncluded) {
      handleRemoveTag(tag.id);
    } else {
      handleAddTag(tag.id);
    }
  };

  const handleRemoveClick = () => {
    deleteTag(tag.id);
    setIsEditingTag(false);
  };

  return (
    <Box>
      <MenuItem onClick={handleTagClick} bg='grey.400'>
        <Flex w='100%' alignItems='center' justifyContent='space-between'>
          <Badge
            opacity={isIncluded ? '0.4' : '1'}
            textTransform='none'
            borderRadius='md'
            py={2}
            px={3.5}
            fontSize='0.9em'
            colorScheme={tag.color}
          >
            {tag.name}
          </Badge>
          <Box>
            {isEditingTag && (
              <IconButton
                mr={2}
                variant='ghost'
                colorScheme='red'
                size='md'
                icon={<FaTrash />}
                aria-label='edit-tags'
                onClick={handleRemoveClick}
              />
            )}
            <IconButton
              variant={isEditingTag ? 'solid' : 'ghost'}
              colorScheme={isEditingTag ? 'whatsapp' : 'grey'}
              size='sm'
              icon={isEditingTag ? <FaCheck /> : <RiEdit2Fill />}
              aria-label='edit-tags'
              onClick={handleEditClick}
            />
          </Box>
        </Flex>
      </MenuItem>
      <Collapse in={isEditingTag} animateOpacity>
        <CollapseForm formData={formData} setFormData={setFormData} />
      </Collapse>
    </Box>
  );
};

interface IFormItem {
  formData: any;
  setFormData: any;
}

const CollapseForm: React.FC<IFormItem> = ({ formData, setFormData }) => {
  return (
    <Center px={4} py={4} w='150px'>
      <FormControl>
        <Box mb={3}>
          <Input
            required
            w='150px'
            placeholder='tag name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Box>
        <FormColors formData={formData} setFormData={setFormData} />
      </FormControl>
    </Center>
  );
};

const FormColors: React.FC<IFormItem> = ({ formData, setFormData }) => {
  const options = colors;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'color',
    defaultValue: formData.color,
    onChange: (val) => setFormData({ ...formData, color: val }),
  });

  const group = getRootProps();

  return (
    <FormControl>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <ColorRadio key={value} {...radio}>
              {value}
            </ColorRadio>
          );
        })}
      </HStack>
    </FormControl>
  );
};

const ColorRadio = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='3px'
        borderRadius='sm'
        boxShadow='sm'
        _checked={{
          color: 'white',
          borderColor: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={2}
        py={2}
        bgColor={props.children}
      />
    </Box>
  );
};
