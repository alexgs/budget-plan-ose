# Budget Plan

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

## Notes

- I'm starting this project by importing stuff from my [Docker Compose Template][1].
- ~~This project is using 1Password for secrets management, so we're [committing][2] our `.env` files! :exploding-head:~~
- ~~Local, per-developer, or per-machine environment variables (like `DATABASE_HOST_DIRECTORY`) are set in `.env`, which is excluded from Git. This allows us to pull common configuration from 1Password while still having custom local variables as needed. (Consider that `DATABASE_HOST_DIRECTORY` is probably not something we'll need in production.)~~
- ~~I set an alias `alias opt="op run --env-file=\"./$(echo $ENVIRONMENT).env\" -- task"` in my shell profile, to save myself typing. I also did `export ENVIRONMENT=develop` so conceivably we could do something similar in CI/CD pipeline, if it ever comes to that.~~
- ~~The `psql` command and associated tasks (like `task db:psql`) don't seem to be working correctly with 1Password, so I have to manually substitute the environment variables.~~
- Actually, it seems like 1Password doesn't work well with interactive tools, like `psql` but also like `task flyway`. I guess it's back to the old way for me. _C'est la vie_. I'll still be storing secrets in 1Password.
- Symlink the `.env` file in the `webapp` directory

[1]: https://github.com/alexgs/simple-docker-compose-project/
[2]: https://developer.1password.com/docs/cli/secrets-environment-variables/#:~:text=You%20can%20check%20environment%20files%20into%20source%20control%20and%20use%20the%20same%20environment%20everywhere.
