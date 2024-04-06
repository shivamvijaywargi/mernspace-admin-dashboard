import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getRestaurants } from "../../http/api";
import { IRestaurant } from "../../types";

const UsersForm = ({ isEditing = false }: { isEditing: boolean }) => {
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurants().then((res) => res.data.tenants),
  });

  const selectedRole = Form.useWatch("role");

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phone">
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          {!isEditing && (
            <Card title="Security Info" bordered={false}>
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters",
                      },
                    ]}
                  >
                    <Input size="large" type="password" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}

          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please select a role",
                    },
                  ]}
                >
                  <Select
                    placeholder="Role"
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={() => {}}
                  >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              {selectedRole === "manager" && (
                <Col span={12}>
                  <Form.Item
                    label="Restaurant"
                    name="tenantId"
                    rules={[
                      {
                        required: true,
                        message: "Please select a restaurant",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Restaurant"
                      size="large"
                      allowClear
                      style={{ width: "100%" }}
                      onChange={() => {}}
                    >
                      {restaurants?.map((restaurant: IRestaurant) => (
                        <Select.Option
                          value={restaurant.id}
                          key={restaurant.id}
                        >
                          {restaurant.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UsersForm;
