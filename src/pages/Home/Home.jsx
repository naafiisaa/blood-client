import React from 'react';
import Banner from './Banner/Banner';
import Feature from './Feature/Feature';

import ContactMe from './Contact/ContactMe';
import WhyDonate from './WhyDonate/WhyDonate';

const Home = () => {
      return (
            <div className='mb-12'>
                 
                  <Banner ></Banner>
                  <WhyDonate></WhyDonate>
                  <Feature></Feature>
                  <ContactMe></ContactMe>
            </div>
            
      );
};

export default Home;