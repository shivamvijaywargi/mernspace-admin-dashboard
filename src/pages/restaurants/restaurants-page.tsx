import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { getRestaurants } from "../../http/api";
import RestaurantsFilter from "./restaurants-filter";
import { useState } from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const RestaurantsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: restaurants,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => getRestaurants().then((res) => res.data.tenants),
  });

  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to={"/"}>Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
        style={{ marginBottom: 20 }}
      />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}

      <RestaurantsFilter>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add Restaurant
        </Button>
      </RestaurantsFilter>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={restaurants}
        rowKey={"id"}
      />

      <Drawer
        title="Add Restaurant"
        width={720}
        destroyOnClose
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <p>Some Content...</p>
        <p>Some Content...</p>
        <p>Some Content...</p>
      </Drawer>
    </>
  );
};

export default RestaurantsPage;
