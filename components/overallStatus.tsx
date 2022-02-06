import {Box, Heading, ListItem, StackDivider, Tooltip, UnorderedList, VStack} from "@chakra-ui/react";
import {CheckCircleIcon, WarningIcon, WarningTwoIcon} from "@chakra-ui/icons";
import React from "react";
import {Repository} from "../lib/models";
import {gradeLicense, LicenseRating} from "../lib/license";

/**
 * Properties for the overall status component.
 */
type OverallStatusProps = {
    repo: Repository;
};

/**
 * Overall status of a repository.
 * @param repo Repository to display status for.
 */
const OverallStatus = ({repo}: OverallStatusProps) => {
    // determine how friendly the license is
    const licenseGrade = gradeLicense(repo.license);

    let overallIcon;
    switch (licenseGrade.rating) {
        case LicenseRating.GOOD:
            overallIcon = <CheckCircleIcon color='green'/>;
            break;
        case LicenseRating.QUESTIONABLE:
            overallIcon = <WarningTwoIcon color='yellow'/>;
            break;
        case LicenseRating.BAD:
            overallIcon = <WarningIcon color='red'/>;
            break;
    }

    // factor in the security advisory count
    if (licenseGrade.rating === LicenseRating.GOOD && repo.advisories > 0) {
        overallIcon = <WarningTwoIcon color='yellow'/>;
    } else if (licenseGrade.rating === LicenseRating.QUESTIONABLE && repo.advisories > 0) {
        overallIcon = <WarningIcon color='red'/>;
    }

    return (
        <Tooltip
            hasArrow
            label={
                <VStack divider={<StackDivider borderColor='gray.200'/>} spacing={4} align='stretch'>
                    <Box>
                        <Heading size='md'>Licensing</Heading>
                        {
                            licenseGrade.reasons.length > 0 ?
                                <UnorderedList>
                                    {
                                        licenseGrade.reasons.map((reason, index) => (
                                            <ListItem key={index}>
                                                {reason}
                                            </ListItem>
                                        ))
                                    }
                                </UnorderedList>
                                :
                                <i>No concerning conditions on the license</i>
                        }
                    </Box>
                    <Box>
                        <Heading size='md'>Security</Heading>
                        {
                            repo.advisories > 0 ?
                                <i>Vulnerabilities have been identified</i>
                                :
                                <i>No vulnerabilities have been identified</i>
                        }
                    </Box>
                </VStack>
            }
        >
            {overallIcon}
        </Tooltip>
    );
};

export default OverallStatus;
