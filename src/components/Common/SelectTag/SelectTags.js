import React, { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './SelectTags.css';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const SelectTags = (props) => {
    
    const [tags, setTags] = props.states;
    //const tagsList = ["C", "C++", "Python", "Javascript", "MathLab", "Fortran"];

    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/tags`)
            .then((res) => res.json())
            .then((data) => {
                setTagsList(data);
            });
    }, []);
    const suggestions = tagsList?.map((language) => {
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
                placeholder="ট্যাগ যুক্ত করুন"
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