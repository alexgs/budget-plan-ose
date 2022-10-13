import { Button, Modal } from '@mantine/core';
import { FC, useState } from 'react';

export const AddCategoryButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick(): void {
    setIsVisible(true);
  }

  return (
    <>
      <Modal onClose={() => setIsVisible(false)} opened={isVisible} overlayBlur={3} title="Introduce yourself!">
        Hello modal!
      </Modal>
      <div>
        <Button variant="outline" onClick={handleClick}>
          Add Category
        </Button>
      </div>
    </>
  );
};
