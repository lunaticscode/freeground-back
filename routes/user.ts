import { Router, Request, Response } from 'express'; 
import { check, validationResult } from 'express-validator/check';
import { UserProps } from '../model/User';
import HttpStatusCodes from 'http-status-codes';
import API_PATH from './api_path';
import bcrypt from 'bcrypt';

const router:Router = Router();

router.post(API_PATH.USERS.VERIFY_EMAIL, 
    [
        check("email", "Please include a valid email").isEmail()
    ],
    async (req:Request, res:Response) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(HttpStatusCodes.BAD_REQUEST).json({result: false, errors: errors.array()});
        }
    
        const email:string = req.body.email;
        const dupleCheckResult = await checkDuple('email', email);     
        if( !dupleCheckResult ){
            return res.json({ result: dupleCheckResult })
        }
        res.json({result: true})
    }
)

router.post(API_PATH.USERS.CHECK_USERNAME, 
    [
        check("username", "Please enter a password with 6 or more characters").isLength({min: 6})
    ],
    async(req:Request, res:Response) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(HttpStatusCodes.BAD_REQUEST).json({result: false, errors: errors.array()})
        }

        const username = req.body.username;
        const dupleCheckResult = await checkDuple('username', username);
        if( !dupleCheckResult ){
            return res.json({result: dupleCheckResult});
        }
        res.json({result: true})
         
    }
)
router.post(API_PATH.USERS.JOIN, 
    [
        check("username", "Please enter a password with 6 or more characters").isLength({min: 6}),
        check("email", "Please include a valid email").isEmail(),
    ]
    ,
    async (req:Request, res:Response) => {

        const errors = validationResult(req);
        if( !errors.isEmpty() ){
            return res.status(HttpStatusCodes.BAD_REQUEST).json({result:false, errors: errors.array()});
        }

        const data:UserProps = req.body.data;
        const username = data.username;
        const email = data.email;
        const checkPromiseResult = await Promise.all([ checkDuple('username', username), checkDuple('email', email) ]);
        if( checkPromiseResult.some( res => !res ) ){
            return res.json({ result: false, msg: '(!) duplicate username or email' });
        }

        const password = data.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(__filename, 'router /join ::: hashedPassword => ', hashedPassword);

        /**
         * 
         * TODO ::: Create User Document.
         * 
         */
        
        res.json({result: true});
    }
)

const checkDuple = async (type: string, data: string) => {
    console.log(__filename, 'checkDuple() ::: type, data => ', type, data);
    switch( type ){
        case "email":
            /**
             * TODO ::: Read User Document (index: email) 
             */
            return true;
        case "username":
            /**
             * TODO ::: Read User Document (index: username) 
             */
            return true; 
        default:
            return false;
    }
}
export default router;