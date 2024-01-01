import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/logo";

const LoginPage = () => {
  return (
    <>
      <Layout
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{
              width: 300,
            }}
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled /> Sign In
              </Space>
            }
          >
            <Form
              initialValues={{ remember: true }}
              onFinish={(values) => console.log(values)}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="john@gmail.com" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="********"
                />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="#" id="forgot-password">
                  Forgot Password
                </a>
              </Flex>
              <Form.Item name="remember">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
