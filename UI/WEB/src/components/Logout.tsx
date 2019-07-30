import React from "react";
import { Redirect } from "react-router-dom";
import { AppState } from "../store";
import { connect } from "react-redux";
import { updateSession } from "../store/auth/actions";

const Logout = (props: any) => {

    localStorage.removeItem("authInfo");
    let usertype = "jobseeker";
    props.updateSession({
        loggedIn: false,
        token: "",
        loginType:"",
        userName: ""
    })

    // return <Redirect to={"/login/" + usertype} />;
    return <Redirect to={"/"} />;
};

const mapStateToProps = (state: AppState) => ({
    system: state.system
});

export default connect(
    mapStateToProps,
    { updateSession }
)(Logout)
