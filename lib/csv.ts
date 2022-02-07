import {Repository} from "./models";
import {Parser} from "json2csv";

const headers = ['name', 'url', 'license', 'licenseUrl', 'advisoryUrl']

/**
 * The row in the CSV file.
 */
export type Row = {
    name: string,
    url: string,
    license: string,
    licenseUrl: string,
    advisoryUrl: string
}

/**
 * Convert a repository to a CSV table.
 * @param repos Repositories to convert.
 */
export const generateCSV = (repos: Repository[]): string => {
    const rows: Row[] = [];
    repos.forEach(repo => {
        rows.push({
            name: repo.fullName,
            url: repo.url,
            license: repo.license?.name ?? 'None',
            licenseUrl: repo.license?.url ?? '',
            advisoryUrl: `${repo.url}/security/advisories`
        })
    });
    return new Parser({fields: headers}).parse(rows);
}

export const getRepoNames = (csvData: string): string[] => {
    const names: string[] = [];
    const rows = csvData.split('\n');
    let rowIndex = 0;
    rows.forEach(row => {
        // skip the header row
        if (rowIndex === 0) {
            rowIndex++;
            return;
        }
        const fields = row.split(',');
        if (fields.length > 0) {
            names.push(fields[0].replaceAll('"', ''));
        }
    });
    return names;
}
