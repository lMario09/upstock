import { LayoutGrid, Package, Truck, ChartColumnIncreasing, Bell, Settings, LogOut, Users } from 'lucide-react';
import { useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import MenuButton from '../ui/MenuButton.jsx';
import TextoBar from '../ui/TextoBar.jsx';

function BarraLateral() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAdmin } = useAuth();
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'dark' ? '/UpStock-branco.svg' : '/UpStock.svg';

  return (
    <section className='flex flex-col w-64 h-screen bg-(--bg-card-color) gap-4 justify-start items-start shrink-0 border-r border-(--border-color)'>
      <div className='flex flex-row items-center gap-2 px-4 py-4 border-b border-(--border-color) w-full'>
        <img src={logoSrc} alt="UpStock" className='w-10 h-10'/>
        <h1 className="text-2xl font-bold text-(--logo-text-color)">UpStock</h1>
      </div>
      <div className='flex flex-col gap-2 w-full px-4'>
        <TextoBar>Principal</TextoBar>
        <div className='flex flex-col gap-1'>
          <MenuButton icon={LayoutGrid} label="Visão geral" to="/" active={currentPath === '/'} />
          <MenuButton icon={Package} label="Produtos" to="/produtos" active={currentPath === '/produtos'} />
          <MenuButton icon={Truck} label="Movimentações" to="/movimentacoes" active={currentPath === '/movimentacoes'} />
          <MenuButton icon={ChartColumnIncreasing} label="Relatórios" to="/relatorios" active={currentPath === '/relatorios'} />
          <MenuButton icon={Bell} label="Notificações" to="/notificacoes" active={currentPath === '/notificacoes'} />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full px-4'>
        <TextoBar>Sistema</TextoBar>
        <div className='flex flex-col gap-1'>
          {/* Item exclusivo para administradores */}
          {isAdmin && (
            <MenuButton
              icon={Users}
              label="Usuários"
              to="/usuarios"
              active={currentPath === '/usuarios'}
            />
          )}
          <MenuButton icon={Settings} label="Configurações" to="/configuracoes" active={currentPath === '/configuracoes'} />
          <MenuButton icon={LogOut} label="Sair" to="/sair" active={currentPath === '/sair'} />
        </div>
      </div>
    </section>
  )
}

export default BarraLateral
