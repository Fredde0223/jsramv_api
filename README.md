[![Build Status](https://travis-ci.org/Fredde0223/jsramv_api.svg?branch=master)](https://travis-ci.org/github/Fredde0223/jsramv_api)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Fredde0223/jsramv_api/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Fredde0223/jsramv_api/?branch=master)

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
