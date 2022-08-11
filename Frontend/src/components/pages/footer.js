import React from 'react';
import "./customClass.css";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FaxIcon from '@mui/icons-material/Fax';

export default function Footer(){
return(
    <>
    <div className='footer'>
        <div className='aboutus'>
            <h2>About Us</h2>
            <span>A great place for coffee and pastries. Also available cake for birthday and for
                 different occasions.A great place for coffee and pastries. Also available cake for birthday and for
                  different occasions.</span>
                  <span>A great place for coffee and pastries. Also available cake for birthday and for
                 different occasions.A great place for coffee and pastries. Also available cake for birthday and for
                  different occasions.</span>
        </div>
        <div className='contacts'>
            <h2>Contact Us</h2>
            <div className='contact' > <SmartphoneIcon/><span className='contact-t'>Contact : 985684545</span></div> <br/>
            <div className='contact'> <LocalPhoneIcon/><span className='contact-t'>Email : 985684545</span></div><br/>
            <div className='contact'> <EmailIcon/><span className='contact-t'>Tel : 985684545</span></div><br/>
            <div className='contact'> <FaxIcon/><span className='contact-t'>Fax : 985684545</span></div><br/>

        </div>
        <div className='mapsec'>
        <h2>Find Us</h2>
        <div class="mapouter"><div class="gmap_canvas">
            <iframe width="400" height="250" id="gmap_canvas" 
            src="https://maps.google.com/maps?q=ratopul&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
           </div></div>
        </div>
    </div>
    <div className='socialicon'>
        <div>
            <FacebookRoundedIcon />
        </div>
        <div>
            <InstagramIcon/>
        </div>
        <div>
            <TwitterIcon/>
        </div>
    </div>
    </>
)}