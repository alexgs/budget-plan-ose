import { Alert, Loader } from '@mantine/core';
import useSWR from 'swr';

import { getCategoryList } from '../client-lib';
import { AddCategory, Page } from '../components';

function Budget() {
  // Get sorted categories and values
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

  const categoryValues = getCategoryList(catData);

  // TODO Display values in a nice table
  // TODO Add copyright statements to files
  console.log(categoryValues);

  return (
    <Page>
      <h1>Budget Plan</h1>
      <p>This is a secured page</p>
      <AddCategory />
    </Page>
  );
}

export default Budget;
