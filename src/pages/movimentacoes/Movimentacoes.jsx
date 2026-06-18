import { ArrowUpRight, ArrowDownRight, Search, Calendar, Filter } from 'lucide-react';

function Movimentacoes() {
  const transactions = [
    { id: 1, type: 'Entrada', product: 'Mouse Logitech MX Master 3S', qty: 12, date: '15/06/2026 16:34', user: 'Carlos Silva', status: 'Confirmado' },
    { id: 2, type: 'Saída', product: 'Monitor Dell UltraSharp 27"', qty: 2, date: '15/06/2026 15:12', user: 'Ana Paula', status: 'Confirmado' },
    { id: 3, type: 'Entrada', product: 'Teclado Keychron K2 V2', qty: 5, date: '15/06/2026 11:20', user: 'Luiz Santos', status: 'Confirmado' },
    { id: 4, type: 'Saída', product: 'Cabo HDMI 2.0 2m', qty: 10, date: '14/06/2026 17:45', user: 'Carlos Silva', status: 'Confirmado' },
    { id: 5, type: 'Entrada', product: 'SSD Kingston NV2 1TB', qty: 20, date: '14/06/2026 14:30', user: 'Mariana Costa', status: 'Confirmado' },
    { id: 6, type: 'Saída', product: 'Memória RAM Corsair 16GB', qty: 4, date: '13/06/2026 10:15', user: 'Ana Paula', status: 'Confirmado' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-primary-color)">Movimentações</h1>
        <p className="text-(--text-secondary-color)">
          Histórico completo de entradas e saídas do estoque.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-4 shadow-lg w-full">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary-color)" size={18} />
          <input
            type="text"
            placeholder="Pesquisar por produto..."
            className="w-full pl-10 pr-4 py-2 bg-(--bg-card-hover-color) border border-(--border-color) rounded-xl text-(--text-primary-color) placeholder-(--text-secondary-color) focus:outline-none focus:border-gray-500 text-sm"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 border border-(--border-color) hover:bg-(--bg-card-hover-color) text-(--text-primary-color) font-semibold py-2 px-4 rounded-xl text-sm transition-all w-full sm:w-auto">
            <Calendar size={16} />
            Período
          </button>
          <button className="flex items-center justify-center gap-2 border border-(--border-color) hover:bg-(--bg-card-hover-color) text-(--text-primary-color) font-semibold py-2 px-4 rounded-xl text-sm transition-all w-full sm:w-auto">
            <Filter size={16} />
            Tipo
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-(--border-color) text-xs font-semibold text-(--text-secondary-color) uppercase">
                <th className="py-3 px-4">Direção</th>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Quantidade</th>
                <th className="py-3 px-4">Data/Hora</th>
                <th className="py-3 px-4">Usuário</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color) text-sm text-(--text-primary-color)">
              {transactions.map((t) => {
                const IsInput = t.type === 'Entrada';
                const Icon = IsInput ? ArrowUpRight : ArrowDownRight;
                return (
                  <tr key={t.id} className="hover:bg-(--bg-card-hover-color) transition-colors">
                    <td className="py-3.5 px-4 font-semibold">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        IsInput ? 'bg-emerald-500/10 text-(--green-color4)' : 'bg-rose-500/10 text-(--red-color4)'
                      }`}>
                        <Icon size={14} />
                        {t.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-(--text-primary-color) font-medium">{t.product}</td>
                    <td className={`py-3.5 px-4 font-bold ${IsInput ? 'text-(--green-color4)' : 'text-(--red-color4)'}`}>
                      {IsInput ? `+${t.qty}` : `-${t.qty}`}
                    </td>
                    <td className="py-3.5 px-4 text-(--text-secondary-color)">{t.date}</td>
                    <td className="py-3.5 px-4 text-(--text-secondary-color)">{t.user}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-(--blue-color3)">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Movimentacoes;
