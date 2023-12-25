import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDotCircle} from '@fortawesome/free-solid-svg-icons'
import './Home.css';
import { useNavigate } from "react-router-dom";

const ServiceImage= require.context("../../../public/Images");
const Home=()=>{
    return(
        <div>
              <HomeBookAppointment/>
            <HomeGroomingSection/>
            <HomeUnique/>
            </div>
    )
}
const HomeBookAppointment=()=>{
    const navigate = useNavigate();
    return(
        <div className='bannerImageBox'>
            <div className='bannerImageDogBox'>
                <img height="100%"style={{zIndex:10,  position: "relative",top: "27%",left:"15%"
}}  src={ServiceImage('./dogleft.png')}></img>
    <div  style={{zIndex:5}}className='DogCircle'></div>
            </div>
         <Container className='bannerBoxBook'>
        
                <Row className='bannerBox'>
                    <div className='bannerFormHeading scale-in-center '>Your Pet's Health, <br></br>  Our Priority!</div>
                    <div className='bannerFormDescriptionDiv'>
                    <div className='bannerFormDescription'><FontAwesomeIcon icon={faDotCircle}/>   24x7 Online Vet Consultation</div>
                    <div className='bannerFormDescription'><FontAwesomeIcon icon={faDotCircle}/>   Trusted & Affordable Vetcare</div>
                    </div>
               
                    <button  style={{ width: "fit-content"}}className='bookConsultationButton'>Book Appointment</button>
                </Row>
                </Container>
            </div>
    )
}
const HomeGroomingSection=()=>{
    const [isVisible, setIsVisible] =React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => {
        const div = document.getElementById('animatedDiv');
        const rect = div.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return(
        <div id="animatedDiv" className={`GroomAbout ${isVisible ? 'visibleAbout' : ''} HomeGroomSection`}>
               <Container>

                <Row>
                    <Col  className='groomcolImageDiv'>
                    <div className="gromImageCol"></div>
                    <div className='groomImage'>

                    </div>
                    </Col>
                    <Col  style={{    margin: "auto"}}>
      
                    <Row>
                             
                   <h2 className='AboutUsHeading'>About Us</h2>
                   <div>At Vet-World, we're passionate about pets and their well-being. With expertise in technology and a love for animals, we're dedicated to making pet care more convenient and accessible. </div>
                    </Row>
                    <Row>
                   <h4 className='AboutUsHeading'>Our Mission</h4>
                   <div>Our mission is to simplify your pet's healthcare journey. From scheduling vet appointments to accessing your pet's health records and even consulting with a vet online, we're here to make it all seamlessly easy for you.</div>
                    </Row>
                    <Row>
                        <h4 className='AboutUsHeading'>What We Offer</h4>
                    <ul>
                        <li><FontAwesomeIcon icon={faCircleCheck}/>    Appointment Scheduling: Effortlessly choose your preferred date and time for a vet visit, and leave the rest to us.</li>
                        <li><FontAwesomeIcon icon={faCircleCheck}/>   Accessible Health Records: View your pet's comprehensive records, including vaccination history and check-up details, with ease.</li>
                        <li><FontAwesomeIcon icon={faCircleCheck}/>    Expert Vet Consultations: Gain the convenience of online vet consultations whenever you need professional guidance and support.</li>
                    </ul>
                    </Row>
                    </Col>
                </Row>
                </Container>
            </div>
    )
}
const HomeUnique=()=>{
    const [isVisible, setIsVisible] =React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => {
        const div = document.getElementById('animatedDiv1');
        const rect = div.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return(
        <div id="animatedDiv1" className={`GroomOurMission ${isVisible ? 'visibleOurmission' : ''} HomeGroomSection`}>
        <Container>

         <Row>
      
             <Col>

             <Row>
                      
            <h2 className='OurMissionHeading'>Our Promise</h2>
           

            <div>At Vet-World, our commitment is to simplify and enhance pet care. Our website is user-friendly and accessible across all your devices, ensuring convenience.<br></br>
            We're more than just a vet clinic; we're your dedicated partners in ensuring your pets' well-being and happiness. Whenever you have questions or require assistance, don't hesitate to reach out. We're here to support you and your beloved pets every step of the way.<br></br>
             Thank you for choosing Vet-World for your pet's care; where your pets' health and happiness are our top priorities. </div>
<button  style={{ width: "fit-content"}}className='bookConsultationButton'>Book Appointment</button>
             </Row>
             </Col>
             <Col  className='OurMissionFoot '>
             <div className="OurMissionCol"></div>
             <div className='OurMissionImage'>

             </div>
             </Col>
         </Row>
         </Container>
     </div>
    )
}
export default Home;