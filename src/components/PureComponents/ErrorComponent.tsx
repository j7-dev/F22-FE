import React, { useEffect, useState } from 'react';
import { useGo, useResource, useRouterType, useNavigation, useTranslate } from '@refinedev/core';
import { RefineErrorPageProps } from '@refinedev/ui-types';
import { Button, Result, Typography, Space, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const translate = useTranslate();
    const { push } = useNavigation();
    const go = useGo();
    const routerType = useRouterType();

    const { resource, action } = useResource();

    useEffect(() => {
        if (resource) {
            if (action) {
                setErrorMessage(
                    translate(
                        'pages.error.info',
                        {
                            action: action,
                            resource: resource?.name,
                        },
                        `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
                    ),
                );
            }
        }
    }, [resource, action]);

    return (
        <Result
            status="404"
            title="404"
            extra={
                <Space direction="vertical" size="large" align="center">
                    <Space>
                        <Text>{translate('pages.error.404', 'Sorry, the page you visited does not exist.')}</Text>
                        {errorMessage && (
                            <Tooltip title={errorMessage}>
                                <InfoCircleOutlined data-testid="error-component-tooltip" />
                            </Tooltip>
                        )}
                    </Space>
                    <div className="flex justify-center mt-8">
                        <Button
                            type="primary"
                            onClick={() => {
                                if (routerType === 'legacy') {
                                    push('/');
                                } else {
                                    go({ to: '/' });
                                }
                            }}
                        >
                            {translate('pages.error.backHome', 'Back Home')}
                        </Button>
                    </div>
                </Space>
            }
        />
    );
};
