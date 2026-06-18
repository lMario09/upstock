import { Outlet } from 'react-router';
import BarraLateral from './BarraLateral.jsx';
import TopBar from './TopBar.jsx';

function Layout() {
  return (
    <div className="flex flex-row min-h-screen bg-(--bg-color) text-(--text-primary-color) overflow-hidden">
      {/* Sidebar fixa à esquerda */}
      <BarraLateral />

      {/* Área principal com header + conteúdo */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Header fixo no topo */}
        <TopBar />

        {/* Conteúdo da página com scroll independente */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
