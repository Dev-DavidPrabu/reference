import { Form, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { TiArrowBackOutline } from 'react-icons/ti';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { FormGroup, Input, Label } from 'reactstrap';
import CustomHeader from '../../Components/CustomTable/CustomTable';
import DeleteConfirmaionPopUp from '../../Components/DeletePopUp/DeleteConfirmationPopUp';
import CustomLoader from '../../Components/Loader/CustomLoader';
import SubmitCancelButton from '../../Components/SubmitCancelButton/SubmitCancelButton';
import CustomResponseMessage from '../../Components/UI/ApiResponse/CustomResponseMessage';
import CustomButton from '../../Components/UI/CustomButton';
import { EditableCellProps, Item } from '../../models/AMLcomplianceModel';
import { EditLanguageParameter, getLanguage } from '../../redux/action/LanguageParameterAction';

const LanguageParameterEdit = (props: any) => {
  const [editingKey, setEditingKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [click, setclick] = useState(false);
  const [newUpdate, setnewUpdate] = useState(Array);

  const location: any = useLocation();
  const [form] = Form.useForm();

  const [columns, setcolumns] = useState([]);
  const { Option } = Select;
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [LanguageCode, setLanguageCode] = useState('');

  let englishContent = '';
  //Setting Content to Default tab:
  props.location.state.languageContent.filter((gettingContent: any) => {
    if (gettingContent.languageCode === 'en') {
      englishContent = gettingContent.content;
    }
  });
  const [LanguageParameterEditData, setLanguageParameterEditData] = useState({
    id: location?.state?.id,
    languageCode: location?.state?.languageCode,
    languageDescription: location?.state?.languageDescription,
    PageName: location?.state?.pageName,
    translationContentResponseId: location?.state?.translationContentResponse?.id,
    translationContentResponseKey: location?.state?.translationContentResponse?.key,
    translationContentResponseContent: englishContent,
    // toRemoveIds:location?.state?.
  });
  const [update, setUpdate] = useState({});
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  const LanguageParameterEdit: any = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.getLanguageParameterEdit
  );
  const LanguageCodeResponse = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.getLanguage
  );
  const fetchLanguageCode = useCallback(async () => {
    try {
      dispatch(getLanguage());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    fetchLanguageCode();
  }, [fetchLanguageCode]);
  const updateData = useCallback(
    async (obj: any) => {
      try {
        dispatch(EditLanguageParameter(obj));
      } catch (err) {}
    },
    [dispatch]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguageParameterEditData({
      ...LanguageParameterEditData,
      [e.target.name]: e.target.value,
    });
  };
  const getLanguageViewResData = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.getLanguageParameterview
  );
  const isEditing = (record: Item) => record.id === editingKey;
  const Handledelete = (record: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(record);
  };
  const deleteTheSelectedRecord = (obj: any) => {
    deletingRecord(obj).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingRecord = useCallback(
    async (recordId: string) => {
      let obj = {
        id: LanguageParameterEditData?.id,
        languageCode: LanguageParameterEditData?.languageCode,
        languageDescription: LanguageParameterEditData?.languageDescription,
        PageName: LanguageParameterEditData?.PageName,
        updateContentRequest: [
          {
            id: LanguageParameterEditData?.translationContentResponseId,
            key: LanguageParameterEditData?.translationContentResponseKey,
            content: LanguageParameterEditData?.translationContentResponseContent,
          },
        ],
        toRemoveIds: [LanguageParameterEditData?.translationContentResponseId],
      };
      try {
        dispatch(EditLanguageParameter(obj));
      } catch (err) {}
    },
    [dispatch]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, record: any) => {
    e.preventDefault();

    updateData(update);
  };

  const cancel = () => {
    setEditingKey('');
  };

  useEffect(() => {
    if (LanguageParameterEdit) {
      if (LanguageParameterEdit.data) {
        setEditingKey('');

        history.push({
          pathname: '/dashboard/Setup-And-Configuration/Language-Parameter',
          state: {
            add: false,
          },
        });
      } else if (LanguageParameterEdit.error) {
        setApiMessage(LanguageParameterEdit?.data?.message);
        setEditingKey('');
      }
    }
  }, [LanguageParameterEdit]);

  const onClickBack = () => {
    props.history?.push({
      pathname: '/dashboard/Setup-And-Configuration/Language-Parameter',
    });
  };
  const onUpdate = async (record: any) => {
    let jerk = LanguageData.filter((item: any) => {
      if (item.content !== record.content) {
        return item;
      }
    });
    const newJerk = [...jerk, record];
    // let removeContent=newJerk.map((item:any)=>{

    //    return {
    //     ...item,
    //   content:"dkslkd"
    //    }

    // })
    setclick(true);
    setnewUpdate(newJerk);
    //setIsLoading(true);
    const row = await form.validateFields();

    record.content = row.content;
    let updateContentRequest = [
      {
        content: record.content,
        id: LanguageParameterEditData?.translationContentResponseId,
        key: LanguageParameterEditData?.translationContentResponseKey,
      },
    ];
    let toRemoveIds = [''];
    const {
      translationContentResponseContent,
      translationContentResponseId,
      translationContentResponseKey,
      ...newobj
    } = LanguageParameterEditData;
    let constructObj = {
      updateContentRequest,
      toRemoveIds,
      ...newobj,
    };
    setUpdate(constructObj);
    setEditingKey('');
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  let LanguageData = getLanguageViewResData?.data;
  LanguageData = LanguageData?.map((item: any) => {
    return {
      ...item,
      content: item?.translationContentResponse?.content,
    };
  });
  const header = [
    {
      title: 'Translate Language',
      dataIndex: 'languageDescription',
      checked: true,
      editable: false,

      sorter: {
        compare: (a: any, b: any) => a.translateLanguage?.localeCompare(b.translateLanguage),
      },
    },
    {
      title: 'Translate Word',
      dataIndex: 'content',
      checked: true,
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.content?.localeCompare(b.content),
      },
    },
    {
      title: 'Manage',
      dataIndex: 'manage',
      checked: true,
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            <CustomButton
              color="danger"
              onClick={() => onUpdate(record)}
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
            <div className="manage-button" onClick={() => Handledelete(record)}>
              <AiOutlineDelete />
            </div>
          </div>
        );
      },
    },
  ];
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);

    setLanguageCode(obj.code);
    setLanguageParameterEditData({
      ...LanguageParameterEditData,
      languageDescription: obj.description,
    });
  };
  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const edit = (record: any) => {
    form.setFieldsValue({
      translateLanguage: '',
      content: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const mergedColumns = header?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'content' ? 'dropdown' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
    const inputMode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0, width: '40%' }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}>
            {inputMode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return (
    <>
      <div className="d-flex p-4">
        <div className="col-6 d-flex justify-content-between notification-setup-headerAlign">
          <div>
            <h1 className="text-bold notification-setup-title">{'Edit Language Parameter'}</h1>
          </div>
          {apiMessage && <CustomResponseMessage apiStatus={true} closeMessage={closeMessage} />}
          <div>
            <CustomButton
              className="notification-setup-back text-bold text-dark ms-5"
              onClick={onClickBack}>
              <TiArrowBackOutline style={{ margin: 'auto 5px' }} />
              Back
            </CustomButton>
          </div>
          {apiMessage && <CustomResponseMessage apiStatus={true} closeMessage={closeMessage} />}
        </div>
      </div>
      <div className="colorWhite payout-filter-section mt-3 p-3 ms-4 me-4 ">
        <div className="container-fluid filter_all_container">
          <div className="input_field_container">
            <FormGroup>
              <Label for="exampleEmail">Select Language</Label>
              <Select
                onChange={handleChangeCode}
                showSearch
                filterOption={(input: any, value: any) => {
                  return value.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
                id="fieldName1"
                className="prefund-Account-input form-control border-0 cursor"
                value={LanguageParameterEditData.languageDescription}
                style={{ height: '38px' }}>
                {LanguageCodeResponse &&
                  LanguageCodeResponse?.data?.length > 0 &&
                  LanguageCodeResponse?.data?.map((value: any) => {

                    return <Option value={JSON.stringify(value)}>{value.description}</Option>;
                  })}
              </Select>
            </FormGroup>
          </div>
          <div className="input_field_container">
            <FormGroup>
              <Label for="exampleEmail">Page Name</Label>

              <Input
                type="text"
                value={LanguageParameterEditData.PageName}
                name="PageName"
                onChange={handleChange}
                className="AMLTxnSummaryReport-input"></Input>
            </FormGroup>
          </div>
          <div className="input_field_container">
            <FormGroup>
              <Label for="exampleEmail">Translate Word</Label>

              <Input
                type="text"
                value={LanguageParameterEditData.translationContentResponseKey}
                name="translationContentResponseKey"
                onChange={handleChange}
                className="AMLTxnSummaryReport-input"></Input>
            </FormGroup>
          </div>
        
          <button
            className="generateBtn border-0 LOD_btn_margin"
            //onClick={handleSubmit}
          >
            Translate
          </button>
          <button
            className="SubmitCancelButton-cancel mt-4"
            //onClick={handleSubmit}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="mt-3 ms-4 me-4">
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <Form form={form} component={false}>
            <CustomHeader
              TableData={columns.length > 0 ? columns : mergedColumns}
              componentCell={EditableCell}
              CustomTableHeader={click ? newUpdate : LanguageData}
              Delete={true}
              deleteUser={Handledelete}
              DisableMange={columns.length > 0 ? true : false}
              Edit={true}
              editUser={edit}
              //checkLength={reportsData.length}
            />
          </Form>
        )}
        <SubmitCancelButton
          button={'Save'}
          secondButton={'Cancel'}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
        <DeleteConfirmaionPopUp
          showModal={showModal}
          closeDeleteConfirmation={closeDeleteConfimationGroup}
          selectedFestivalInfo={selectedRecordInfo}
          deleteTheSelectedRecord={deleteTheSelectedRecord}></DeleteConfirmaionPopUp>
      </div>
    </>
  );
};
export default LanguageParameterEdit;
