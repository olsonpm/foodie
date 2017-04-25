### To get started
```
$ npm i
...
$ ./run task start-server
...
'foodie is listening on port 8090'
```

### Run my one measly test
`./run test '*'`


### Caveat
**tldr**: the tag filtering is a combination of unions and intersections
depending on how zomato calculates their filters.

 - The zomato api is strange in that it exposes three filters 'categories',
'cuisines', and 'establishments' which all seem to overlap a little.  For
instance 'Breakfast' exists both as a category and cuisine.  I didn't want to
spend too much time understanding why they structured their data so I exposed
all three under the single concept of a 'tag'.  From my quick tests at the end,
it seems that an establishment causes an intersection of the filters whereas
cuisines and categories will result in a union of the filters, but I didn't
spend the time to look into it.
