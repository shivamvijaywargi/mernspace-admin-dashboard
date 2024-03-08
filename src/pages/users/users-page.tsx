import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const UsersPage = () => {
  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to={"/"}>Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
      />
    </>
  );
};

export default UsersPage;
