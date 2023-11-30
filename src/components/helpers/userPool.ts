import { CognitoUserPool } from 'amazon-cognito-identity-js';

//FIXME: add values to environment variable
const poolData = {
    UserPoolId: "us-west-2_RTX1ADryP",
    ClientId: "50n6ssgasj9phtam85l8gjva41"
}

export default new CognitoUserPool(poolData);