import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    className="pizza-block"
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="130" r="130" />
    <rect x="0" y="280" rx="7" ry="7" width="280" height="27" />
    <rect x="0" y="327" rx="7" ry="7" width="280" height="88" />
    <rect x="0" y="447" rx="8" ry="8" width="90" height="27" />
    <rect x="123" y="436" rx="26" ry="26" width="155" height="45" />
  </ContentLoader>
);

export default Skeleton;
