Create file:

package.json



Run command:

npm init



Install packages:

npm install express cors morgan --save



Install nodemon:

npm install -g nodemon



Install sqlite3:

npm install sqlite3 --save



Reading from sql-file:

cd db
sqlite3 <sqlite filename>

sqlite> .read <sql filename>
sqlite> .exit



Install windows build tools:

npm install --global --production windows-build-tools



Install JWT:

npm install jsonwebtoken --save



Set JWT-secret:

export JWT_SECRET='<your string>'
