import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd";
import { getRestaurants } from "../../http/api";
import { IRestaurant } from "../../types";

const UsersForm = () => {
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurants().then((res) => res.data.tenants),
  });

  return (
    <Row>
      <Col span={24}>
        <Space direction="vertical" size="large">
          <Card title="Basic Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName">
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
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

          <Card title="Security Info" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Password" name="password">
                  <Input size="large" type="password" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="Role" bordered={false}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Role" name="role">
                  <Select
                    placeholder="Role"
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={() => {}}
                  >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId">
                  <Select
                    placeholder="Restaurant"
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                    onChange={() => {}}
                  >
                    {restaurants?.map((restaurant: IRestaurant) => (
                      <Select.Option
                        value={restaurant.name}
                        key={restaurant.id}
                      >
                        {restaurant.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  );
};

export default UsersForm;
