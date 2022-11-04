import { Router } from 'express';

const router = Router();

router.post('/SignIn', LoginController.perform);
router.post('/SignUp', RegisterController.perform);
// router.post('/', expressJwt({ secret: Locals.config().appSecret }), RefreshTokenController.perform);

export default router;
