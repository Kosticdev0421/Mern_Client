import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchQuestions } from '../../../api';
import './Search.css';

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);

    return (
        <div
            className="search"
            onBlur={() =>
                setTimeout(() => {
                    setSearchResult("");
                }, 100) //using setTimeOut to be able to click result links
            }
        >
            <form className="search-form" onSubmit={(e) => e.preventDefault()}> {/* onSubmit={handleSearch} */}
                <input
                    type="text"
                    placeholder="Search Your incredible question"
                    onChange={handleSearch}
                />
                <button>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>

            <div className="search-result">
                {searchResult &&
                    searchResult.map((question) => {
                        return (
                            <Link to={`/questions/${question._id}`} className="link-text" key={question._id}>
                                <li>{question.questionTitle}</li>
                            </Link>
                        );
                    })}
            </div>
            
        </div>
    );

    async function handleSearch(e) {
        const searchQuery = e.target.value;
        e.preventDefault();
        if (searchQuery.length > 0) {
            try {
                const { data } = await searchQuestions(searchQuery);
                setSearchResult(data)
            } catch (error) {
                console.log(error);
            }
        } else {
            setSearchResult("");
        }
    }
    
};

export default Search;