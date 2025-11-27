import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/api';

export default function Home() {
  const [users,setUsers]= useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [search,setSearch] = useState('');
  const [city,setCity] = useState('');

  const carregar = () => {
    setLoading(true);
    setError('');
    getUsers()
      .then(setUsers)
      .catch(() => setError('Erro ao carregar usuários.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    carregar();
  }, []);

  const cities = useMemo(() => {
    const set = new Set(users.map(u => u.address?.city).filter(Boolean));
    return Array.from(set).sort();
  }, [users]);
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return users.filter(u => {
      const byText =
        s === '' ||
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s);
      const byCity = city === '' || u.address?.city === city;
      return byText && byCity;
    });
  }, [users, search, city]);

  if (loading) return <p className="status">Carregando usuários...</p>;

  if (error) {
    return (
      <div className="status error">
        <p>{error}</p>
        <button className="btn" onClick={carregar}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <section>
      <h2>Lista de Usuários</h2>
      <div className="filters">
        <input
          className="input"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Todas as cidades</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="muted">Exibindo {filtered.length} de {users.length} usuários</p>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address?.city}</td>
                <td>
                  <Link to={`/usuario/${u.id}`} className="btn btn-small">
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length==0 && (
              <tr>
                <td colSpan={4} className="muted">Nenhum usuário corresponde ao filtro.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
