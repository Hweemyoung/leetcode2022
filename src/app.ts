import * as Util from "./util.js";
const a = {
    b: 2,
};

Util.assertEqual(true, false);
Util.assertEqual(a, Object.assign({}, a));
