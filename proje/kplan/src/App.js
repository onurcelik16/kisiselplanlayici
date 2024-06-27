import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd'; 
import TodoList from './components/TodoList';

const App = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [redirectToTodo, setRedirectToTodo] = useState(false); // State for redirection

  const showLoginModal = () => {
    setIsLoginModalVisible(true);
  };

  const showRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };

  const handleCancelLogin = () => {
    setIsLoginModalVisible(false);
  };

  const handleCancelRegister = () => {
    setIsRegisterModalVisible(false);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalVisible(false);
    setRedirectToTodo(true); 
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    handleLoginSuccess();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (redirectToTodo) {
    return <TodoList />;
  }

  return (
    <div className="App" style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f0f2f5', height: '100vh' }}>
      <Button
        type="primary"
        onClick={showLoginModal}
        style={{ marginRight: '10px', fontSize: '18px', padding: '10px 20px' }}
      >
        Login
      </Button>
      <Button
        type="primary"
        onClick={showRegisterModal}
        style={{ fontSize: '18px', padding: '10px 20px' }}
      >
        Register
      </Button>

      <Modal
        title="Login"
        visible={isLoginModalVisible}
        onCancel={handleCancelLogin}
        footer={null}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Register"
        visible={isRegisterModalVisible}
        onCancel={handleCancelRegister}
        footer={null}
      >
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
