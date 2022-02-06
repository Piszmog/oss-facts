import {Link} from "@chakra-ui/react";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import React from "react";

/**
 * Properties of the external link component.
 */
type ExternalLinkProps = {
    name: string;
    href: string;
};

/**
 * A link to an external website.
 * @param name The name of the link.
 * @param href The URL of the link.
 */
const ExternalLink = ({name, href}: ExternalLinkProps) => {
    return (
        <Link href={href} isExternal>
            {name}
            <ExternalLinkIcon mx='2px'/>
        </Link>
    );
};

export default ExternalLink;
