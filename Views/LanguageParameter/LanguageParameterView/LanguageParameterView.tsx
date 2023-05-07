import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import CustomHeader from '../../../Components/CustomTable/CustomTable';
import CustomLoader from '../../../Components/Loader/CustomLoader';
import { getSelectedLanguageInfo } from '../../../redux/action/LanguageParameterAction';

import './LanguageParameterView.scss';

const LanguageParameterView = (props: any) => {
  const dispatch = useDispatch();
  const gettingSelectedKeyFromPreiousRoute = props.location.state.key;
  let englishContent = '';
  //Setting Content to Default tab:
  props.location?.state.languageContent.filter((gettingContent: any) => {
    if (gettingContent.languageCode === 'en') {
      englishContent = gettingContent.content;
    }
  });
  //Selectors:
  const activityIndicator = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.isLoading
  );
  const gettingSelectedLangInfo = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.selectedLanguageInfo?.data
  );
  useEffect(() => {
    if (gettingSelectedKeyFromPreiousRoute) {
      dispatch(getSelectedLanguageInfo(gettingSelectedKeyFromPreiousRoute));
    }
  }, [gettingSelectedKeyFromPreiousRoute]);

  const headerItem = () => {
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
            type="textarea"
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
  const Header = [
    {
      title: 'Translate Language',
      dataIndex: 'languageDescription',
      key: 'languageDescription',
      sorter: {
        compare: (a: any, b: any) => a.pageName.localeCompare(b.pageName),
      },
    },
    {
      title: 'Translate Word',
      dataIndex: 'translationContentContent',
      key: 'translationContentContent',
      sorter: {
        compare: (a: any, b: any) => a.pageName.localeCompare(b.pageName),
      },
      // render: function (text: any, record: any, index: any) {
      //   return record.translationContentResponse.content;
      // },
    },
  ];

  return (
    <div className="p-3">
      <div className="langugae-parameters-view">
        <section>
          <span className="span-highlight-text">View Language Parameters </span>
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
      <section className="mt-5">{headerItem()}</section>
      <section className="mt-5">
        <CustomHeader
          DisableMange={true}
          TableData={Header}
          CustomTableHeader={gettingSelectedLangInfo}
          LengthofCount={10}></CustomHeader>
      </section>
      <CustomLoader isLoading={activityIndicator} size={50} />
    </div>
  );
};

export default LanguageParameterView;
