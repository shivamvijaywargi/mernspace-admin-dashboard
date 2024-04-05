import { Card, Col, Form, Input, Row, Select } from "antd";

interface IUserFilterProps {
  children?: React.ReactNode;
}

const UsersFilter = ({ children }: IUserFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name="q">
                <Input.Search placeholder="Search" allowClear />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="role">
                <Select
                  placeholder="Role"
                  style={{ width: "100%" }}
                  allowClear
                  id="select_box_user_role"
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Select placeholder="Status" style={{ width: "100%" }} allowClear>
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          {children}
        </Col>
      </Row>
    </Card>
  );
};

export default UsersFilter;
