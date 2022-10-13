import { FC } from 'react';

interface Props {
  isVisible: boolean;
}

export const Dialog: FC<Props> = (props) => {
  if (!props.isVisible) {
    return null;
  }

  return <div>Hello dialog</div>;
};
