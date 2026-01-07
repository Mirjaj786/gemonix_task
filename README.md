1. http://localhost:4000/auth  -> this verify the authntication 

test -> pehele Login then copy the token -> send this toke to the header -> key:Authorization , value:gemonix token.......

2. http://localhost:4000/auth/signup  -> register new User using name, email,password  with imput validation using Zod
   take data form req.body -> then test
   jyse ki
3. http://localhost:4000/auth/login  -> login using email, and passoerd , thne genarate a otp uske bad store it on DB

4. http://localhost:4000/auth/logout  -> to test same with verify . matlab pehele login copy the token then send to header same to vefiy auth
5. http://localhost:4000/auth/forget-password  -> send the email to req.body  then the opt reset otp will receved 


Now mujhe thora help chaiye means thora guidance chaiye -> 
