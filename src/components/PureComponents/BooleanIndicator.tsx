import React from 'react';
import { Tooltip, TooltipProps } from 'antd';

export const BooleanIndicator: React.FC<{
    value: boolean;
    className?: string;
    tooltipProps?: TooltipProps & { enabled: boolean };
}> = ({ value, className, tooltipProps }) => {
    if (tooltipProps?.enabled) {
        return (
            <Tooltip {...tooltipProps}>
                <div className={`${value ? 'bg-green-500' : 'bg-red-500'} ${className ? className : 'w-4 h-4 rounded-full inline-block'} `} />
            </Tooltip>
        );
    }

    return <div className={`${value ? 'bg-green-500' : 'bg-red-500'} ${className ? className : 'w-4 h-4 rounded-full'} `} />;
};
