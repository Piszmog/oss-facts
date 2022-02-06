import {
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner
} from "@chakra-ui/react";
import Search from "./search";
import {useState} from "react";
import {Repository} from "../lib/models";
import SearchTable from "./searchTable";

/**
 * Properties for the SearchModal component.
 */
type SearchModalProps = {
    isOpen: boolean;
    onClose: () => void;
    added: Repository[];
    onAdd: (result: Repository) => void;
};

/**
 * A modal that allows the user to search for a repository.
 * @param isOpen Whether the modal is open.
 * @param onClose Called when the modal is closed.
 * @param added The list of repositories that have been added.
 * @param onAdd Called when a repository is added.
 */
const SearchModal = ({isOpen, onClose, added, onAdd}: SearchModalProps) => {
    const [results, setResults] = useState<Repository[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={() => {
            onClose();
            setResults([]);
        }}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Search OSS</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Search
                        handleResults={r => {
                            setResults(r);
                            setIsSearching(false);
                        }}
                        onSearch={() => setIsSearching(true)}
                    />
                    {
                        isSearching ?
                            <Center mt={5}>
                                <Spinner/>
                            </Center>
                            :
                            results.length > 0 ?
                                <SearchTable searchResults={results} addedResults={added} onAdd={onAdd}/>
                                :
                                <div/>
                    }
                </ModalBody>

                <ModalFooter>
                    <p>If you do not see your result, try to be more specific - e.g. facebook/react</p>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SearchModal;
