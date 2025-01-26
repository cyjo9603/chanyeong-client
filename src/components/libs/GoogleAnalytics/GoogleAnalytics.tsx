import React from 'react';
import Script from 'next/script';

const GoogleAnalytics: React.FC = () => {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
