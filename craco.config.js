const path = require('path')
module.exports = {
    // webpack配置
    webpack:{
        //配置别名
        alias:{
            //用 @表示 src文件所以路径
            '@':path.resolve(__dirname,'src')
        }
    }
}