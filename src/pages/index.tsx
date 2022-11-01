import Image from 'next/image'
import appPreviewImage from '../assets/mobile-preview.png'
import appLogo from '../assets/logo.svg'
import appAvatarPreview from '../assets/avatars.png'
import appIconCheck from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'


interface HomeProps {
  poolCount: number,
  guessCount: number,
  usersCount: number,
}
 
export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault()

    try {
      const response = await api.post('pools',{
        title: poolTitle
      })
      const { code } = response.data
      await navigator.clipboard.writeText(code)

      alert("Bolão criado com sucesso, o código foi copiado para a area de transferencia")
      setPoolTitle('')
    } catch (error) {
      alert('Falha ao criar o Bolão, tente novamente')
      console.log(error)
    }
  }

  return (
    <div className='max-w-[1124px] mx-auto grid grid-cols-2 gap-28 items-center h-screen'>
      <main>
        <Image src={appLogo} alt="NLW Copa"/>
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
        <div className='mt-10 flex items-center gap-2'>
          <Image src={appAvatarPreview} alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form  onSubmit={createPool} className='mt-10 flex  gap-2'>
          <input value={poolTitle} onChange={(e)=>setPoolTitle(e.target.value)} className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' type="text" required placeholder='Qual nome do seu bolão?' />
          <button className='bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-700' type="submit">Criar meu Bolão</button>
        </form>
        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={appIconCheck} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'></div>

          <div className='flex items-center gap-6'>
            <Image src={appIconCheck} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>
      <Image src={appPreviewImage} alt="Dois celulares exibindo prévia da aplicação movél do NLW Copa" quality={100} />
    </div>
  )
}


/*export const getServerSideProps = async () =>{

  const [poolCountResponse,guessCountResponse,usersCountResponse ] = await Promise.all([
    api.get('pools/count'),
    api.get('guess/count'),
    api.get('users/count')
  ])

  return {
    props:{
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    }
  }
}*/

export async function getStaticProps() {
  const [poolCountResponse,guessCountResponse,usersCountResponse ] = await Promise.all([
    api.get('pools/count'),
    api.get('guess/count'),
    api.get('users/count')
  ])

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props:{
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    }
  }
}