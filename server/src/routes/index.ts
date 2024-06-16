import { Request, Response, Router } from 'express';
import jetValidator from 'jet-validator';

// **** Variables **** //
const indexRouter = Router(),
	validate = jetValidator();

// Get all users
indexRouter.get('/', function (req: Request, res: Response) {
	res.json({ status: '1', message: 'Server Active' });
});

// Add one user
// userRouter.post(
//   Paths.Users.Add,
//   validate(['user', User.isUser]),
//   UserRoutes.add,
// );

// **** Export default **** //
export default indexRouter;
