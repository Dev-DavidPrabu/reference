import { Button, FormGroup, Input, Label } from 'reactstrap';
import './LanguageParametersEdit.scss';
import Select from 'react-select';
import CustomHeader from '../../../Components/CustomTable/CustomTable';
import {
  getSelectedLanguageInfo,
  updatingtheExsitingLanguageParameters,
  resetEditLanguageResponse
} from '../../../redux/action/LanguageParameterAction';
import { Key, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import CustomLoader from '../../../Components/Loader/CustomLoader';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import CustomButton from '../../../Components/UI/CustomButton';
import { Form, InputNumber, Popconfirm, Table, Typography } from 'antd';
import SubmitCancelButton from '../../../Components/SubmitCancelButton/SubmitCancelButton';
interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const LanguageParameterEdit: React.FC = (props: any) => {
  let storeDeletedRecordId: Array<any> = [];
  const [deletedId, setDeletId] = useState();
  const gettingSelectedKeyFromPreiousRoute =
    props.location && props.location.state && props.location.state.key;
  const dispatch = useDispatch();
  const [moduleValue, setModuleValue] = useState('');
  let englishContent = '';
  props?.location?.state?.languageContent?.filter((gettingContent: any) => {
    if (gettingContent.languageCode === 'en') {
      englishContent = gettingContent.content;
    }
  });
  useEffect(() => {
    if (gettingSelectedKeyFromPreiousRoute) {
      dispatch(getSelectedLanguageInfo(gettingSelectedKeyFromPreiousRoute));
    }
  }, [gettingSelectedKeyFromPreiousRoute]);
  const gettingSelectedLangInfo = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.selectedLanguageInfo?.data
  );
  //selectors:
  const activityIndicator = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.isLoading
  );
  const GetPeferredlanguageList = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.listofpreferredLanguage
  );
  const afterUpdatingLanguageInfo = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.updatedLanguageInfo?.data
  );
  //updatedLanguageInfo
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState('');
  const [googleTranslateContent, setgoogleTranslateContent] = useState({
    languageCode: 'en',
    languageDescription: 'English',
    pageName: '',
    content: '',
    toLanguageCode: '',
  });
  const isEditing = (record: any) => record.id === editingKey;
  useEffect(() => {
    if (gettingSelectedLangInfo && gettingSelectedLangInfo) {
      gettingSelectedLangInfo.map((e: any) => {
        e.isDeleted = false;
      });
      setData(gettingSelectedLangInfo);
    }
  }, [gettingSelectedLangInfo]);
  useEffect(() => {
    if (afterUpdatingLanguageInfo !== undefined && afterUpdatingLanguageInfo.message) {
      dispatch(getSelectedLanguageInfo(gettingSelectedKeyFromPreiousRoute));
        props.history.push({
      pathname: '/dashboard/Setup-And-Configuration/Language-Parameter',
      state:afterUpdatingLanguageInfo?.message
    });
    dispatch(resetEditLanguageResponse())
    }
  }, [afterUpdatingLanguageInfo]);
  // useEffect(()=>{
  //   if(afterUpdatingLanguageInfo){
    
  //   }
  // },[afterUpdatingLanguageInfo])
  const edit = (record: any) => {
    form.setFieldsValue({ translationContentContent: '', ...record });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key: any) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData: any = [...data];
      const index = newData.findIndex((item: { id: any }) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
    }
  };
  const headerItemForEditParameters = () => {
    return (
      <div className="language-view-header-content">
        <FormGroup>
          <Label for="exampleEmail">Module</Label>
          <Input
            type="text"
            name="Module"
            id="Module"
            placeholder="with a placeholder"
            value={props?.location?.state?.pageName}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Key</Label>
          <Input
            type="text"
            name="Module"
            id="Module"
            placeholder="with a placeholder"
            value={props?.location?.state?.key}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Content</Label>
          <Input
            type="text"
            name="Module"
            id="Module"
            placeholder="with a placeholder"
            value={englishContent}
            disabled
          />
        </FormGroup>
      </div>
    );
  };
  const handleChange = (e: any) => {
    setgoogleTranslateContent({
      ...googleTranslateContent,
      [e.target.name]: e.target.value,
    });
  };
  const headerItem = () => {
    return (
      <div className="language-add-header-content">
        <FormGroup>
          <Label for="exampleEmail">Select Language</Label>
          <Input name="fromLanguageCode" type="text" id="Slanguage" value={'English'} disabled />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Module</Label>
          <Input
            type="text"
            name="Module"
            id="Module"
            placeholder="with a placeholder"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Key</Label>
          <Input
            type="text"
            name="Key"
            id="Key"
            placeholder="with a placeholder"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Word</Label>
          <Input
            type="text"
            name="Word"
            id="Module"
            placeholder="with a placeholder"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Translate Lanaguage</Label>
          <Select
            onChange={handleChange}
            className="search"
            isMulti
            options={GetPeferredlanguageList ? GetPeferredlanguageList : []}
          />
        </FormGroup>
        <FormGroup className=" mt-3">
          <Label></Label>
          <Button>Translate</Button>
        </FormGroup>
        <FormGroup className=" mt-3">
          <Label></Label>
          <Button>Cancel</Button>
        </FormGroup>
      </div>
    );
  };
  const deleteRecord = (record: any) => {
    let newData = data.map((e: any) => {
      if (e.id === record.id) {
        e.isDeleted = true;
      }
      return e;
    });
    setData(newData);
  };
  const columns = [
    {
      title: 'Translate Language',
      dataIndex: 'languageDescription',
      width: '25%',
      editable: false,
    },
    {
      title: 'Translate Word',
      dataIndex: 'translationContentContent',
      width: '25%',
      editable: true,
    },
    {
      title: 'Manage',
      dataIndex: 'operation',
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            <CustomButton
              color="danger"
              onClick={() => save(record.id)}
              className="btn2 btn--sizer">
              Update
            </CustomButton>
            <button
              type="button"
              className="container-cancel border-0 ms-3 form-label-font-size"
              onClick={cancel}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div className="manage-button" onClick={() => edit(record)}>
              <FaRegEdit />
            </div>
            <div
              className="manage-button"
              onClick={() => {
                deleteRecord(record);
              }}>
              <AiOutlineDelete />
            </div>
          </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const finalSubmit = () => {
    let finalArray: any = [];
    let finalDData = data;
    let deletedRequest: any = [];
    finalDData.map((reconstructingDataTotheApi: any) => {
      if (reconstructingDataTotheApi.isDeleted) {
        deletedRequest.push(reconstructingDataTotheApi.translationContentId);
      } else {
        let object = {
          id: reconstructingDataTotheApi.translationContentId,
          key: reconstructingDataTotheApi.translationContentkey,
          content: reconstructingDataTotheApi.translationContentContent,
          languageCode: reconstructingDataTotheApi.languageCode,
        };
        finalArray.push(object);
      }
    });
    let finalObjecttoTheApi = {
      languageCode: 'en',
      languageDescription: 'English',
      pageName: props.location.state.pageName,
      updateContentRequest: finalArray,
      toRemoveIds: deletedRequest,
    };
    dispatch(updatingtheExsitingLanguageParameters(finalObjecttoTheApi));
  };
  const onClickBack=()=>{
    props.history.push({
      pathname: "/dashboard/Setup-And-Configuration/Language-Parameter",
    })
  }
  let listedData = data;
  let asdasas = data.filter((item: any) => item.isDeleted === true);
  // listedData.filter((e: any) => {
  //   return e.isDeleted !== false;
  // });
  return (
    <div className="p-3">
      <div className="langugae-parameters-add-view">
        <section>
          <span className="span-highlight-text">Edit Language Parameters </span>
        </section>
        <section>
          <Button
            onClick={() => {
              props.history.push({
                pathname: '/dashboard/Setup-And-Configuration/Language-Parameter',
              });
            }}>
            Back
          </Button>
        </section>
      </div>
      <section className="mt-5">{headerItemForEditParameters()}</section>
      <section className="mt-5">
        <Form form={form} component={false}>
          <CustomHeader
            DisableMange={true}
            componentCell={EditableCell}
            CustomTableHeader={data.filter((item: any) => item.isDeleted !== true)}
            TableData={mergedColumns}
            rowClassName="editable-row"
            LengthofCount={10}
          />
        </Form>
      </section>
      <div className="languge-parameter-btn-left">
      <SubmitCancelButton
          button={'Submit'}
          secondButton={'Cancel'}
          onSubmit={finalSubmit}
          onCancel={() => onClickBack()}
        />
        
      </div>
      <CustomLoader isLoading={activityIndicator} size={50} />
    </div>
  );
};
export default LanguageParameterEdit;