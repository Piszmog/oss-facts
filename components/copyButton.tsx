import {Repository} from "../lib/models";
import {Button} from "@chakra-ui/react";
import {CopyIcon} from "@chakra-ui/icons";

/**
 * Props for the CopyButton component.
 */
type CopyButtonProps = {
    repos: Repository[];
};

/**
 * A button that copies the dashboard URL to the clipboard.
 * @param repos The list of repositories to copy the URL for.
 */
const CopyButton = ({repos}: CopyButtonProps) => {
    const onClick = async () => {
        const names = repos.map(r => r.fullName).join(',');
        const encodedNames = Buffer.from(names).toString('base64');
        await navigator.clipboard.writeText(`${window.location.origin}?names=${encodedNames}`);
    };

    return (
        <Button
            mr={2}
            variant='solid'
            colorScheme='blue'
            rightIcon={<CopyIcon/>}
            onClick={onClick}
        >
            Copy
        </Button>
    );
};

export default CopyButton;
