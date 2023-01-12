# Database

In this directory, we implement the "repository" pattern for database access.

## Notes

- I'm trying to have some (simple) rules for which modules can use which types.
  - The "API" and "service" modules should only use the types from the `ApiSchema`
  - This module should only use the types from the `DbSchema` namespace
- But it gets tricky in `save-payment` because it uses a database transaction to encapsulate some (database storage) logic
  - So as a result, it uses the `ApiScehma` namespace for its arguments
  - This makes sense, logically, but it's not as clean
- Time will tell how this pattern evolves, but I wanted to note the inconsistency for my future self.

## References

- "Patterns of Enterprise Application Architecture: [Repository Pattern][1]." MartinFowler.com
- ".NET Microservices: [Design the infrastructure persistence layer][2]." Microsoft.com


[1]: https://martinfowler.com/eaaCatalog/repository.html
[2]: https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design
