import React from 'react';

interface CopyLinkProps {
    searchString: string;
}

export const CopyLink: React.FC<CopyLinkProps> = ({ searchString }) => {

    const makeAndCopyLinkToClipboard = () => {
        let linkToBeCopied = makeLink();
        copyToClipboard(linkToBeCopied);
    };

    const makeLink = () => {
        let linkToBeCopied = ``;
        let location = window.document.location;
        linkToBeCopied = `${location.origin}${location.pathname}?search=${searchString}`;
        return linkToBeCopied;
    };

    // utility to copy text to clipboard
    const copyToClipboard = (link: string) => {
        const el = document.createElement('textarea');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-8"
            onClick={makeAndCopyLinkToClipboard}>
            copy link to the below filtered list
        </button>
    );
};

CopyLink.defaultProps = {
    searchString: ''
}
