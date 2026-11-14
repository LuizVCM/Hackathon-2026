import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import auth from './auth'
import consultas from './consultas'
import filas from './filas'
import ofertas from './ofertas'
import lembretes from './lembretes'
const router = Router()
router.use(auth)
router.use(authMiddleware)
router.use(consultas)
router.use(filas)
router.use(ofertas)
router.use(lembretes)
export default router
