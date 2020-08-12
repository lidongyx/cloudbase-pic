const cloud = require("@cloudbase/node-sdk");
const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
});
const db = app.database();

// 返回 Hello World
exports.main = async (event, context) => {
    // todo
    // your code here
    return {
        event,
    };
}
