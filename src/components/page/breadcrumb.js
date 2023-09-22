'use client';

import { Breadcrumb } from 'flowbite-react';
import Link from 'next/link';

export default function Breadcrumbs({ len, ids }) {

    const arr = [];
    for (let i=0; i<len; i++) {
        arr.push(
            <Breadcrumb.Item className='font-bold text-black' >
                <Link href={`${(i === len-1) ? '' : Object.values(ids[i])}`} className={`font-bold text-black text-base ${(i == len-1) ? 'hover:cursor-default' : ''}`}>
                    {Object.keys(ids[i])}
                </Link>
            </Breadcrumb.Item>
        )
    }

  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      {arr}
    </Breadcrumb>
  )
}


