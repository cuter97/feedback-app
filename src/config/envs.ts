import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    STATE: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),

    STATE: joi.string().required(),

    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
})
    .unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
});

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    state: envVars.STATE,
    db: {
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        user: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        name: envVars.DB_NAME
    }
}