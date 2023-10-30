# Important notes

- For an artist, a term "author" is being used everywhere, and Im not sure of how logically correct that is. And I dont want to rename every instance of it in the whole project. In any way, it doesn't hurt the clarity.
- Styling of the Home.svelte page had seen better days. I was told to not bother with @medea queries, but its worth mentioning that the list of items doesn't always act as intended (such as weird stretches and cut-offs, I think those are insignificant though). 
- I have used a npm package called date-fns to deal with time, because I don't like JS default Date object. Mainly only parse() and format() are used.
- Backend has a utility folder with a file-io.js util "lib". I basically use a Promise in here as a sort of a monad, wrapping the value into the Promise, and calling either resolve of reject just the way it works with HTTP requests, now its just "JSON requests")
- The user stories mention quote "It should not be possible to remove or edit bids once they are made" and the functional design "As a user I want to be able to remove my bid, so I can correct any mistakes". So I dont know what Im supposed to do exactly in this scenario, so I made an endpoint for deleting bids, but its not accessible from the frontend - only with sending requests by hand. And its only possible to delete the last bit that has been done. so if you have bid 500 and the next minute somebody else bids 510 you can delete your bid. Not that it matters, since you're not the highest bidder anymore, and basically have no relation to the product unless you bid again.
- All the filtering and searching is done on the FrontEnd, so I don't really use query params for nothing.
- Tests assume that there at least one product in the json, and at the two specified clients (user and admin) are already in the json as well. Otherwise it difficult to ensure correctness
- 
- 
- 
- 
- 
- 
- 