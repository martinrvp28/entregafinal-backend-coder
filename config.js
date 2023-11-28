import "dotenv/config"

export default {
    PORT:process.env.PORT,
    MONGO_ATLAS_URL:process.env.MONGO_ATLAS_URL,
    SECRET_KEY_JWT :process.env.SECRET_KEY_JWT,
    NODE_ENV :process.env.NODE_ENV,
    EMAIL_ENV:process.env.EMAIL_ENV,
    EPASSWORD:process.env.EPASSWORD
}