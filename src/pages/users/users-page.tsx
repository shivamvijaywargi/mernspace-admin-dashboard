import { useState } from "react";
import { Breadcrumb, Button, Drawer, Space, Table } from "antd";
import { RightOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../http/api";
import { IUser } from "../../types";
import formatDate from "../../utils/formatDate";
import UsersFilter from "./ users-filter";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
    render: (_text: string, record: IUser) => {
      return (
        <div>
          {record.firstName} {record.lastName}
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_text: string, record: IUser) => {
      return formatDate(record.createdAt);
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_text: string, record: IUser) => (
      <Link to={`/users/${record.id}`}>Edit</Link>
    ),
  },
];

const UsersPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then((res) => res.data),
  });

  const onFilterChange = (filterName: string, filterValue: string) => {
    console.log(filterName, filterValue);
  };

  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to={"/"}>Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
        style={{ marginBottom: 20 }}
      />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}

      <UsersFilter onFilterChange={onFilterChange}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add User
        </Button>
      </UsersFilter>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={users}
        rowKey={"id"}
      />

      <Drawer
        title="Create User"
        width={720}
        destroyOnClose
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
            <Button type="primary">Submit</Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default UsersPage;
