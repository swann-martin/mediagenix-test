import React, { MouseEvent, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SchemaType } from '../utils/types';
import Modal from 'antd/es/modal/Modal';

const FormComponent = ({
  isFormOpen,
  setFormOpen,
}: {
  isFormOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const [schema, setSchema] = React.useState([]);

  useEffect(() => {
    try {
      const res = fetch(`http://localhost:5101/schema`);
      res.then((res) => res.json()).then((schema) => setSchema(schema));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const CustomInput = ({ item }: { item: SchemaType }) => {
    switch (item.component) {
      case 'textarea':
        return <TextArea />;
      case 'range_picker':
        return <RangePicker />;
      case 'select':
        return <Select options={item.options} />;
      case 'text':
        return <Input />;
      default:
        return <Input />;
    }
  };

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const submit = (e: MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    console.log('sumbitted form');
  };

  const handleModalOk = () => {
    // setConfirmLoading(true);
    setTimeout(() => {
      setFormOpen(false);
      // setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setFormOpen(false);
  };

  return (
    <Modal
      title="Create Event"
      open={isFormOpen}
      centered={true}
      onOk={handleModalOk}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Save"
      destroyOnClose={true}
      footer={[
        <>
          <Button form="form" htmlType="button" type="text">
            Cancel
          </Button>
          <Button htmlType="submit" key="submit" type="primary">
            Save
          </Button>
        </>,
      ]}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        id="form"
      >
        {schema.map((item: SchemaType) => (
          <Form.Item
            name={item.name}
            label={item.label}
            required={!!item.required}
          >
            <CustomInput item={item} />
          </Form.Item>
        ))}

        {/* <Button htmlType="button" type="text">
        Cancel
      </Button>
      <Button htmlType="submit" type="primary">
        Save
      </Button> */}
      </Form>
    </Modal>
  );
};

export default FormComponent;
