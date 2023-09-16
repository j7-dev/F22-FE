import { NotificationProvider } from '@refinedev/core';
import { notification } from 'antd';
import { UndoableNotification } from '@refinedev/antd/src/components/undoableNotification';

export const notificationProvider: NotificationProvider = {
    open: ({ key, message, description, type, cancelMutation, undoableTimeout }) => {
        if (type === 'progress') {
            notification.open({
                key,
                description: <UndoableNotification notificationKey={key} message={message} cancelMutation={cancelMutation} undoableTimeout={undoableTimeout} />,
                message: null,
                duration: 0,
                closeIcon: <></>,
            });
        } else {
            console.log('notification', { key, message, description, type, cancelMutation, undoableTimeout });
            notification.open({
                key,
                description: message,
                message: description ?? null,
                type,
            });
        }
    },
    close: (key) => notification.destroy(key),
};
