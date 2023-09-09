import React from 'react';
import { useIsAuthenticated, useGo } from '@refinedev/core';

type AuthenticatedProps = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
};
export const Authenticated: React.FC<AuthenticatedProps> = ({ children, fallback, loading }) => {
    const { isLoading, data } = useIsAuthenticated();
    const go = useGo();
    if (isLoading) {
        return <>{loading}</> || null;
    }
    if (data?.error) {
        if (!fallback) {
            go({ to: '/', type: 'replace' });
            return null;
        }

        return <>{fallback}</>;
    }
    if (data?.authenticated) {
        return <>{children}</>;
    }

    return null;
};
