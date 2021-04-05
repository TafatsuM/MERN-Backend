const { authJwt, verifySignUp } = require("../middlewares");

const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

let router = require("express").Router();

router.get("/all", userController.allAccess);
router.get("/user", authJwt.verifyToken, userController.userBoard);
router.get("/mod", [authJwt.verifyToken, authJwt.isModerator], userController.moderatorBoard);
router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], userController.adminBoard);
router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup);
router.post("/signin", authController.signin);



module.exports = router;