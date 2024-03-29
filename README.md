# Budget Plan OSE

Open source edition (OSE) of [Budget Plan][2], a personal budgeting application. Please visit [BudgetPlan.io][2] for more information.

[2]: https://budgetplan.io

## Standard Operating Procedures

### Environment variables

- Create `develop.env` and `production.env` in the project root to store environment variables for local development and production deployments respectively.
- Symlink `.env` to either `develop.env` or `production.env` as appropriate, and then symlink `webapp/.env` to `.env`.

### DevOps stuff

- Use the `.env` files as described above to control the target of these scripts.
- To back up the database, run `task scripts:backup`.
- To restore the database, run `task scripts:restore`. **Important:** Before running this script, make sure that the database structure exists (e.g., run `task flyway:migrate`)
- To clone the production database to a local development server, run `task scripts:clone`.

## Rules of Operation

High level logic that is not otherwise expressed or captured in the schema.

- Templates are immutable in the database, even the name and description.
- Categories are mutable.
  - In the future, we may want to make categories immutable, so that things like historical records and reports show the information at that time, rather than, e.g., the current name of the category with the balance from May of last year.
  - If we get to this point, it's a strong signal that it might be time to consider switching to event sourcing.
- In the hierarchy (tree) of categories, only leaf nodes can have transactions.
  - A non-leaf node must have at least two children. (This is a corollary of the parent rule. If there's only one child, then all of the parent's transaction go in the child, and the parent and child are taxonomically identical.)
  - We'll store the current balance for the category directly in the category table.
  - The balance for a parent category is the sum of all the children's balances. We'll calculate this when we build the category tree.

## Design decisions

- `SinglePayment` and `SplitPayment` are separate components because they have some slightly different logic. They are composed from the same building blocks -- form fields and buttons.
- You can enter a transaction either on the transaction form or on the deposit screen.
  - The transaction form is for single-category credits, like a refund or reimbursement.
  - The deposit screen is for depositing paychecks and other forms of income, where there are amounts that go into a lot of categories.
- Transaction dates are sent from the client to the API in YYYY-MM-DD form, because we're only concerned with the date when the transaction happens (not the exact timestamp). These are stored in the database in a simple `Date` field (as opposed to a full PostgreSQL `datetime` field). I haven't done extensive testing with this, but I think it works as intended (i.e. conversion to a JS `Date` object (i.e. timestamp) within the backend logic doesn't change the date).
  - Given just a date in YYYY-MM-DD form, the server _should_ interpret that in its current timezone.
  - When that is saved to the database, it should just take the date part.
  - I think there might be a problem if the Node.js server and the database cluster are in different timezones, but let's not find out.
- The logic for credit card charges and payments is explained in [ADR 1][3].
- I'm using Mantine's form library. One consequence of this decision is that form state stores dollar amounts (not cents), so we always have to convert from dollars to cents when we're done with a form (e.g. when submitting the form and sending the data to the API). It's just one of those things, not really any way around it.
- I tried using `@tanstack/react-table`, but I didn't like it
  - The documentation is mostly examples, which is fine for the easy stuff, but examples and guides are better for more complicated stuff.
  - A lot of the bells and whistles (e.g. expanding rows, pagination) were difficult to use or overkill (I'm paginating and filtering and stuff on the server)

## Notes

- I'm starting this project by importing stuff from my [Docker Compose Template][1].
- I'm storing secrets in 1Password.
- I'm punting drag-and-drop reordering of categories from milestone 2 because it seems like a really big lift without a really big payoff
  - I can get by with manually reordering items in the database for now
  - I think DnD (not my usual kind of DnD but nice) will require a complete rebuild of the category table as a list (which I want to do but not right now)
  - The libraries I'm planning ot use are [react-beautiful-dnd][4] and [@atlaskit/tree][5] (which builds on top of rbd).
- I'm recreating a table layout with `div`s for the transaction table, which is maybe not taking full advantage of the flexibility and power of `div`s. However, this approach is more straightforward, which will help to avoid costly rework. I can always switch to a more flexible layout later, but right now, I'm optimizing for velocity.
- I'm (re)building the transaction table inline editor using a standard form. This isn't as slick as using `contenteditable`, but it's faster. I can always upgrade to a `contenteditable` solution later if I think it will make my life easier.

[1]: https://github.com/alexgs/simple-docker-compose-project/
[2]: https://developer.1password.com/docs/cli/secrets-environment-variables/#:~:text=You%20can%20check%20environment%20files%20into%20source%20control%20and%20use%20the%20same%20environment%20everywhere.
[3]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187
[4]: https://github.com/atlassian/react-beautiful-dnd
[5]: https://atlaskit.atlassian.com/packages/confluence/tree
