export type DataType = {
  id: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type SchemaType = {
  name: string | string[];
  label: string;
  component: string;
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
};
