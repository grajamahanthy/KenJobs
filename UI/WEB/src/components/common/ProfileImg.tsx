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
        let userImg = props.imgdata.app_prop.profileimg;
        this.state = {
            Image: userImg,
            // user:this.props.data
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <>
                <div className="rounded-circle " style={{overflow:"hidden"}} >
                    {this.state.Image != "" && this.state.Image != null ?
                        <img src={this.state.Image} className="img-fluid img-rounded" style={{ height: "40px"  }} alt='' />
                        :
                        <img src={require('../../assets/images/DP_white.png')} className="img-fluid img-rounded" style={{ height: "40px" }} alt='' />

                    }
                </div>
            </>)

    }
}
export default ProfileImg;