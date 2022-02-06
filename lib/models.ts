/**
 * A repository containing OSS.
 */
export interface Repository {
    /**
     * The name of the repository.
     */
    fullName: string;
    /**
     * The description of the repository.
     */
    url: string;
    /**
     * The license of the repository.
     */
    license: LicenseInfo | undefined;
    /**
     * The number of security alerts.
     */
    advisories: number;
}

/**
 * A license info.
 */
export interface LicenseInfo {
    /**
     * The name of the license.
     */
    name: string;
    /**
     * The url of the license.
     */
    url: string;
    /**
     * The limitations of the license
     */
    limitations: LicenseDetail[];
    /**
     * The permissions of the license.
     */
    permissions: LicenseDetail[];
    /**
     * The conditions of the license.
     */
    conditions: LicenseDetail[];
}

/**
 * A license detail.
 */
export interface LicenseDetail {
    /**
     * The key of the license detail.
     */
    key: string;
    /**
     * The description of the license detail.
     */
    description: string;
}
