/*
 * Copyright 2022 Phillip Gates-Shannon. All rights reserved. Licensed under the Open Software License version 3.0.
 */

import { signIn, signOut, useSession } from 'next-auth/react';
import { Page } from '../components';

function HomePage() {
  // TODO Tighten security so I'm the only one who can access this app
  const { data: session } = useSession();
  const content = session ? (
    <>
      Signed in as {session.user?.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );

  return (
    <Page>
      {content}
    </Page>
  );
}
HomePage.isPublic = true;

export default HomePage;
