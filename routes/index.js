var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            title: "Om mig",
            about: "Hej, jag heter Fredrik och är 29 år. Jag är född och uppvuxen i Hässleholm i Skåne, men flyttade för sex år sedan till Umeå. Jag bor för tillfället i Holmsund utanför Umeå med min sambo Malin."
        }
    };

    res.json(data);
});

module.exports = router;
