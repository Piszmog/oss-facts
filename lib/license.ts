import {LicenseInfo} from "./models";

/**
 * Determine how friendly a license is.
 * @param license The license to check.
 */
export const gradeLicense = (license: LicenseInfo | undefined): LicenseGrade => {
    // if there is no license, then that is bad as we do not know how to interact with the software
    if (!license) {
        return {
            rating: LicenseRating.BAD,
            reasons: ['Missing License'],
        };
    }
    // other means the APIs could not determine what the software is using, so it is questionable and will need the
    // user to manually check
    if (license.name.toLowerCase() === 'other') {
        return {
            rating: LicenseRating.QUESTIONABLE,
            reasons: ['Could not identify license type'],
        };
    }
    let rating = LicenseRating.GOOD;
    const reasons: string[] = [];
    // check the conditions of the license to determine how friendly it is
    // this is purely opinionated
    license.conditions.forEach(p => {
        switch (p.key) {
            case 'disclose-source':
            case 'same-license':
                rating = LicenseRating.BAD;
                reasons.push(p.description);
                break;
            case 'document-changes':
                rating = LicenseRating.QUESTIONABLE;
                reasons.push(p.description);
                break;
        }
    });
    return {
        rating,
        reasons,
    };
}

/**
 * The grade of a license.
 */
export interface LicenseGrade {
    /**
     * The rating of the license.
     */
    rating: LicenseRating;
    /**
     * The reasons for the rating, if any.
     */
    reasons: string[];
}

/**
 * The rating of a license.
 */
export enum LicenseRating {
    /**
     * The license is perfect for use.
     */
    GOOD,
    /**
     * The license needs the user to double-check that they accept the license.
     */
    QUESTIONABLE,
    /**
     * The license is not suitable for use.
     */
    BAD,
}
