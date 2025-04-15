function App() {
  return (
    <>
      <section className="container">
        <h1 className="title">Web Developer Signup</h1>

        <form>
          <div className="subscription-form">
            <div className="form-left">
              <label>Nome completo</label>
              <input type="text" placeholder="Nome..." id="" />
              <label>Username</label>
              <input type="text" placeholder="Username..." id="" />
              <label>Password</label>
              <input type="password" placeholder="Password..." id="" />
            </div>

            <div className="form-right">
              <label>Specializzazione</label>
              <select>
                <option>Scegli un'opzione</option>
                <option>Full Stack</option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>
              <label>Anni di esperienza</label>
              <input type="number" />
              <label>Breve descrizione personale</label>
              <textarea></textarea>
            </div>
          </div>
          <button type="submit">Iscriviti</button>
        </form>

      </section>
    </>
  )
}

export default App