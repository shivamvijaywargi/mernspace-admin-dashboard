import { useState } from "react";
import {
  Breadcrumb,
  Button,
  Drawer,
  Flex,
  Form,
  Space,
  Spin,
  Table,
  Typography,
  theme,
} from "antd";
import {
  RightOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { createUser, getUsers } from "../../http/api";
import { ICreateUser, IFieldData, IUser } from "../../types";
import formatDate from "../../utils/formatDate";
import UsersFilter from "./users-filter";
import UsersForm from "./users-form";
import { useAuthStore } from "../../store";
import { PER_PAGE } from "../../constants";

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
    token: { colorBgLayout },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const [queryParams, setQueryParams] = useState({
    limit: PER_PAGE,
    page: 1,
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch users
  const {
    data: users,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getUsers(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  // Create User
  const { mutate: userMutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: ICreateUser) => createUser(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsDrawerOpen(false);
      form.resetFields();
      return;
    },
  });

  const onHandleSubmit = async () => {
    await form.validateFields();

    userMutate(form.getFieldsValue());
  };

  const onFilterChange = (changedFields: IFieldData[]) => {
    const changedFilterFields = changedFields
      .map((item) => ({
        [item.name[0]]: item.value,
      }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});

    setQueryParams((prev) => ({
      ...prev,
      ...changedFilterFields,
    }));
  };

  if (user?.role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Flex justify="space-between">
        <Breadcrumb
          items={[
            { title: <Link to={"/"}>Dashboard</Link> },
            { title: "Users" },
          ]}
          separator={<RightOutlined />}
          style={{ marginBottom: 20 }}
        />

        {isFetching && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
        {isError && (
          <Typography.Text type="danger">
            Error: {error.message}
          </Typography.Text>
        )}
      </Flex>

      <Form form={filterForm} onFieldsChange={onFilterChange}>
        <UsersFilter>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsDrawerOpen(true)}
          >
            Add User
          </Button>
        </UsersFilter>
      </Form>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={users?.data}
        rowKey={"id"}
        pagination={{
          total: users?.total,
          pageSize: queryParams.limit,
          current: queryParams.page,
          onChange: (page: number) => {
            setQueryParams((prev) => ({
              ...prev,
              page,
            }));
          },
        }}
      />

      <Drawer
        title="Create User"
        width={720}
        styles={{ body: { backgroundColor: colorBgLayout } }}
        destroyOnClose
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                setIsDrawerOpen(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" onClick={onHandleSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <UsersForm />
        </Form>
      </Drawer>
    </>
  );
};

export default UsersPage;
