import styled from '@emotion/styled';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { contentWidth, space } from '../../components/tokens';

const HomePageContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

interface Props {
  providers: ReturnType<typeof getProviders>;
}

function Login(props: Props) {
  const router = useRouter();
  const session = useSession();
  if (session.data) {
    // TODO This logs an error in the console `Error: Abort fetching component
    //   for route: "/budget"` and I can't figure out why. :-/
    void router.push('/budget');
  }

  const { providers } = props;
  return (
    <HomePageContainer>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </HomePageContainer>
  )
}
Login.isPublic = true;

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default Login;
