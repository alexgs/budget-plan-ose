import useSWR from 'swr';

import { getAllCategoryLabels } from '../client-lib';
import { AddCategory, Page } from '../components';

function Budget() {
  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  if (!catData) {
    return <div>Loading...</div>;
  }

  const labels = getAllCategoryLabels(catData);
  console.log(labels);

  return (
    <Page>
      <h1>Budget Plan</h1>
      <p>This is a secured page</p>
      <AddCategory />
    </Page>
  );
}

export default Budget;
