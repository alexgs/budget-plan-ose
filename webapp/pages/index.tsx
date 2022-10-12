import styled from '@emotion/styled';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { contentWidth, space } from '../components/tokens';

const HomePageContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

interface Props {
  providers: ReturnType<typeof getProviders>;
}

function HomePage(props: Props) {
  const { providers } = props;
  const { data: session } = useSession();
  const content = session ? (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    ) : Object.values(providers).map((provider) => (
    <div key={provider.name}>
      <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
    </div>
  ));

  return (
    <HomePageContainer>
      <h1>Budget Plan</h1>
      {content}
    </HomePageContainer>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default HomePage;
