import React from 'react';
import Banner from './Banner/Banner';
import Feature from './Feature/Feature';
import { Helmet } from 'react-helmet-async';
import ContactMe from './Contact/ContactMe';
import WhyDonate from './WhyDonate/WhyDonate';

const Home = () => {
      return (
            <div className='mb-12'>
                  <Helmet>
                        <title>LifeStream || Home</title>
                  </Helmet>
                  <Banner></Banner>
                  <WhyDonate></WhyDonate>
                  <Feature></Feature>
                  <ContactMe></ContactMe>
            </div>
            
      );
};

export default Home;