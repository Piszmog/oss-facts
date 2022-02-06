import {Button, Tooltip} from "@chakra-ui/react";
import {DownloadIcon} from "@chakra-ui/icons";
import React from "react";
import {Repository} from "../lib/models";
import {generateCSV} from "../lib/csv";

/**
 * Properties for the download button.
 */
type DownloadButtonProps = {
    repos: Repository[];
};

/**
 * A button that downloads a CSV file of the given repositories.
 * @param repos The repositories to download.
 */
const DownloadButton = ({repos}: DownloadButtonProps) => {
    const handleDownload = () => {
        const element = document.createElement('a');
        const blob = new Blob([generateCSV(repos)], {type: "text/csv"});
        element.href = URL.createObjectURL(blob);
        element.download = "oss.csv";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <Tooltip label='Download a CSV file' hasArrow>
            <Button
                rightIcon={<DownloadIcon/>}
                variant='solid'
                colorScheme='teal'
                disabled={repos.length === 0}
                onClick={handleDownload}
            >
                Download
            </Button>
        </Tooltip>
    );
};

export default DownloadButton;
