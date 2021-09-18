export const handler = async (event: any = {}): Promise<any> => {
  const authToken: string = event.authorizationToken;
  console.log(`event.authorizationToken = ${authToken}`);
  if (authToken.startsWith('Bearer ')) {
    const token = authToken.substr(7);
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: token === 'allow' ? 'allow' : 'deny',
            Resource: event.methodArn,
          },
        ],
      },
    };
  }
  throw new Error('Unauthorized');
};
