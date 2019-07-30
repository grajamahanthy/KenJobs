import { Modal, Alert } from "react-bootstrap";
import React, { CSSProperties } from "react";

export default class LoaderModal extends React.Component<any, any> {
    constructor(props: any, state: any) {
        super(props, state);
    }

    render() {
        return (
            <Modal size="sm" show={true} centered className="{styles.loaderCls}">
                <Modal.Body>
                    <div className="mx-auto text-dark">
                        <div className="mx-auto loader"></div>
                        <div className="text-center">Loading.....</div>
                    </div>
                </Modal.Body>
            </Modal>

        );
    }
}

const styles = {
    loaderCls: {
        zIndex: 999
    } as CSSProperties
};