import {ChangeEvent, useRef, useState} from "react";
import {Button} from "@chakra-ui/react";
import {ArrowUpIcon} from "@chakra-ui/icons";
import {Repository} from "../lib/models";
import {getRepoNames} from "../lib/csv";
import fetch from "node-fetch";

/**
 * Properties for the ImportButton component
 */
type ImportButtonProps = {
    handleImport: (repos: Repository[]) => void;
};

/**
 * Component for the import button
 * @param handleImport Handler for the data import.
 */
const ImportButton = ({handleImport}: ImportButtonProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = async () => {
                // get the names from the CSV
                const names = getRepoNames(reader.result as string);
                // call the API to get all the data
                const resp = await fetch('/api/repos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({names: names})
                });
                const body = await resp.json();
                handleImport(body);
                setIsLoading(false);
            };
            reader.readAsText(files[0]);
        }
    }

    return (
        <>
            <Button onClick={() => fileInputRef?.current?.click()} rightIcon={<ArrowUpIcon/>} isLoading={isLoading}>
                Import
            </Button>
            <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden/>
        </>
    )
};

export default ImportButton;
