import React from 'react';
import Intro from '../../Components/Intro/Intro';


const IntroScreen3 = ({navigation}) => {
  return (
    <Intro
      backgroundImage={require('./images/intro2.png')}
      title="EMERGENCY SERVICES" 
      highlightText="Get urgent help " 
      description="whenever and wherever you need it"
      onSkipPress={() => navigation.replace('RegFlow')} // Skip to login
      onNextPress={() => navigation.navigate('RegFlow')} // Go to next intro screen
      activeDotIndex={3}
    />
  );
};

export default IntroScreen3;
