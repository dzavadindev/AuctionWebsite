# Important notes

1. For an artist, a term _"author"_ is being used everywhere, and I'm not sure of how logically correct that is.
   And I don't
   want to rename every instance of it in the whole project.
   In any way, it doesn't hurt the clarity.
2. Styling of the pages had seen better days.
   I was told to not bother with `@medea` queries, but it's worth mentioning that
   pages don't always act as intended (such as weird stretches and cut-offs on scaling up and down).
3. I have used a npm package called `date-fns` to deal with time, because I don't like JS default Date object.
   Mainly only
   parse() and format() are used.
4. Backend has a utility folder with a `file-io.js` util "lib."
   I basically use a Promise in here as a sort of monad,
   wrapping the value into the Promise, and call either resolve of reject just the way it works with HTTP requests,
   now its just "JSON requests")
5. The user stories mention quote "It should not be possible to remove or edit bids once they are made" and the
   functional design "As a user I want to be able to remove my bid, so I can correct any mistakes."
   I made an endpoint
   for deleting bids, abd its only possible to delete the last bit that has been made by anyone.
   So if you have bid 500
   and the next minute somebody else bids 510, you can't delete your bid.
   Not that it matters, since you're not the
   highest bidder anymore, and basically have no relation to the product unless you bid again.
6. All the filtering and searching are done on the Backend to simplify the process.
7. The correct order of testing the endpoints is `auth.http, users-post.http, products-post.http, bids-post.http,
   products-put.http, users-put.http, get.http, delete-bad-weather.http, delete-good-weather.http.`
   The reason for this, the tests basically create temporary entities to test on (product, user and bid) and delete them
   in the end. The tests
   still struggle with a problem, where some data may or may not exist for testing (refer to bullet point `9.`).
   This means that tests are dependent on each other, however,
   the other side of the coin is always having some testing values in the .json files.
   Out of two bads, I chose the lesser one. If creation of any resource fails, other tests fail,
   but you know that you first need to look at the creators (POST), and then if a creator test passes and others don't -
   the
   issue is not the creator. **NOTE**: I think the best solution would be to create a separate testing json
   and make a server that listens on a different port. This will create a controlled environment isolated from prod (
   main).
   I do not have time to implement this idea, but I think mentioning that that would have been much better
   implementation that I could have handled is worth it.
8. The tests only worked for me if I run them one by one (not the "all in file" option, but pressing start on the left
   side of the editor for every test individually).
   I am not sure if it is the issue of my machine, or of my code.
   If you
   encounter issues when running tests "all in file," consider checking several tests individually from different files.
   I have tried to fix it by dividing tests in smaller files,
   and making them less inter-dependent in a sense that there are
   no two tests that require a result of another in the same file (they might need a result - `client.global.set` - from
   another .http)
   **UPDATE**: I think I figured out the issue.
   When tests try to connect to the server, it must not be accepting connections.
   As tests are opening connections faster than the server can handle, it might refuse new connections.
   I have not figured out the fix for that.
9. I'm not fully grasping the concept of testing backend endpoints.
   A running server is really dynamic, and the tests need to
   pass not depending on the current state of the json.
   If that's not the case, then the system is not always ready for
   testing, and requires preconditions, which can render detrimental (making the products.json be one singular product,
   thus deleting all other current entries, using the first product in the products.json, which means some currently
   active auction will be sabotaged by tests altering it or after running the same set of tests in a row the dummy data
   gets left in the products.json, thus you need to delete it yourself every time before testing or include deletion in
   every POST test).
   To get an example of what I mean, visit `delete-good-weather.http`.
10. The tests don't cover **all** the possible error codes and scenarios.
    I have little time to create the rest of the missing tests, but the specification mentions all possible outcomes
    and those are handeled in code 