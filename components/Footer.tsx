import { logoutAccount } from '@/lib/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface FooterUser {
  nome_completo: string;
  email: string;
}
// Em Footer.tsx
interface FooterProps {
  user: { 
    nome_completo: string;
    email: string;
  } | null;
  type: 'mobile' | 'desktop';
}

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const loggedOut = await logoutAccount();
      if (loggedOut) {
        router.push('/sign-in');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  if (!user) return null;

  return (
    <footer className="footer">
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user.nome_completo.charAt(0).toUpperCase()}
        </p>
      </div>

      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className="text-14 truncate text-gray-700 font-semibold">
            {user?.nome_completo}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600">
            {user?.email}
          </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  )
}

export default Footer