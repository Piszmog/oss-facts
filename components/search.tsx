import {Input, InputGroup} from "@chakra-ui/react";
import React, {FormEvent, useState} from "react";
import {Repository} from "../lib/models";

/**
 * Properties for the Search component.
 */
type SearchInputProps = {
    onSearch: (query: string) => void;
    handleResults: (results: Repository[]) => void;
};

/**
 * Search component.
 * @param handleResults Callback for when the search results are received.
 * @param onSearch Callback for when the search query is changed.
 */
const Search = ({handleResults, onSearch}: SearchInputProps) => {
    const [value, setValue] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        onSearch(value);
        event.preventDefault();
        if (value) {
            fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({query: value})
            })
                .then(res => res.json())
                .then(body => handleResults(body));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <Input placeholder='Search for software - e.g. react or Facebook/react' value={value}
                       onChange={event => setValue(event.target.value)}/>
            </InputGroup>
        </form>
    );
};

export default Search;
