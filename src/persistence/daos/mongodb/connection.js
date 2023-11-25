import mongoose from 'mongoose';
import config from '../../../../config.js';
import { logger } from '../../../utils/logger.js';

try {
    await mongoose.connect(config.MONGO_ATLAS_URL);
    logger.info('Conectado a la base de datos de MongoDb!');
} catch (error) {
    logger.fatal(error);
}