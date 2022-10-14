import { signIn, signOut, useSession } from 'next-auth/react';
import { Page } from '../components';

function HomePage() {
  const { data: session } = useSession();
  const content = session ? (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    ) : (<><button onClick={() => signIn()}>Sign in</button></>);

  return (
    <Page>
      <h1>Budget Plan</h1>
      {content}
    </Page>
  );
}
HomePage.isPublic = true;

export default HomePage;
