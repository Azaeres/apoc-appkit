import React from 'react';
import { testStore } from 'app/views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';
import Header from 'app/views/shared/Header';
import Navigation from 'app/views/shared/Navigation';

function Two({ value, context }) {
  return (
    <div>
      <Header title="iFrame" />
      <Navigation routerContext={context} />
      <div>
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.9553115011754!2d-118.41571498452588!3d34.0193580269093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba36617f8c25%3A0x56771e0516628060!2s3641+Midvale+Ave%2C+Los+Angeles%2C+CA+90034!5e0!3m2!1sen!2sus!4v1527482117382"
          width={600}
          height={450}
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen
        />{' '}
        {/* <iframe
          title="Weather"
          src="https://weather-pwa-sample.firebaseapp.com/final/index.html"
          width="100%"
          height={450}
          style={{ maxWidth: 540 }}
        /> */}
      </div>
    </div>
  );
}

export default compose(hot(module), withStore(testStore), pure)(Two);
