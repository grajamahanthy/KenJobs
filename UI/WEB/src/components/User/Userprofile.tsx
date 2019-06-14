import React from 'react';

class Userprofile extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            profilePicture: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit = (e: any) => {
        e.preventDefault();

    }

    onChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    render() {
        return (
            <>
                <h1>User Profile</h1>
                <div className="container">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-inverse" >
                                    <div className="card-body">
                                        <div className="card-block">
                                            <div className="row">
                                                <div className="col-md-8 col-sm-8">
                                                    <h2 className="card-title">First Name: Stffanie Osterich</h2>
                                                    <p className="card-text"><strong>Profile: </strong> Web Developer </p>
                                                    <p className="card-text"><strong>Skills: </strong> Theme, plugin and website development </p>
                                                    <p className="card-text"><strong>Experience: </strong>9 years </p>
                                                    <p className="card-text"><strong>Country: </strong>India </p>
                                                    <p className="card-text"><strong>Address: </strong> Chamiers Towers (East Wing), 5th Floor, No: 37,
                                                       Chamiers Road, Teynampet, Chennai-600018</p>
                                                    <p className="card-text"><strong>Phone: </strong>250-50-555</p>
                                                    <p className="card-text"><strong>Email: </strong>Test@kansuite.Com </p>
                                                </div>
                                                <div className="col-md-4 col-sm-4 text-center">
                                                    <img className="btn-md" src={require('../../assets/images/profile.png')} width="200" height="200" alt="" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        )
    }
}
export default Userprofile