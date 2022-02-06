import {Repository} from "../lib/models";
import {IconButton, Table, Tbody, Td, Thead, Tr} from "@chakra-ui/react";
import {AddIcon, CheckIcon} from "@chakra-ui/icons";

/**
 * Properties for the search table component.
 */
type SearchTableProps = {
    searchResults: Repository[];
    addedResults: Repository[];
    onAdd: (result: Repository) => void;
}

/**
 * The search table component.
 * @param searchResults The search results.
 * @param addedResults The added results.
 * @param onAdd The function to call when a result is added.
 */
const SearchTable = ({searchResults, addedResults, onAdd}: SearchTableProps) => {
    return (
        <Table colorScheme='teal'>
            <Thead>
                <Tr>
                    <Td>Top 5 Results</Td>
                    <Td/>
                </Tr>
            </Thead>
            {
                searchResults.map(result => (
                    <Tbody key={result.fullName}>
                        <Tr>
                            <Td>{result.fullName}</Td>
                            <Td>
                                {
                                    addedResults.find(r => r.fullName === result.fullName) ?
                                        <IconButton
                                            aria-label={`Added ${result.fullName}`}
                                            icon={<CheckIcon/>}
                                            colorScheme="green"
                                            size="xs"
                                            disabled
                                        />
                                        :
                                        <IconButton
                                            aria-label={`Add ${result.fullName}`}
                                            variant='solid'
                                            colorScheme='teal'
                                            size='xs'
                                            icon={<AddIcon/>}
                                            onClick={() => onAdd(result)}
                                        />
                                }
                            </Td>
                        </Tr>
                    </Tbody>
                ))
            }
        </Table>
    );
}

export default SearchTable;
