import styled from '@emotion/styled';
import { signIn, signOut, useSession } from 'next-auth/react';
import { contentWidth, space } from '../components/tokens';

const HomePageContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

function HomePage() {
  const { data: session } = useSession();
  const content = session ? (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    ) : (<><button onClick={() => signIn()}>Sign in</button></>);

  return (
    <HomePageContainer>
      <h1>Budget Plan</h1>
      {content}
    </HomePageContainer>
  );
}
HomePage.isPublic = true;

export default HomePage;
