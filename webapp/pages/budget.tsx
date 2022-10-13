import styled from '@emotion/styled';
import { useState } from 'react';
import { Button, Modal } from '@mantine/core';

import { contentWidth, space } from '../components/tokens';

const BudgetContainer = styled.div({
  margin: `${space.medium} auto`,
  maxWidth: contentWidth.small,
  textAlign: 'center',
});

function Budget() {
  const [isVisible, setIsVisible] = useState(false);

  function handleAddCategoryClick(): void {
    setIsVisible(true);
  }

  return (
    <BudgetContainer>
      <h1>Budget Plan</h1>
      <p>This is a secured page</p>
      <div>
        <Button variant="outline" onClick={handleAddCategoryClick}>Add Category</Button>
      </div>
      <Modal
        onClose={() => setIsVisible(false)}
        opened={isVisible}
        overlayBlur={3}
        title="Introduce yourself!"
      >
        Hello modal!
      </Modal>
    </BudgetContainer>
  );
}

export default Budget;
