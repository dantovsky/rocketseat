import { Header } from './components/Header';
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css'

import './global.css';

function App() {

  return (
    <div>
      {/* <ShoppingList /> */}
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            title="Um Dia Legal"
            content="O conteúdo sobre o dia legal..."
          />
          <Post
            title="Um Dia Mais Comum"
            content="O conteúdo sobre o dia legal com sol demais."
          />
        </main>
      </div>
    </div>
  )
}

export default App
