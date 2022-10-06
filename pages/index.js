import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import bgTarif from '../public/bgtarif.png'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>BRI Tarif</title>
      </Head>
        <div className='bg-tarif'>
          <Image src={bgTarif} alt="bg" className='bg-tarif' />
          <Link href="/login">
            <a>
              <div className='click'>
              </div>              
            </a>
          </Link>
        </div>

    </div>
  )
}
