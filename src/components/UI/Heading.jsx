import React from 'react';

function Heading({ lvl, children, ...props }) {
  const Heading = `h${lvl}`;
  return <Heading {...props}>{children}</Heading>;
}

export default Heading;
