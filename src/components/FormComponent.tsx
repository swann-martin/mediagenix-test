import React, { MouseEvent, useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Space, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SchemaType } from '../utils/types';
import Modal from 'antd/es/modal/Modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchFormSchema, postEvent } from '../api/queriesFonctions';

const FormComponent = ({
  isFormOpen,
  setFormOpen,
}: {
  isFormOpen: boolean;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const { mutate } = useMutation(postEvent, {});
  const { isLoading, error, data } = useQuery({
    queryKey: ['schema'],
    queryFn: fetchFormSchema,
  });

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
            required={!!item.required}
          >
            <TextArea />
          </Form.Item>
        );
      case 'range_picker':
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            required={!!item.required}
          >
            <RangePicker />
          </Form.Item>
        );

      case 'select':
        return (
          <Form.Item
            name={item.name}
            label={item.label}
            required={!!item.required}
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
            required={!!item.required}
          >
            <Input />
          </Form.Item>
        );
    }
  };

  const onFinish = (values: any) => {
    values.endDate = values.startDate.endDate[1].toISOString().split('T')[0];
    values.startDate = values.startDate.endDate[0].toISOString().split('T')[0];

    const newValues = {
      ...values,
    };

    mutate(newValues, {
      onSuccess: (res) => {
        console.log('success ', res), setFormOpen(false);
      },
    });
    // postEvent(newValues).then((res) => {
    //   console.log(res);
    //   res && setFormOpen(false);
    // });
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
      onOk={onFinish}
      // confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Save"
      destroyOnClose={true}
      footer={false}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
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
    </Modal>
  );
};

export default FormComponent;
