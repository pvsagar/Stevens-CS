# Free-Lancer

#Project Setup
1. To set the project, first need to install it using
npm install
2. After it is installed, we can run the code using
npm start
Import Database files

# Collection Information
We have six datasets files which are imported from the mongoDB. The six collections are
1. companies
2. credentials
3. history
4. users
5. workspaceReviews
6. workspaces

# Data Import Command 
The collections are imported using
mongoimport -- db &lt;DBNAME&gt; -- collection &lt;COLLECTION&gt; -- file &lt;FILEPATH&gt;
Example:
mongoimport -- db db-free- lancer -- collection workspaces -- file
C:/Users/sagar/Documents/OneDriveData/Stevens-Sem2/CS546/Project/Free-
Lancer/datasets/workspaces.json
