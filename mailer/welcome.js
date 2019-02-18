const welcome = (req, res) => `
      <div style="background:#eae1e5;width:100%;padding:20px 0;">
         <div style="max-width:680px;margin:0 auto;background:#ffffff">
         <div style="background:#3d2c32;padding:10px;color:#ffffff;text-align:center;font-size:34px">
         NIVELO
         </div>
         <div style="padding:20px;text-align:left;">
         Hi, ${req.body.name}.<br>
         Welcome to the Nivelo Programmers Community. We’re excited to have you join us!<br><br>
      
      To help you get started you can read our docs, for details on Nivelo.me site, join in the discussion on our forum, and checkout our open-source work on our github.<br><br>
      
      We also built nivelo.io, which helps companies hire developers faster and more efficiently. If you are hiring engineers Nivelo will help you identify great talent. You can also learn more about improving your hiring process on our blog.<br><br><br>
         <a href="http://nivelo.me" style="margin:35px 0;padding:15px 35px;background:#3d2c32;color:#ffffff;clear:both;border-radius:30px;text-decoration:none">Get started</a>
         <br><br><br> 
      Best,<br> 
      <b>The Niverlo Team</b>
         </div>
      </div>
         <div style="padding:35px 10px;text-align:center;">
         Copyright, 2018<br>
            Nivelo.io Team
         </div>
      </div>  
`
export default welcome;