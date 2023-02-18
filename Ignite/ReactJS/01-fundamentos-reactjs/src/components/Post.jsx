import styles from './Post.module.css'

export function Post() {
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src="https://github.com/dantovsky.png" alt="" />
                    <div className={styles.authorInfo}>
                        <strong>Dante Marinho</strong>
                        <span>Web Developer</span>
                    </div>
                </div>

                <time title="11 de Maio às 08:13" dateTime='2022-05-11  08:13:30'>Publicado há 1h</time>
            </header>

            <div className={styles.content}>
                <p>Fala galera!!!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius consectetur tempora corporis aspernatur. Quibusdam officia itaque neque repudiandae cum dignissimos ad distinctio blanditiis culpa tempore.</p>
                <p><a href="">dantemarinho.com</a></p>
                <p>
                    <a href="">#novoprojeto</a>{' '}
                    <a href="">#nlw</a>{' '}
                    <a href="">#rocketseat</a>
                </p>
            </div>

            <form className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea placeholder='Deixe seu comentário' />

                {/* Será aplicado uma condicional feita com CSS onde o botão só aparece quando tem focus no textarea */}
                <footer>
                    <button type='submit'>Publicar</button>
                </footer>
            </form>
        </article>
    )
}