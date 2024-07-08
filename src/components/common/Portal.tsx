'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const portalRoot = useRef<HTMLDivElement>();

  useEffect(() => {
    const div = document.createElement('div');
    div.id = 'portal-root';
    document.body.appendChild(div);
    portalRoot.current = div;
    setMounted(true);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, portalRoot.current!);
};

export default Portal;
