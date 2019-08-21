import React, { useState } from 'react';
import ImageModel from '../../Models/Image'
import { any } from 'prop-types';
import UserAttachmentModel from '../../Models/UserAttachment';

const container = {
    width: '40px',
    height: '5px solid pink',
    borderRadius: '100px',
    background: '#333'
};
const name = {
    width: '100%',
    // textAlign: 'center',
    color: 'white',
    fontSize: '28px',
    lineHeight: '100px',
};

class ProfileImg extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state={
            Imagedata:props.data,
            user:new UserAttachmentModel()
        }
    }
    componentDidMount(){
        this.setState({
            user:this.props.data
        },()=>console.log(this.state.user.Attachment.Base64Text));
    }
    render() {
        return (
            <>
                {/* {Image.Base64Text != "" && Image.Base64Text != null ?
                    <img src={Image.Base64Text} className="rounded-circle ml-2" width="30" height="40" />
                    :
                    <div id="container" style={container}>
                        <div id="name" style={name}>
                            {Image.FirstName + '' + Image.LastName}
                        </div>
                    </div>
                } */}
            </>)

    }
}
export default ProfileImg;