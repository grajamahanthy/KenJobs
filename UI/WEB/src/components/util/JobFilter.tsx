import React from "react";
import { Card, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion'

class Jobfilter extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <>
                <div>
                    <h4 className="text-center">Filters</h4>
                    <div>
                        <div id="accordion">
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Top Companies
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div><input type="Checkbox" /> <span>IBM (20)</span></div>
                                            <div><input type="Checkbox" /> <span>HC Technologies (15)</span></div>
                                            <div><input type="Checkbox" /> <span>TCS (10)</span></div>
                                            <div><input type="Checkbox" /> <span>Infisys (4)</span></div>
                                            <div className="text-right text-primary"> View More..</div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            Location
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div><input type="Checkbox" /> <span>Chennai (20)</span></div>
                                            <div><input type="Checkbox" /> <span>Hyderabad (30)</span></div>
                                            <div><input type="Checkbox" /> <span>Bangalore (15)</span></div>
                                            <div><input type="Checkbox" /> <span>Delhi (10)</span></div>
                                            <div><input type="Checkbox" /> <span>Pune (12)</span></div>
                                            <div className="text-right text-primary"> View More..</div>

                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Jobfilter;