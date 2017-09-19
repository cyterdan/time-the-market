npm run build && aws s3 --profile=cytermann sync build/ s3://time-the-market --acl public-read
