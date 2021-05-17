import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

import { FaSearch, FaBell } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

const Wrapper = styled.nav`
  margin: 1em;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      min-width: 40px;
      text-align: center;
    }

    a {
      padding: 1em 2em;
      font-weight: 600;
    }
  }

  .signup-btn a {
    background-color: ${({ theme }) => theme.colors.main1};
    border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};
  }
`;

const Navbar: React.FC = () => {
  return (
    <Wrapper className=''>
      <Link href='/'>
        <a>
          <Image src='/logo.svg' alt='starling' width={128} height={77} />
        </a>
      </Link>

      <ul>
        <li>
          <FaSearch size={20} />
        </li>
        <li>
          <FaBell size={20} />
        </li>

        <li>
          <MdSettings size={23} />
        </li>
        <li>
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </li>
        <li className='signup-btn'>
          <Link href='/signup'>
            <a>Signup</a>
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Navbar;
