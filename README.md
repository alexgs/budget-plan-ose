# Budget Plan

## Standard Operating Procedures

### Environment variables

- Create `develop.env` and `production.env` in the project root to store environment variables for local development and production deployments respectively.
- Symlink `.env` to either `develop.env` or `production.env` as appropriate, and then symlink `webapp/.env` to `.env`.

### DevOps stuff

- Use the `.env` files as described above to control the target of these scripts.
- To back up the database, run `task scripts:backup`.
- To restore the database, run `task scripts:restore`.
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

## Notes

- I'm starting this project by importing stuff from my [Docker Compose Template][1].
- ~~This project is using 1Password for secrets management, so we're [committing][2] our `.env` files! :exploding-head:~~
- ~~Local, per-developer, or per-machine environment variables (like `DATABASE_HOST_DIRECTORY`) are set in `.env`, which is excluded from Git. This allows us to pull common configuration from 1Password while still having custom local variables as needed. (Consider that `DATABASE_HOST_DIRECTORY` is probably not something we'll need in production.)~~
- ~~I set an alias `alias opt="op run --env-file=\"./$(echo $ENVIRONMENT).env\" -- task"` in my shell profile, to save myself typing. I also did `export ENVIRONMENT=develop` so conceivably we could do something similar in CI/CD pipeline, if it ever comes to that.~~
- ~~The `psql` command and associated tasks (like `task db:psql`) don't seem to be working correctly with 1Password, so I have to manually substitute the environment variables.~~
- Actually, it seems like 1Password doesn't work well with interactive tools, like `psql` but also like `task flyway`. I guess it's back to the old way for me. _C'est la vie_. I'll still be storing secrets in 1Password.
- I'm punting drag-and-drop reordering of categories from milestone 2 because it seems like a really big lift without a really big payoff
  - I can get by with manually reordering items in the database for now
  - I think DnD (not my usual kind of DnD but nice) will require a complete rebuild of the category table as a list (which I want to do but not right now)
  - The libraries I'm planning ot use are [react-beautiful-dnd][4] and [@atlaskit/tree][5] (which builds on top of rbd).

[1]: https://github.com/alexgs/simple-docker-compose-project/
[2]: https://developer.1password.com/docs/cli/secrets-environment-variables/#:~:text=You%20can%20check%20environment%20files%20into%20source%20control%20and%20use%20the%20same%20environment%20everywhere.
[3]: https://app.clickup.com/8582989/v/dc/85xud-4647/85xud-187
[4]: https://github.com/atlassian/react-beautiful-dnd
[5]: https://atlaskit.atlassian.com/packages/confluence/tree
