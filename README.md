# Web Socket-Slack

## Pre-installation
- nodejs
- aws
  - aws `IAM`
  - aws `kinesis`
- config
  - `config.js` - using `config.js.template`
    - `slack`
      - `RTM_CONN_URL` : use [legacy-tokens](https://api.slack.com/custom-integrations/legacy-tokens)
    - `kinesis`
      - `enable`
      - `region`
      - `streamName`

## Setup
- both (server/ client)
```
$ npm install
$ node index.js
```

- only server(for browser testing)
```
$ node index.js --mode=server
```

- only websocket server(for server testing)
```
$ node index.js --mode=websocket
```

## Reference
- [AWS Kinesis - docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Kinesis.html) 
- Github
  - [awslabs/amazon-kinesis-client-nodejs](https://github.com/awslabs/amazon-kinesis-client-nodejs)