import { Breadcrumb, Space, Table } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../http/api";
import { IUser } from "../../types";
import formatDate from "../../utils/formatDate";

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
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers().then((res) => res.data),
  });

  return (
    <>
      <Breadcrumb
        items={[{ title: <Link to={"/"}>Dashboard</Link> }, { title: "Users" }]}
        separator={<RightOutlined />}
      />

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}

      <Table style={{ marginTop: 20 }} columns={columns} dataSource={users} />

      {/* {users && (
        <div>
          <h1>Users</h1>
          <ul>
            {users.map((user: IUser) => (
              <li key={user.id}>
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
};

export default UsersPage;
