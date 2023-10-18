'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';
import { NotionRenderer } from 'react-notion-x';

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  isRootPage?: boolean;
}

export default function NotionPage({ recordMap, isRootPage }: NotionPageProps) {
  const Code = dynamic(
    () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
    {
      ssr: false,
    },
  );
  const Collection = dynamic(
    () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
    {
      ssr: false,
    },
  );
  const Equation = dynamic(
    () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
    {
      ssr: false,
    },
  );
  const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
      ssr: false,
    },
  );

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={!isRootPage}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        nextImage: Image,
        nextLink: Link,
      }}
    />
  );
}