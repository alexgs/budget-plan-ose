import { Alert, Loader } from '@mantine/core';
import useSWR from 'swr';

import { buildCategoryTree, parseCategoryTree } from '../client-lib';
import { categoryTreeNode } from '../client-lib/types';
import { AddCategory, Page } from '../components';

function Budget() {
  // Get sorted categories and balances
  const { error, data: catData } = useSWR('/api/categories');
  if (error) {
    console.error(error);
    return (
      <Alert title="Error!" color="red">
        A network error occurred. Please check the console logs for details.
      </Alert>
    );
  }

  if (!catData) {
    return <Loader variant="bars" />;
  }

  const catTree: categoryTreeNode[] = buildCategoryTree(catData);
  const topLevelBalances = parseCategoryTree(catTree, 0);

  // TODO Display values in a nice table
  // TODO Add copyright statements to files
  console.log(topLevelBalances);

  return (
    <Page>
      <h1>Budget Plan</h1>
      <p>This is a secured page</p>
      <AddCategory />
    </Page>
  );
}

export default Budget;
