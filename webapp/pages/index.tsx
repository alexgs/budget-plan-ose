import styled from '@emotion/styled';
import { contentWidth, space } from '../components/tokens';

const HomePageContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
})

function HomePage() {
  return (
    <HomePageContainer>
      <h1>Budget Plan</h1>
    </HomePageContainer>
  );
}

export default HomePage;
