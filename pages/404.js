import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Content Not Found</h1>
      <p>
        Go back to the
        <Link href='/'>
          <a href='/'>Homepage</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
