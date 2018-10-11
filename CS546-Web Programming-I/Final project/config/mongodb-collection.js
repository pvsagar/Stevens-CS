const dbConnection = require("./mongodb-connection");

const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* listing collections here: */
module.exports = {
    credentials: getCollectionFn("credentials"),
    companies: getCollectionFn("companies"),
    history: getCollectionFn("history"),
    workspaces: getCollectionFn("workspaces"),
    workspaceReviews: getCollectionFn("workspaceReviews"),
    users: getCollectionFn("users")
};