import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
const Search = () => {
    // const [searchQuery, setSearchQuery] = useState("");
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
            <form className="search-form"> {/* onSubmit={handleSearch} */}
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
                            <Link to={`/questions/${question._id}`} className="link-text">
                                <li>{question.questionTitle}</li>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );

    function handleSearch(e) {
        const searchQuery = e.target.value;
        e.preventDefault();
        if (searchQuery.length > 0) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/search?query=${searchQuery}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setSearchResult(data);
                });
        } else {
            setSearchResult("");
        }
    }
    
};

export default Search;