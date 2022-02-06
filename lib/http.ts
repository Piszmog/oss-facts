import {Octokit} from "octokit";
import fetch from "node-fetch";
import {Repository} from "./models";

const octokit = new Octokit({
    auth: process.env.GITHUB_API,
});

/**
 * Search for repositories that match the given query.
 * @param searchTerm The search term to use.
 */
export const search = async (searchTerm: string): Promise<Repository[]> => {
    return octokit.graphql(`query SearchQuery($searchTerm: String!) {
  search(query: $searchTerm, type: REPOSITORY, first: 5) {
    edges {
      node {
        ... on Repository {
          url
          licenseInfo {
            name
            limitations {
              key
              description
            }
            permissions {
              description
              key
            }
            conditions {
              description
              key
            }
            url
          }
          nameWithOwner
        }
      }
    }
  }
}`, {
        searchTerm
    })
        .then((resp: any) => resp.search)
        .then(search => search.edges)
        .then(edges => edges.map((edge: any) => edge.node).map((node: any) => {
            let license = undefined;
            if (node.licenseInfo) {
                license = {
                    name: node.licenseInfo.name,
                    limitations: node.licenseInfo.limitations,
                    permissions: node.licenseInfo.permissions,
                    conditions: node.licenseInfo.conditions,
                    url: node.licenseInfo.url
                };
            }
            return {
                fullName: node.nameWithOwner,
                url: node.url,
                license
            }
        }));
}

const advisoriesPattern = '[0-9]+ Published';

/**
 * Get the latest advisory for the given repository.
 *
 * Hacky way to get the count. The node in the GraphQL API always returns zero and there no way to query the Advisory
 * DB based on repo name.
 * @param owner The owner of the repository.
 * @param repo The repository name.
 */
export const getAdvisoryAlerts = async (owner: string, repo: string): Promise<number> => {
    const resp = await fetch(`https://github.com/${owner}/${repo}/security/advisories`);
    const body = await resp.text();
    const match = body.match(advisoriesPattern);
    if (match) {
        return parseInt(match[0].split(' ')[0]);
    }
    return 0;
}
