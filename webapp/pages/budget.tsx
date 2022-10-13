import styled from '@emotion/styled';
import { useState } from 'react';

import { contentWidth, space } from '../components/tokens';

const BudgetContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

function Budget() {
  const [showAddCatDialog, setShowAddCatDialog] = useState(false);

  function handleAddCategoryClick(): void {
    setShowAddCatDialog(true);
  }

  function renderAddCategoryDialog() {
    if (!showAddCatDialog) {
      return null;
    }
    return <div>Add new category</div>;
  }

  return (
    <BudgetContainer>
      <h1>Budget Plan</h1>
      <div>This is a secured page</div>
      {renderAddCategoryDialog()}
      <div>
        <button onClick={handleAddCategoryClick}>Add Category</button>
      </div>
    </BudgetContainer>
  );
}

export default Budget;
