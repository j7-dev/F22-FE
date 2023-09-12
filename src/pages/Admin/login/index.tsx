import React from 'react';
import { useLogin } from '@refinedev/core';
import { Row, Col, Layout as AntdLayout, Card, Typography, Form, Input, Button } from 'antd';
import logo from '@/assets/images/logo.png';

const { Title } = Typography;

export interface ILoginForm {
    email: string;
    password: string;
    redirectPath?: string;
}

const Login: React.FC = () => {
    const [form] = Form.useForm<ILoginForm>();

    const { mutate: login } = useLogin<ILoginForm>();

    const CardTitle = (
        <Title level={5} className="title">
            Login
        </Title>
    );

    return (
        <AntdLayout className="layout f22-login">
            <Row
                justify="center"
                align="middle"
                style={{
                    height: '100vh',
                }}
            >
                <Col xs={22}>
                    <div className="container">
                        <div className="imageContainer">
                            <img className="w-[15rem]" src={logo} alt="Logo" />
                        </div>
                        <Card className="py-2" title={CardTitle} headStyle={{ borderBottom: 0 }}>
                            <Form<ILoginForm>
                                layout="vertical"
                                form={form}
                                onFinish={(values) => {
                                    login(values);
                                }}
                                requiredMark={false}
                                initialValues={{
                                    remember: false,
                                }}
                            >
                                <Form.Item name="redirectPath" hidden initialValue="/refine/home">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email" label="E-mail" rules={[{ required: true }]}>
                                    <Input size="large" />
                                </Form.Item>
                                <Form.Item name="password" label="Password" rules={[{ required: true }]} style={{ marginBottom: '12px' }}>
                                    <Input type="password" placeholder="●●●●●●●●" size="large" />
                                </Form.Item>
                                {/* <div style={{ marginBottom: '12px' }}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox
                                            style={{
                                                fontSize: '12px',
                                            }}
                                        >
                                            Remember me
                                        </Checkbox>
                                    </Form.Item>

                                    <a
                                        style={{
                                            float: 'right',
                                            fontSize: '12px',
                                        }}
                                        href="#"
                                    >
                                        Forgot password?
                                    </a>
                                </div> */}
                                <Button type="primary" size="large" htmlType="submit" block className="mt-8">
                                    Sign in
                                </Button>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </AntdLayout>
    );
};

export default Login;
