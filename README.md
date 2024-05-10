# Dev
Steps to start dev app

1. Start db
```
docker compose up -d

```

2. Create a copy of .env.template and rename .env
3. Replace env variables
4. Run command ``` npm install ```
5. Run command ``` npm run dev ```
6. Run prisma command 
``` 
npx prisma migrate dev
npx prisma generate

```

7. Call SEED endpoint [create data in the local DB](http://localhost:3000/api/seed)

## Note: Default user

__user:__ test1@google.com
__password__ 123456

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate

```