import {IconButton, Table, Tbody, Td, Th, Thead, Tooltip, Tr} from "@chakra-ui/react";
import ExternalLink from "./externalLink";
import {CloseIcon} from "@chakra-ui/icons";
import React from "react";
import {Repository} from "../lib/models";
import OverallStatus from "./overallStatus";
import AdvisoryStatus from "./advisoryStatus";

/**
 * Properties for the selected table
 */
type SelectedTableProps = {
    repos: Repository[];
    onRemove: (selected: Repository) => void;
};

/**
 * A table of selected repositories.
 * @param repos The selected repositories.
 * @param onRemove A callback to remove a repository from the list.
 */
const SelectedTable = ({repos, onRemove}: SelectedTableProps) => {
    return (
        <Table variant='striped' mt={5}>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Licenses</Th>
                    <Th>
                        <Tooltip
                            hasArrow
                            label='GitHub Security Advisories builds upon the foundation of the Common Vulnerabilities
                            and Exposures (CVE) list. The security advisory form on GitHub is a standardized form that
                            matches the CVE description format.'
                        >
                            Security Advisories
                        </Tooltip>
                    </Th>
                    <Th>
                        <Tooltip
                            hasArrow
                            label='The overall status of the repository. This is calculated by assessing the License
                            and the Security Advisory status.'
                        >
                            Overall
                        </Tooltip>
                    </Th>
                    <Th/>
                </Tr>
            </Thead>
            <Tbody>
                {
                    repos.map(repo =>
                        <Tr key={repo.fullName}>
                            <Td>
                                <ExternalLink name={repo.fullName} href={repo.url}/>
                            </Td>
                            <Td>
                                {
                                    repo.license ?
                                        <ExternalLink name={repo.license.name} href={repo.license.url}/> :
                                        'No license'
                                }
                            </Td>
                            <Td>
                                <AdvisoryStatus url={repo.url} advisories={repo.advisories}/>
                            </Td>
                            <Td>
                                <OverallStatus repo={repo}/>
                            </Td>
                            <Td>
                                <IconButton
                                    variant='solid'
                                    icon={<CloseIcon/>}
                                    aria-label='Remove'
                                    colorScheme='red'
                                    size='xs'
                                    onClick={() => onRemove(repo)}
                                />
                            </Td>
                        </Tr>
                    )
                }
            </Tbody>
        </Table>
    );
};

export default SelectedTable;
