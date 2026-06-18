import { Plus, Search, Filter, AlertCircle, Edit, Trash2 } from 'lucide-react';

function Produtos() {
  const products = [
    { id: 1, name: 'Mouse Logitech MX Master 3S', category: 'Periféricos', stock: 2, minStock: 5, price: 'R$ 549,00' },
    { id: 2, name: 'Monitor Dell UltraSharp 27"', category: 'Monitores', stock: 15, minStock: 5, price: 'R$ 2.499,00' },
    { id: 3, name: 'Teclado Keychron K2 V2', category: 'Periféricos', stock: 8, minStock: 4, price: 'R$ 689,00' },
    { id: 4, name: 'SSD Kingston NV2 1TB', category: 'Armazenamento', stock: 45, minStock: 10, price: 'R$ 399,00' },
    { id: 5, name: 'Memória RAM Corsair 16GB', category: 'Componentes', stock: 30, minStock: 8, price: 'R$ 349,00' },
    { id: 6, name: 'Cabo HDMI 2.0 2m', category: 'Cabos', stock: 120, minStock: 20, price: 'R$ 49,00' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-(--text-primary-color)">Produtos</h1>
          <p className="text-(--text-secondary-color)">
            Gerencie o catálogo de produtos, estoque e valores.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-(--blue-color3) hover:bg-(--blue-color2) text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200">
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-4 shadow-lg w-full">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary-color)" size={18} />
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            className="w-full pl-10 pr-4 py-2 bg-(--bg-card-hover-color) border border-(--border-color) rounded-xl text-(--text-primary-color) placeholder-(--text-secondary-color) focus:outline-none focus:border-gray-500 text-sm"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 border border-(--border-color) hover:bg-(--bg-card-hover-color) text-(--text-primary-color) font-semibold py-2 px-4 rounded-xl text-sm transition-all w-full sm:w-auto">
            <Filter size={16} />
            Filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-(--bg-card-color) border border-(--border-color) rounded-2xl p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-(--border-color) text-xs font-semibold text-(--text-secondary-color) uppercase">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Estoque</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color) text-sm text-(--text-primary-color)">
              {products.map((product) => {
                const isLowStock = product.stock <= product.minStock;
                return (
                  <tr key={product.id} className="hover:bg-(--bg-card-hover-color) transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-(--text-primary-color)">{product.name}</td>
                    <td className="py-3.5 px-4 text-(--text-secondary-color)">{product.category}</td>
                    <td className="py-3.5 px-4 font-semibold">{product.price}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold">{product.stock}</span>
                      <span className="text-xs text-(--text-secondary-color)"> / {product.minStock} min</span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-(--yellow-color2)">
                          <AlertCircle size={12} />
                          Estoque Baixo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-(--green-color4)">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-(--bg-card-hover-color) rounded-lg text-(--text-secondary-color) hover:text-(--text-primary-color) transition-colors">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-(--bg-card-hover-color) rounded-lg text-(--text-secondary-color) hover:text-(--red-color4) transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
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

export default Produtos;
