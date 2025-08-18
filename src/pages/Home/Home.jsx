import React from 'react';
import Banner from './Banner/Banner';
import Feature from './Feature/Feature';

import ContactMe from './Contact/ContactMe';
import WhyDonate from './WhyDonate/WhyDonate';
import RecentRequests from './RecentRequests/RecentRequests';
import UpcomingEvents from './UpcomingEvents/UpcomingEvents';
import FAQ from './FAQ/FAQ';
import Testimonials from './Testimonials/Testimonials';

const Home = () => {
      return (
            <div className=''>
                 
                  <Banner ></Banner>
                  <WhyDonate></WhyDonate>
                  <RecentRequests />
                  <Feature></Feature>
                  <UpcomingEvents />
                  <Testimonials />
                  <FAQ />
                  <ContactMe></ContactMe>
            </div>
            
      );
};

export default Home;