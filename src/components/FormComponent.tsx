import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Space, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SchemaType } from '../utils/types';
import Modal from 'antd/es/modal/Modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEvent,
  fetchFormSchema,
  postEvent,
} from '../api/queriesFonctions';

const FormComponent = ({
  isFormOpen,
  setFormOpen,
}: {
  isFormOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const createEvent = useMutation(postEvent).mutate;

  const { isLoading, error, data } = useQuery({
    queryKey: ['schema'],
    queryFn: fetchFormSchema,
  });
  const queryClient = useQueryClient();

  if (isLoading)
    return (
      <Spin tip="Loading">
        <div className="spin-content" />
      </Spin>
    );

  if (error)
    return (
      <div>
        <p>{JSON.stringify(error)}</p>
      </div>
    );

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
    const values = form.getFieldsValue();
    // reformat date to get the  correct string format YYYY-MM-DD
    console.log(values);
    values.endDate = values.startDate.endDate[1].toISOString().split('T')[0];
    values.startDate = values.startDate.endDate[0].toISOString().split('T')[0];

    const newEvent = {
      ...values,
    };

    createEvent(newEvent, {
      onSuccess: () => {
        form.resetFields();
        queryClient
          .invalidateQueries({ queryKey: ['events'] })
          .then(() => setFormOpen(false));
      },
      onError(error) {
        alert(`Error form  : ${error}`);
      },
    });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setFormOpen(false);
  };

  return (
    // <Modal
    //   title="Create Event"
    //   open={isFormOpen}
    //   centered={true}
    //   onOk={onFinish}
    //   focusTriggerAfterClose
    //   onCancel={handleCancel}
    //   footer={false}
    // >
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      form={form}
    >
      {data.map((item: SchemaType, i: number) => (
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
    // </Modal>
  );
};

export default FormComponent;
