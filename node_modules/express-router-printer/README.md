express-router-printer
============

small node static server


## Install

```
npm install express-router-printer
```

## Usage
```javascript

var server = require('express')();

var options = {
    // table header
    header: ['API PATH', 'API METHOD'],

    // show statistics at the end of table
    showStatistics: true,

    // auto print the table, if false, module will return the table object
    autoPrint: true,

    // other routeres
    othersRouters: []
};

require('express-router-printer')(server, options);


```
