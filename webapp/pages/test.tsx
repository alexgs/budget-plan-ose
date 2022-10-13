import styled from '@emotion/styled';
import { Session } from 'next-auth';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { contentWidth, space } from '../components/tokens';

const TestPageContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

interface Props {}

function TestPage(props: Props) {
  const session = useSession();
  console.log(session);
  return (
    <TestPageContainer>
      <h1>Budget Plan</h1>
      <div>This is a secured page</div>
    </TestPageContainer>
  );
}

TestPage.auth = true;

export default TestPage;
