#DevTinder Api
   authRouter
 -Post /singup
 -Post /login
 -post / logout


  profileRouter
 Get/profile/view
 patch/profile/edit
 patch/profile/password

connectionRouter
 post /request/sendintereted/:userId
 post /request/send/igonered/:userId
 post /requets/review/accepted/:required
 post /requet/review/reject/:required

userRouter
 post /request/review/accepted/:requestId
 post /request/review/accepted/:requestId

  
 get /connection
 get /request/received
 get/feed -get you the profile of 
other users on platform

Status : ignore , interested , accept , rejected
