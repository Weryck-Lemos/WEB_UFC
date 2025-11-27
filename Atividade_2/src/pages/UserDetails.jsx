import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser, getUserPosts } from '../services/api';
import PostModal from '../components/PostModal';

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [errorUser, setErrorUser] = useState('');
  const [errorPosts, setErrorPosts] = useState('');

  const [modalPost, setModalPost] = useState(null);

  useEffect(() => {
    setLoadingUser(true);
    setErrorUser('');
    getUser(id)
      .then(setUser)
      .catch(() => setErrorUser('Erro ao carregar usuário.'))
      .finally(() => setLoadingUser(false));
  }, [id]);

  useEffect(() => {
    setLoadingPosts(true);
    setErrorPosts('');
    getUserPosts(id)
      .then(setPosts)
      .catch(() => setErrorPosts('Erro ao carregar posts.'))
      .finally(() => setLoadingPosts(false));
  }, [id]);

  if (loadingUser) return <p className="status">Carregando usuário...</p>;

  if (errorUser) {
    return (
      <div className="status error">
        <p>{errorUser}</p>
        <Link className="btn" to="/">Voltar</Link>
      </div>
    );
  }

  return (
    <section>
      <h2>Detalhes do Usuário</h2>

      {user && (
        <div className="card">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>E-mail:</strong> {user.email}</p>
          <p><strong>Telefone:</strong> {user.phone}</p>
          <p><strong>Empresa:</strong> {user.company?.name}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p>
            <strong>Endereço:</strong>{' '}
            {user.address?.street}, {user.address?.suite}, {user.address?.city} - {user.address?.zipcode}
          </p>
        </div>
      )}

      <div className="posts">
        <h3>Posts do Usuário</h3>

        {loadingPosts && <p className="status">Carregando posts...</p>}

        {!loadingPosts && errorPosts && (
          <div className="status error">
            <p>{errorPosts}</p>
          </div>
        )}

        {!loadingPosts && !errorPosts && posts.length === 0 && (
          <p className="muted">Nenhum post encontrado.</p>
        )}

        {!loadingPosts && !errorPosts && posts.length > 0 && (
          <ul className="post-list">
            {posts.map(p => (
              <li key={p.id} className="post-item">
                <span>{p.title}</span>
                <button className="btn btn-small" onClick={() => setModalPost(p)}>
                  Ver conteúdo
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="spacer" />
      <Link className="btn" to="/">Voltar</Link>

      <PostModal post={modalPost} onClose={() => setModalPost(null)} />
    </section>
  );
}
