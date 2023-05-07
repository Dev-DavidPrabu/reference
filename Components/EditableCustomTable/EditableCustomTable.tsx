import React, { useEffect, useState } from "react";
import { Table, Input, Select, Form } from "antd";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "../UI/CustomButton";

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}
function EditableCustomTable(props: {
  column: [{ editable: boolean; dataIndex: string; title: string }];
  data: any;
}) {
  const [columns, setColumns] = useState(props.column);
  const tableData = props.data;
  const [editSave, setEditSave] = useState(false);
  useEffect(() => {
    const isManage = columns.filter(
      (object: any) => object.dataIndex == "manage"
    );
    const manage: any = {
      title: "Manage",
      dataIndex: "manage",
      render: (_: any, record: Item) => {
        return editSave ? (
          <span>
            <CustomButton
              color="danger"
              onClick={() => save(record.key)}
              className="btn2"
            >
              Save
            </CustomButton>
            <CustomButton
              color="secondary"
              className="btn2"
              component={"payrollEnquiry"}
              onClick={cancel}
            >
              Cancel
            </CustomButton>
          </span>
        ) : (
          <div className={"ms-2 manage-button"} onClick={() => edit(record)}>
            <FaRegEdit />
          </div>
        );
      },
    };
    if (isManage.length == 0) {
      columns.push(manage);
      setColumns(columns);
    }
    setData(props.data);
  }, [props.column]);

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "dropdown" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
  }

  const option = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "dropdown" ? <Select options={option} /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [data, setData] = useState(tableData);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ vendorName: "", vendorStatus: "", ...record });
    setEditingKey(record.key);
    setEditSave(true);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {}
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "vendorStatus" ? "dropdown" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          className="Customheader"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
}

export default EditableCustomTable;
