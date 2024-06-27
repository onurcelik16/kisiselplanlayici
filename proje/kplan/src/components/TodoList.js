import React, { useState } from 'react';
import { Calendar, Badge, Input, Checkbox, Row, Col, Button, Card, Form, Table } from 'antd';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setTodos((prevTodos) => [...prevTodos, values]);
    form.resetFields();
  };

  const getListData = (value) => {
    const date = value.date();
    return todos
      .filter((item) => {
        const itemStartDate = new Date(item.startDate);
        return itemStartDate.getDate() === date;
      })
      .map((item) => ({
        type: item.priority ? 'warning' : 'success',
        content: `${item.name}: ${item.description}`,
      }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const columns = [
    {
      title: 'İş Adı',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Zorunluluk',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (priority ? 'Evet' : 'Hayır'),
    },
    {
      title: 'İş Tanımı',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'endDate',
      key: 'endDate',
    },
  ];

  return (
    <div className="todo-list" style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Yapılacaklar Listesi</h1>
      <Card style={{ marginBottom: '20px' }}>
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Lütfen iş adını girin!' }]}
              >
                <Input placeholder="İş Adı" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priority" valuePropName="checked">
                <Checkbox>Zorunlu</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                rules={[{ required: true, message: 'Lütfen iş tanımını girin!' }]}
              >
                <Input placeholder="İş Tanımı" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startDate"
                rules={[{ required: true, message: 'Lütfen başlangıç tarihini girin!' }]}
              >
                <Input type="date" placeholder="Başlangıç Tarihi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                rules={[{ required: true, message: 'Lütfen bitiş tarihini girin!' }]}
              >
                <Input type="date" placeholder="Bitiş Tarihi" />
              </Form.Item>
            </Col>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit" style={{ width: '50%' }}>
                Ekle
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Calendar
        className="todo-calendar"
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        cellRender={cellRender}
      />
      <div className="todo-items" style={{ marginTop: '20px' }}>
        <Table dataSource={todos} columns={columns} rowKey={(record) => record.name} />
      </div>
    </div>
  );
};

export default TodoList;
