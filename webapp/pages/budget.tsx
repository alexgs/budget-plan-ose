import { getAllCategoryLabels } from '../client-lib';
import { AddCategory, Page } from '../components';

function Budget() {
  const catData = JSON.parse(
    '[{"id":"1f0bb659-659d-462e-8249-1c403304fa80","name":"House","parentId":null,"slug":"house","createdAt":"2022-10-14T11:39:19.506Z","updatedAt":"2022-10-14T11:39:19.506Z"},{"id":"93645e5c-e49c-4b20-a8fa-043a69998d08","name":"Groceries","parentId":null,"slug":"groceries","createdAt":"2022-10-14T11:40:24.719Z","updatedAt":"2022-10-14T11:40:24.719Z"},{"id":"579912cd-a26d-41b5-8cdb-17addc41dc52","name":"Mortgage","parentId":"1f0bb659-659d-462e-8249-1c403304fa80","slug":"mortgage","createdAt":"2022-10-14T11:39:47.322Z","updatedAt":"2022-10-14T11:40:31.369Z"}]'
  );
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
