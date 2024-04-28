import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";

interface IProductsFilterProps {
  children?: React.ReactNode;
}

const ProductsFilter = ({ children }: IProductsFilterProps) => {
  return (
    <Card>
      <Row justify="space-between">
        <Col span={16}>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item name="q">
                <Input.Search placeholder="Search" allowClear />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="role">
                <Select
                  placeholder="Select Category"
                  style={{ width: "100%" }}
                  allowClear
                  id="select_box_user_role"
                >
                  <Select.Option value="pizza">Pizza</Select.Option>
                  <Select.Option value="beverages">Beverages</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Select
                placeholder="Select Restaurant"
                style={{ width: "100%" }}
                allowClear
              >
                <Select.Option value="ban">Pizza Hub</Select.Option>
                <Select.Option value="active">Softy Corner</Select.Option>
              </Select>
            </Col>

            <Col span={6}>
              <Space>
                <Switch defaultChecked onChange={() => {}} />
                <Typography.Text>Show only published</Typography.Text>
              </Space>
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

export default ProductsFilter;
