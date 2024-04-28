import { Flex, Breadcrumb, Form, Button } from "antd";
import { Link } from "react-router-dom";

import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import ProductsFilter from "./products-filter";

const ProductsPage = () => {
  const [filterForm] = Form.useForm();

  return (
    <>
      <Flex justify="space-between">
        <Breadcrumb
          items={[
            { title: <Link to={"/"}>Dashboard</Link> },
            { title: "Products" },
          ]}
          separator={<RightOutlined />}
          style={{ marginBottom: 20 }}
        />
      </Flex>

      <Form form={filterForm} onFieldsChange={() => {}}>
        <ProductsFilter>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {}}>
            Add Product
          </Button>
        </ProductsFilter>
      </Form>
    </>
  );
};

export default ProductsPage;
