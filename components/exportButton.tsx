import {Button} from "@chakra-ui/react";
import {DownloadIcon} from "@chakra-ui/icons";
import React from "react";
import {Repository} from "../lib/models";
import {generateCSV} from "../lib/csv";

/**
 * Properties for the export button.
 */
type DownloadButtonProps = {
    repos: Repository[];
};

/**
 * A button that export a CSV file of the given repositories.
 * @param repos The repositories to export.
 */
const ExportButton = ({repos}: DownloadButtonProps) => {
    const handleExport = () => {
        const element = document.createElement('a');
        const blob = new Blob([generateCSV(repos)], {type: "text/csv"});
        element.href = URL.createObjectURL(blob);
        element.download = "oss.csv";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <Button
            ml={2}
            rightIcon={<DownloadIcon/>}
            variant='solid'
            colorScheme='teal'
            disabled={repos.length === 0}
            onClick={handleExport}
        >
            Export
        </Button>
    );
};

export default ExportButton;
