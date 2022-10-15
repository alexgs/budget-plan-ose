import { useSession } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';

export const NextAuthProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

