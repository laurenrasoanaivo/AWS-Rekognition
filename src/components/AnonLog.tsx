
import AWS, { Credentials } from 'aws-sdk';

export default function AnonLog() {
    
  AWS.config.region = process.env.REACT_APP_REGION; 
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_POOL_ID as string,
  });
  (AWS.config.credentials as Credentials).get(() => {
    const accessKeyId = AWS.config.credentials?.accessKeyId;
    const secretAccessKey = AWS.config.credentials?.secretAccessKey;
    const sessionToken = AWS.config.credentials?.sessionToken;
  });
}
