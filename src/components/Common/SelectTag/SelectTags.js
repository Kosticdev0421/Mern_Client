import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './SelectTags.css';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const SelectTags = (props) => {
    
    const [tags, setTags] = props.states;
    const languages = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];

    const suggestions = languages.map((language) => {
        return {
            id: language,
            text: language,
        };
    });
      
    function handleDelete(i) {
        setTags(tags.filter((tag, index) => index !== i));
    }

    function handleAddition(tag) {
        setTags([...tags, tag]);
    }

    function handleDrag(tag, currPos, newPos) {
        const newTags = [...tags].slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    }

        return (
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    placeholder="প্রশ্নটি কোন বিষয়ের/প্রোগ্রামিং ভাষার?"
                    minQueryLength={1}
                    autofocus={false}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                />
        );

}
export default SelectTags;