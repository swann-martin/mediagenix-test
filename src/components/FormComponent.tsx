import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Space, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DataType, SchemaType } from '../utils/types';
import Modal from 'antd/es/modal/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEvent,
  fetchEvents,
  fetchFormSchema,
  postEvent,
} from '../api/queriesFonctions';

const FormComponent = ({
  isFormOpen,
  setFormOpen,
  events,
  setEvents,
}: {
  isFormOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  events: DataType[];
  setEvents: React.Dispatch<React.SetStateAction<DataType[]>>;
}) => {
  const [schema, setSchema] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  useEffect(() => {
    try {
      fetchFormSchema().then((schema) => {
        setSchema(schema);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const createEvent = useMutation(postEvent).mutate;

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['schema'],
  //   queryFn: fetchFormSchema,
  // });
  // const queryClient = useQueryClient();

  // if (isLoading)
  //   return (
  //     <Spin tip="Loading">
  //       <div className="spin-content" />
  //     </Spin>
  //   );

  // if (error)
  //   return (
  //     <div>
  //       <p>{JSON.stringify(error)}</p>
  //     </div>
  //   );

  const CustomField = ({ item }: { item: SchemaType }) => {
    switch (item.component) {
      case 'textarea':
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            rules={[
              {
                required: !!item.required,
                message: `${item.label} is required`,
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        );
      case 'range_picker':
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            rules={[
              {
                required: true,
                message: `${item.label} is required`,
              },
            ]}
          >
            <RangePicker />
          </Form.Item>
        );

      case 'select':
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            rules={[
              {
                required: !!item.required,
                message: `${item.label} is required`,
              },
            ]}
          >
            <Select options={item.options} />
          </Form.Item>
        );

      case 'text':
      default:
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            rules={[
              {
                required: !!item.required,
                message: `${item.label} is required`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        );
    }
  };

  const onFinish = () => {
    try {
      const values = form.getFieldsValue();
      setConfirmLoading(true);
      // reformat date to get the  correct string format YYYY-MM-DD
      console.log(values);
      values.endDate = values.startDate.endDate[1].toISOString().split('T')[0];
      values.startDate = values.startDate.endDate[0]
        .toISOString()
        .split('T')[0];

      const newEvent = {
        ...values,
        id: crypto.randomUUID().toString(),
      };

      postEvent(newEvent).then(() => {
        form.resetFields();
        setEvents([...events, newEvent]);
        setConfirmLoading(false);
        setFormOpen(false);
      });
    } catch (e) {
      console.log(e);
    }
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
      onOk={onFinish}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        form={form}
      >
        {schema.map((item: SchemaType, i: number) => (
          <CustomField item={item} key={i} />
        ))}
        <div className="align-end">
          <Button htmlType="button" type="text">
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormComponent;
