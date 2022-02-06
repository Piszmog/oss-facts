import {Tag, TagLabel} from "@chakra-ui/tag";
import {Link} from "@chakra-ui/react";

/**
 * Properties of the AdvisoryStatus component.
 */
type AdvisoryStatusProps = {
    url: string;
    advisories: number;
};

/**
 * Renders the advisory status.
 * @param url The URL of the advisory.
 * @param advisories The number of advisories.
 */
const AdvisoryStatus = ({url, advisories}: AdvisoryStatusProps) => {
    return (
        <Link href={`${url}/security/advisories`} isExternal>
            <Tag
                colorScheme={advisories > 0 ? 'red' : 'green'}
                variant='solid'
            >
                <TagLabel>{advisories}</TagLabel>
            </Tag>
        </Link>
    );
}

export default AdvisoryStatus;
