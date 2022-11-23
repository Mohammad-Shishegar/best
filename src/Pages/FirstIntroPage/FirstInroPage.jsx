import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import NewsTicker from "react-advanced-news-ticker";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Link, useNavigate } from "react-router-dom"
import "../../assets/scss/pages/_first-intro-page.scss"
// import {useNavigate} from "react-router-dom"

const support = require("../../assets/images/support.jpg")

const feature1 = require("../../assets/images/6948.jpg")
const feature2 = require("../../assets/images/5124556.jpg")
const feature3 = require("../../assets/images/5127314.jpg")
const bakground = require("../../assets/images/logo-wBg.png")


function FirstInroPage(props) {

  const navigate = useNavigate()

  const CheckLogin = async (page) => {
    const token = await localStorage.getItem("token")
    if (token) {
      navigate(`${process.env.PUBLIC_URL}/dashboard`)
    }
    else {
      if (page === "login") {
        navigate(`${process.env.PUBLIC_URL}/pages/authentication/login`, { replace: true })
      }
      else {
        navigate(`${process.env.PUBLIC_URL}/pages/authentication/register`, { replace: true })
      }
    }
  }

  return (
    <div className="firstIntroPage">
      <body id="page-top">
        {/* <!-- Navigation--> */}
        <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
          <div class="container px-4 px-lg-5">
            <img class="back-img" src={bakground} />
            {/* <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button> */}
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ms-auto my-2 my-lg-0">
                {/* <li class="nav-item"><a class="nav-link" href="#about">About</a></li> */}
                <li class="nav-item"><Link class="nav-link " to={`${process.env.PUBLIC_URL}/pages/About`}>About</Link></li>
                <li class="nav-item"><Link class="nav-link " to={`${process.env.PUBLIC_URL}/pages/Privacy-Policy`}>Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <header class="masthead">
          <div class="container px-4 px-lg-5 h-100">
            <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
              <div class="col-lg-8 align-self-end">
                <h1 class="text-white font-weight-bold">Your The deserve the Best</h1>
                <hr class="divider" />
              </div>
              <div class="col-lg-8 align-self-baseline">
                {/* <p class="text-white-75 mb-5">This website has many features and you can use this website for your skills and improve your business</p> */}
                <div style={{ height: "30px", marginBottom: "15px" }}>
                  <NewsTicker
                    rowHeight={30}
                    maxRows={1}
                    speed={600}
                    // direction={Directions.UP}
                    duration={4000}
                    autoStart={true}
                    pauseOnHover={false}
                    id="myId"
                    className="myClassName1 myClassName2"
                    style={{ marginTop: 10, height: "80%" }}>
                    <p class="text-white">Best price</p>
                    <p class="text-white">Best people</p>
                    <p class="text-white">Best service</p>
                    <p class="text-white">Best Company</p>
                    <p class="text-white">Best employee</p>
                    <p class="text-white">Best employer</p>
                    <p class="text-white">Best specialist</p>
                    <p class="text-white">Best Salary</p>
                    <p class="text-white">Best Employment</p>
                    <p class="text-white">Best human resource</p>
                  </NewsTicker>
                </div>
                <button class="btn btn-primary btn-xl margin-lf " onClick={() => CheckLogin("register")} >Sign up</button>
                <button class="btn btn-primary btn-xl margin-lf" onClick={() => CheckLogin("login")}>Sign in</button>
              </div>
            </div>
          </div>
        </header>
        {/* <!-- About--> */}
        <section class="page-section color-purple" id="about">
          <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-lg-8 text-center">
                <h2 class="text-white mt-0">We've got what you need!</h2>
                <hr class="divider divider-light" />
                <p class="text-white-75 mb-4">It doesn't matter what skills you have, join us and expand your business and increase your income</p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Services--> */}
        <section class="page-section" id="services">
          <div class="container px-4 px-lg-5">
            <h2 class="text-center mt-0">Some Features</h2>
            <hr class="divider color-purple" />
            <div class="row gx-4 gx-lg-5">
              <div class="col-lg-4 col-md-12 text-center">
                <div class="mt-5">
                  <div class="mb-2"><i class="bi-gem fs-1 text-primary"></i></div>
                  <div className='box'>
                    <img src={feature3} alt="feature3" className='featureImg' />
                    <h3 class="h4 mb-2 featureH3">Many features</h3>
                    <p class="text-muted mb-0">This Web site has many feature that you can working with them</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 text-center">
                <div class="mt-5">
                  <div class="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                  <div className='box'>
                    <img src={feature2} alt="feature2" className='featureImg' />
                    <h3 class="h4 mb-2">Support</h3>
                    <p class="text-muted mb-0">24 hour support</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 text-center">
                <div class="mt-5">
                  <div class="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                  <div className='box'>
                    <img src={feature1} alt="feature1" className='featureImg' />
                    <h3 class="h4 mb-2">Easy to use</h3>
                    <p class="text-muted mb-0">Working with this site is very simple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Footer--> */}
        <footer class="bg-light py-5">
          <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2022 - Company Name</div></div>
        </footer>
      </body>
    </div>
  )
}

export default FirstInroPage