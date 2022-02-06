import React, {useState} from 'react';
import {Box, Button, Flex, Spacer, useDisclosure} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {NextPage} from "next";
import SearchModal from "../components/searchModal";
import DownloadButton from "../components/downloadButton";
import SelectedTable from "../components/selectedTable";
import {Repository} from "../lib/models";
import Banner from "../components/banner";

/**
 * The main page of the application.
 */
const Home: NextPage = () => {
    const [results, setResults] = useState<Repository[]>([]);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleAdd = async (r: Repository) => {
        const parts = r.fullName.split('/');
        fetch(`/api/advisory/${parts[0]}/${parts[1]}`)
            .then(res => res.json())
            .then(data => {
                r.advisories = data.published;
                setResults([...results, r]);
            });
    };

    return (
        <Box mr={10} ml={10} me={10} mt={2}>
            <Banner/>
            <Flex mt={10}>
                <Box>
                    <Button onClick={onOpen} rightIcon={<SmallAddIcon/>} colorScheme='green'>Add</Button>
                    <SearchModal
                        isOpen={isOpen}
                        onClose={onClose}
                        added={results}
                        onAdd={handleAdd}
                    />
                </Box>
                <Spacer/>
                <Box>
                    <DownloadButton repos={results}/>
                </Box>
            </Flex>
            <SelectedTable
                repos={results}
                onRemove={s => setResults(results.filter(v => v.fullName !== s.fullName))}
            />
        </Box>
    );
}

export default Home
