// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

import "dotenv/config"
//开发环境配置
export const devConfig = {
    db: {
        host:process.env.MONGODB_URL,
        port:process.env.MONGODB_PORT,
        database:process.env.MONGODB_DATEBASE,
    },
    superAdmin:{
        username:process.env.SUPER_ADMIN_USERNAME as string,
        password:process.env.SUPER_ADMIN_PASSWORD as string,
    },
    auth:{
        adminSecretKey:process.env.ADMIN_JWT_KEY as string,
        indexSecretKey:process.env.INDEX_JWT_KEY as string
    }
}
//测试环境
export const testConfig = {


}
//生产环境
export const productConfig = {


}

const config = devConfig

export default config