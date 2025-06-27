'use client';

import NextLink, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

type LoadingLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

export function LoadingLink({ onClick, href, ...props }: LoadingLinkProps) {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Create a URL object to safely parse the href.
        // This handles relative, absolute, and full URL hrefs.
        const targetUrl = new URL(href.toString(), window.location.origin);
        
        // We only trigger the loading bar if the pathname is different.
        // This prevents the loader from showing on hash links or links to the same page.
        if (targetUrl.pathname !== pathname) {
            window.dispatchEvent(new CustomEvent('navigation-start'));
            // Set a session flag to indicate client-side navigation is happening.
            sessionStorage.setItem('client-navigation', 'true');
        }

        if (onClick) {
            onClick(e);
        }
    };

    return <NextLink href={href} {...props} onClick={handleClick} />;
}
