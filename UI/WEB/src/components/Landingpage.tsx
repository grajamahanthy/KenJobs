import React from 'react'
import { Carousel } from 'react-bootstrap'

const LandingForm: React.FC = () => {
    return (
        <>

            {/* <header className="killimanjaro-header text-white bg-primary">
                <div className="container text-center">
                    <h2 className=" text-white pt-2">Trending Jobs</h2>
                    <Carousel className="pt-5 pt-5">
                        <Carousel.Item>
                            <h3 className="text-white">Designer</h3>
                        </Carousel.Item>
                        <Carousel.Item>

                            <h3 className="text-white">Dev Oops Engineer</h3>

                        </Carousel.Item>
                        <Carousel.Item>
                            <h3 className="text-white">Web Developer</h3>

                        </Carousel.Item>
                    </Carousel>
                </div>
            </header>
            */}
            <header className="killimanjaro-header text-white mt-5">
                <div className="container text-center">
                    <div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <h1 className="text-warning">Featured</h1>
                            </li>
                            <li className="list-inline-item">
                                <h1 className="text-primary">Jobs </h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <section id="about">
                <div className="album py-5 bg-light">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img className="card-img-top" src={require('../assets/images/img7.jpg')} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Full Stack Developer</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-primary">Apply</button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img className="card-img-top" src={require('../assets/images/img8.jpg')} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Photographer</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-primary">Apply</button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img className="card-img-top" src={require('../assets/images/img9.jpg')} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">Finance Advisor</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-primary">Apply</button>
                                            </div>
                                            <small className="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/*  */}
            <header className="killimanjaro-header text-white">
                <div className="container text-center">
                    <div>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <h1 className="text-warning">Browse </h1>
                            </li>
                            <li className="list-inline-item">
                                <h1 className="text-primary">Categories </h1>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <section id="about">
                <div className="album py-5">
                    <div className="container">
                        <div className="col-md-10 mx-auto">
                            <div className="row">
                                <div className="col-md-4 ljobcategories">
                                    <div className="mb-2">
                                        <img className="" src={require('../assets/images/icons/landingicons/Finance.svg')} alt="Card image cap" />
                                    </div>
                                    <div>
                                        <h3>FINANCE</h3>
                                        <p>500+ JOBS</p>
                                    </div>
                                </div>
                                <div className="col-md-4 ljobcategories">
                                    <div className="mb-2">
                                        <img className="" src={require('../assets/images/icons/landingicons/Education.svg')} alt="Card image cap" />
                                    </div>
                                    <div className="">
                                        <h3>EDUCATION/TRAINING</h3>
                                        <p>500+ JOBS</p>
                                    </div>
                                </div>
                                <div className="col-md-4 ljobcategories">
                                    <div className="mb-2">
                                        <img className="" src={require('../assets/images/icons/landingicons/HealthCare.svg')} alt="Card image cap" />
                                    </div>
                                    <div className="text-primary">
                                        <h3>HEALTHCARE</h3>
                                        <p>500+ JOBS</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 ljobcategories">
                                    <div className="mb-2">
                                        <img className="" src={require('../assets/images/icons/landingicons/Technology.svg')} alt="Card image cap" />
                                    </div>
                                    <div>
                                        <h3>FINANCE</h3>
                                        <p>500+ JOBS</p>
                                    </div>
                                </div>
                                <div className="col-md-4 ljobcategories">
                                    <div className="mb-2">
                                        <img className="" src={require('../assets/images/icons/landingicons/Science.svg')} alt="Card image cap" />
                                    </div>
                                    <div className="">
                                        <h3>EDUCATION/TRAINING</h3>
                                        <p>500+ JOBS</p>
                                    </div>
                                </div>
                                <div className="col-md-4 ljobcategories" >
                                    <div className="mb-2">
                                        <img className="" src={require('../assets/images/icons/landingicons/Construction.svg')} alt="Card image cap" />
                                    </div>
                                    <div className="text-primary">
                                        <h3>HEALTHCARE</h3>
                                        <p>500+ JOBS</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
            <div className="row mt-5"></div>
 
        </>
    )
}
export default LandingForm