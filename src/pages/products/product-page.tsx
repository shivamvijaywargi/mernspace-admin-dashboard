import { Flex, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import { RightOutlined } from "@ant-design/icons";

const ProductPage = () => {
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
    </>
  );
};

export default ProductPage;
