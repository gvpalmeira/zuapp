import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface RightSidebarProps {
  user: {
    nome_completo: string;
    email: string;
  };
}

interface User {
  nome_completo: string;
  email: string;
}

const RightSidebar = ({ user }: RightSidebarProps) => {
  //const categories: CategoryCount[] = countTransactionCategories(transactions);
  if (!user) return null;

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">{user.nome_completo[0]}</span>
          </div>

          <div className="profile-details">
            <h1 className='profile-name'>
              {user.nome_completo}
            </h1>
            <p className="profile-email">
              {user.email}
            </p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">Meus Bancos</h2> {/* translated from My Banks */}
          <Link href="/" className="flex gap-2">
            <Image 
               src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
            />
            <h2 className="text-14 font-semibold text-gray-600">
              Adicionar Banco {/* translated from Add Bank */}
            </h2>
          </Link>
        </div>
              
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top Categorias</h2> {/* translated from Top Categories */}

          <div className='space-y-5'>

          </div>
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar