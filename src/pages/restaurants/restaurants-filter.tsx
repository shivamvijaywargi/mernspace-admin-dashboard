import { Card, Col, Input, Row } from "antd";

interface IRestaurantsFilterProps {
  children?: React.ReactNode;
}

const RestaurantsFilter = ({ children }: IRestaurantsFilterProps) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Input.Search placeholder="Search" />
        </Col>
        <Col>{children}</Col>
      </Row>
    </Card>
  );
};

export default RestaurantsFilter;
