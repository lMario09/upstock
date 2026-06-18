/**
 * Serviço de Autenticação - UpStock
 *
 * Este serviço centraliza as operações de login e logout.
 * A implementação atual utiliza o LocalStorage para simular a persistência de usuários,
 * facilitando o desenvolvimento frontend e testes rápidos.
 *
 * Cada usuário possui um campo `role`:
 *  - "admin" → acesso total ao sistema, inclusive gerenciamento de usuários
 *  - "user"  → acesso ao painel operacional (produtos, movimentações, relatórios, etc.)
 *
 * O cadastro de novos usuários é exclusivo do administrador (via painel /usuarios).
 * Não há cadastro público.
 *
 * --- COMO CONECTAR COM UM BANCO DE DADOS / API REAL NO FUTURO ---
 *
 * Para substituir esta simulação por uma integração real (Firebase, Supabase,
 * ou uma API REST em Node.js/Python/Go/Java), basta modificar os métodos abaixo
 * para realizarem chamadas HTTP utilizando `fetch`, `axios` ou as SDKs oficiais.
 *
 * Exemplo com Fetch API para o método `login`:
 * ```javascript
 * async login(email, password) {
 *   const response = await fetch('https://sua-api.com/auth/login', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ email, password })
 *   });
 *   if (!response.ok) {
 *     const errorData = await response.json();
 *     throw new Error(errorData.message || 'Falha na autenticação');
 *   }
 *   const data = await response.json(); // Retorna { token, user }
 *   localStorage.setItem('upstock_token', data.token);
 *   return data.user;
 * }
 * ```
 */

const USERS_KEY = 'upstock_users';
const CURRENT_USER_KEY = 'upstock_current_user';

/**
 * Inicializa os usuários padrão do sistema caso ainda não existam dados salvos.
 * O administrador principal é criado aqui.
 */
const initMockUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUsers = [
      {
        id: '1',
        name: 'Admin',
        email: 'admin@upstock.com',
        password: 'admin123',
        cargo: 'Administrador',
        role: 'admin',
        createdAt: new Date().toLocaleDateString('pt-BR')
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  } else {
    // Migração: garante roles e atualiza credenciais legadas do admin padrão.
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    let changed = false;
    const migrated = users.map((u) => {
      let updated = { ...u };
      // Garante campo role
      if (!updated.role) {
        updated.role = updated.id === '1' ? 'admin' : 'user';
        changed = true;
      }
      // Atualiza credenciais legadas do admin padrão (id: '1')
      if (updated.id === '1' && updated.email === 'luiz.silva@upstock.com') {
        updated.name = 'Admin';
        updated.email = 'admin@upstock.com';
        updated.password = 'admin123';
        updated.cargo = 'Administrador';
        changed = true;
      }
      return updated;
    });
    if (changed) {
      localStorage.setItem(USERS_KEY, JSON.stringify(migrated));
    }
  }
};

initMockUsers();

export const authService = {
  /**
   * Autentica um usuário usando email e senha.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} O usuário autenticado (sem a senha).
   */
  async login(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      throw new Error('E-mail não cadastrado no sistema.');
    }

    if (user.password !== password) {
      throw new Error('Senha incorreta. Por favor, tente novamente.');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  /**
   * Encerra a sessão ativa do usuário.
   * @returns {Promise<void>}
   */
  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  /**
   * Obtém os dados do usuário atualmente logado (se houver).
   * @returns {Promise<object|null>} Dados do usuário ativo ou null.
   */
  async getCurrentUser() {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Retorna a lista completa de usuários cadastrados (sem senhas).
   * Uso exclusivo do administrador.
   * @returns {Promise<object[]>}
   */
  async listUsers() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return users.map(({ password: _, ...u }) => u);
  },

  /**
   * Cria um novo usuário no sistema.
   * Uso exclusivo do administrador.
   * @param {{ name: string, email: string, password: string, cargo: string, role: string }} userData
   * @returns {Promise<object>} O novo usuário criado (sem senha).
   */
  async createUser({ name, email, password, cargo, role = 'user' }) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      throw new Error('Este endereço de e-mail já está cadastrado.');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      cargo: cargo || 'Colaborador',
      role,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  /**
   * Remove um usuário pelo ID.
   * Uso exclusivo do administrador. Não permite remover a si mesmo.
   * @param {string} userId - ID do usuário a ser removido.
   * @param {string} currentAdminId - ID do admin executando a ação.
   * @returns {Promise<void>}
   */
  async deleteUser(userId, currentAdminId) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (userId === currentAdminId) {
      throw new Error('Você não pode remover sua própria conta.');
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const filtered = users.filter((u) => u.id !== userId);

    if (filtered.length === users.length) {
      throw new Error('Usuário não encontrado.');
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
  }
};
