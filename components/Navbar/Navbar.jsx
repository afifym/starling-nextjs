import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

const Wrapper = styled.nav`
  padding: 1em 0;
  height: 10vh;

  div {
    cursor: pointer;
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Link href='/'>
        <a>
          <Image src='/logo.svg' alt='starling' width={128} height={77} />
        </a>
      </Link>
    </Wrapper>
  );
};

export default Navbar;
