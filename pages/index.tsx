import React, {useState} from 'react';
import {Box, Button, Flex, Spacer, useDisclosure} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from "next";
import SearchModal from "../components/searchModal";
import ExportButton from "../components/exportButton";
import SelectedTable from "../components/selectedTable";
import {Repository} from "../lib/models";
import Banner from "../components/banner";
import ImportButton from "../components/importButton";
import {getRepos} from "../lib/http";
import CopyButton from "../components/copyButton";

/**
 * Loads any initial repositories specified in the query param.
 * @param context The context of the request.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
    let initialRepos: Repository[] = [];
    if (context.query.names) {
        const decodedNames = Buffer.from(context.query.names as string, 'base64').toString('ascii');
        const repoNames = decodedNames.split(',');
        initialRepos = await getRepos(repoNames);
    }
    return {
        props: {
            initialRepos
        }
    };
}

/**
 * The main page of the application.
 */
const Home: NextPage = ({initialRepos}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [repos, setRepos] = useState<Repository[]>(initialRepos);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleAdd = async (r: Repository) => {
        const parts = r.fullName.split('/');
        fetch(`/api/advisory/${parts[0]}/${parts[1]}`)
            .then(res => res.json())
            .then(data => {
                r.advisories = data.published;
                setRepos([...repos, r]);
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
                        added={repos}
                        onAdd={handleAdd}
                    />
                </Box>
                <Spacer/>
                <Box>
                    <CopyButton repos={repos}/>
                    <ImportButton handleImport={r => setRepos(r)}/>
                    <ExportButton repos={repos}/>
                </Box>
            </Flex>
            <SelectedTable
                repos={repos}
                onRemove={s => setRepos(repos.filter(v => v.fullName !== s.fullName))}
            />
        </Box>
    );
};

export default Home;
