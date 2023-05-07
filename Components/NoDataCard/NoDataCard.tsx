import React from 'react'
import {
    Card, CardText, CardBody
  } from 'reactstrap';
  import './NoDataCard.scss'
  import {NoDataCardProps} from '../../models/NoDataCard.model'

const NoDataCard = (props:NoDataCardProps) => {
  if(props.isEnquiryScreen===true){
    return (
      <div>
      <Card className="card-top-margin"> 
        <CardBody className="card-display">
          <CardText className="span-font text-center">{props.children}</CardText>
        </CardBody>
      </Card>
    </div>
  )
  }else{
    return (
        <div>
        <Card className="card-top-margin"> 
          <CardBody className="card-display">
            <CardText className="span-font">No Transaction Found.</CardText>
           <span className="span-font">Click <span onClick={props.onClickAddEvent} className="span-font-highlight">Here&nbsp;</span>To Add New Transaction</span>
          </CardBody>
        </Card>
      </div>
    )
  }
}
 
export default NoDataCard;