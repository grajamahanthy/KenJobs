import { Modal, Alert } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";
import AAlert from "../ModelComponents/Alert";
import AButton from "../ModelComponents/Alert";




interface CustomProps {
  message: AAlert
}




export default class CModal extends React.Component<CustomProps, any> {
  firstLoad: boolean = false;
  onClickLoad: boolean = false;
  show: boolean = false;
  
  constructor(props: any, state: any){
      super(props, state);
      //debugger;
      this.firstLoad = true;
      this.state = {
        show: true
      }

      //Binding Events
      this.props.message.clickEvent.bind(this);
  }

  setShow(e: any, btnId:number){
    //debugger;    
    this.props.message.clickEvent(Event, btnId);
    this.setState({show: false});
    this.onClickLoad = true;
    this.show = false;
  }

  hideModal(e: any){
    this.setState({show: false});
    this.onClickLoad = true;
    this.show = false;
  }
  
  render() {
    //debugger;
    this.show = this.firstLoad || !this.onClickLoad;
    this.firstLoad = false;
    this.onClickLoad = false;

    


    if(!this.show){
      return(<></>);
    }
    else{
      const buttons = [];
      for (let i = 0; i < this.props.message.buttons.length;i ++) {
        let btn = this.props.message.buttons[i];
        buttons.push(<Button onClick={this.setShow.bind(this, Event, btn.id)} key={i}>{btn.value}</Button>)
      }

      return (
        <Modal
          {...this.props}
          show={this.props.message.showModal}
          onHide={this.hideModal.bind(this, Event)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {this.props.message.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.props.message.body}
            </p>
          </Modal.Body>
          <Modal.Footer>
            {buttons}       
          </Modal.Footer>
        </Modal>
      );
    }
  }
}