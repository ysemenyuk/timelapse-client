import React from 'react';

const Heading = ({ lvl, children, ...props }) => {
  const Heading = `h${lvl}`;
  return <Heading {...props}>{children}</Heading>;
};

export default Heading;
