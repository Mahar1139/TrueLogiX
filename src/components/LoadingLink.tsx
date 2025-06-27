'use client';

import NextLink, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

type LoadingLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

export function LoadingLink({ onClick, href, ...props }: LoadingLinkProps) {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href.toString() !== pathname) {
            window.dispatchEvent(new CustomEvent('navigation-start'));
        }
        if (onClick) {
            onClick(e);
        }
    };

    return <NextLink href={href} {...props} onClick={handleClick} />;
}
