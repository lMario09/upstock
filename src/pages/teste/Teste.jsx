import { Package, ArrowUpRight, ArrowDownRight, AlertTriangle, Activity, DollarSign } from 'lucide-react';

function Teste() {
  const stats = [
    {
      label: 'Produtos Cadastrados',
      value: '1.248',
      change: '+12% esta semana',
      isPositive: true,
      icon: Package,
      color: 'var(--blue-color3)',
    },
    {
      label: 'Entradas (Hoje)',
      value: '84',
      change: '+8% em relação a ontem',
      isPositive: true,
      icon: ArrowUpRight,
      color: 'var(--green-color4)',
    },
    {
      label: 'Saídas (Hoje)',
      value: '29',
      change: '-3% em relação a ontem',
      isPositive: false,
      icon: ArrowDownRight,
      color: 'var(--red-color4)',
    },
    {
      label: 'Alertas de Estoque',
      value: '3',
      change: 'Itens com estoque baixo',
      isPositive: false,
      icon: AlertTriangle,
      color: 'var(--yellow-color2)',
    },
  ];

  const recentMovements = [
    { id: 1, type: 'Entrada', product: 'Mouse Logitech MX Master 3S', qty: '+12', date: 'Hoje, 16:34', user: 'Carlos Silva' },
    { id: 2, type: 'Saída', product: 'Monitor Dell UltraSharp 27"', qty: '-2', date: 'Hoje, 15:12', user: 'Ana Paula' },
    { id: 3, type: 'Entrada', product: 'Teclado Keychron K2 V2', qty: '+5', date: 'Hoje, 11:20', user: 'Luiz Santos' },
    { id: 4, type: 'Saída', product: 'Cabo HDMI 2.0 2m', qty: '-10', date: 'Ontem, 17:45', user: 'Carlos Silva' },
    { id: 5, type: 'Entrada', product: 'SSD Kingston NV2 1TB', qty: '+20', date: 'Ontem, 14:30', user: 'Mariana Costa' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-(--text-primary-color)">Visão Geral</h1>
        <p className="text-sm sm:text-base text-(--text-secondary-color)">
          Bem-vindo ao painel de gerenciamento do UpStock. Aqui está o resumo das operações de hoje.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-6 flex flex-col gap-4 hover:border-gray-600 transition-all duration-300 shadow-lg hover:translate-y-[-2px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-semibold text-(--text-secondary-color)">{stat.label}</span>
                <div
                  className="p-2 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  <Icon size={20} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-(--text-primary-color)">{stat.value}</span>
                <span
                  className={`text-xs font-medium ${
                    stat.isPositive
                      ? 'text-(--green-color4)'
                      : stat.label.includes('Alertas')
                      ? 'text-(--yellow-color2)'
                      : 'text-(--red-color4)'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Movements Table */}
        <div className="bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-6 lg:col-span-2 flex flex-col gap-4 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl font-bold text-(--text-primary-color) flex items-center gap-2">
              <Activity size={18} className="sm:size-5 text-(--blue-color3)" />
              Últimas Movimentações
            </h2>
            <button className="text-xs text-(--blue-color3) hover:underline font-semibold">Ver todas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-(--border-color) text-xs font-semibold text-(--text-secondary-color) uppercase">
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Produto</th>
                  <th className="py-3 px-4">Qtd.</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Operador</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-color) text-sm text-(--text-primary-color)">
                {recentMovements.map((move) => (
                  <tr key={move.id} className="hover:bg-(--bg-card-hover-color) transition-colors">
                    <td className="py-3.5 px-4 font-semibold">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                          move.type === 'Entrada'
                            ? 'bg-emerald-500/10 text-(--green-color4)'
                            : 'bg-rose-500/10 text-(--red-color4)'
                        }`}
                      >
                        {move.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-(--text-primary-color) font-medium">{move.product}</td>
                    <td className={`py-3.5 px-4 font-bold ${move.type === 'Entrada' ? 'text-(--green-color4)' : 'text-(--red-color4)'}`}>
                      {move.qty}
                    </td>
                    <td className="py-3.5 px-4 text-(--text-secondary-color)">{move.date}</td>
                    <td className="py-3.5 px-4 text-(--text-secondary-color)">{move.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions & Stock Alerts */}
        <div className="flex flex-col gap-6">
          <div className="bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-(--text-primary-color) flex items-center gap-2">
              <DollarSign size={18} className="sm:size-5 text-(--green-color4)" />
              Valor Total do Estoque
            </h2>
            <div className="flex flex-col gap-1 py-2">
              <span className="text-2xl sm:text-4xl font-extrabold text-(--text-primary-color)">R$ 184.250,00</span>
              <span className="text-xs text-(--green-color4) flex items-center gap-1 font-medium">
                Valor estimado dos produtos armazenados
              </span>
            </div>
            <div className="w-full bg-(--bg-muted) rounded-full h-2">
              <div className="bg-(--green-color4) h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-(--text-secondary-color)">
              <span>Capacidade utilizada: 75%</span>
              <span>15.000 max</span>
            </div>
          </div>

          <div className="bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-6 flex flex-col gap-4 shadow-lg">
            <h2 className="text-base sm:text-lg font-bold text-(--text-primary-color) flex items-center gap-2">
              <AlertTriangle size={18} className="text-(--yellow-color2)" />
              Ações Recomendadas
            </h2>
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex flex-col gap-1">
                <span className="text-xs font-bold text-(--yellow-color2)">Estoque Baixo: Mouse Logitech</span>
                <span className="text-xs text-(--text-secondary-color)">Restam apenas 2 unidades no almoxarifado principal.</span>
              </div>
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex flex-col gap-1">
                <span className="text-xs font-bold text-(--green-color4)">Nova movimentação registrada</span>
                <span className="text-xs text-(--text-secondary-color)">Aguardando conferência do lote #942.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teste;

