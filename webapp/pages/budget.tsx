import styled from '@emotion/styled';

import { AddCategoryButton } from '../components';
import { contentWidth, space } from '../components/tokens';

const BudgetContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

function Budget() {
  return (
    <BudgetContainer>
      <h1>Budget Plan</h1>
      <p>This is a secured page</p>
      <AddCategoryButton />
    </BudgetContainer>
  );
}

export default Budget;
