import { Router } from "express";
import { __dirname } from "../utils.js";
import config from "../../config.js";
import { logger } from "../utils/logger.js";

const router = Router();

router.get('/loggerTest', (req, res) => {

    const levelsToTest = config.NODE_ENV === 'production' ? ['info', 'warning', 'error', 'fatal'] : ['debug', 'http', 'info', 'warning', 'error', 'fatal'];

levelsToTest.forEach((level) => {
    logger.log(level, 'Logger funcionando correctamente.');
});

res.json({ message: 'Registro de prueba ejecutado' });
});


export default router;