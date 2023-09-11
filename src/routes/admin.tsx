import { Route } from 'react-router-dom';
import { AntdInferencer } from '@refinedev/inferencer/antd';

const adminRoutes = () => {
    return (
        <>
            <Route path="/refine/users">
                <Route index element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
                <Route path="edit/:id" element={<AntdInferencer />} />
                <Route path="show/:id" element={<AntdInferencer />} />
            </Route>
            <Route path="/refine/transaction-records">
                <Route index element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
                <Route path="edit/:id" element={<AntdInferencer />} />
                <Route path="show/:id" element={<AntdInferencer />} />
            </Route>
        </>
    );
};

export default adminRoutes;
