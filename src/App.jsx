import { useState } from "react"

function App() {

  const defaultFormData = {
    name: "",
    username: "",
    password: "",
    specialization: "",
    experience: "",
    description: ""
  }

  const [formData, setFormData] = useState(defaultFormData);
  const [alertMessage, setAlertMessage] = useState("");

  function handleForm(e) {
    const value = e.target.value;
    const reference = e.target.name;
    setFormData({
      ...formData,
      [reference]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formDataConverted = Object.values(formData);
    const isAllFieldsFilled = formDataConverted.every((field) => {
      return field.trim() !== "";
    })

    if (!isAllFieldsFilled || formData.experience < 0 || !formData.specialization) {
      setAlertMessage(`
        Attenzione! Controlla che tutti i campi del modulo siano comppilati, 
        che gli anni di esperienza non siano indicati con un numero negativo
         e che la specializzazione sia selezionata.
        `)
      return;
    } else {
      setAlertMessage(null);
      console.log(formData);
    }
  }

  return (
    <>
      <section className="container">
        <h1 className="title">Web Developer Signup</h1>

        <form onSubmit={handleSubmit}>
          <div className="subscription-form">
            <div className="form-left">

              <label>Nome completo</label>
              <input type="text" placeholder="Nome..." name="name" value={formData.name} onChange={handleForm} />

              <label>Username</label>
              <input type="text" placeholder="Username..." name="username" value={formData.username} onChange={handleForm} />

              <label>Password</label>
              <input type="password" placeholder="Password..." name="password" value={formData.password} onChange={handleForm} />

            </div>
            <div className="form-right">
              <label>Specializzazione</label>
              <select name="specialization" value={formData.specialization} onChange={handleForm} >
                <option>Full Stack</option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>

              <label>Anni di esperienza</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleForm} />

              <label>Breve descrizione personale</label>
              <textarea name="description" value={formData.description} onChange={handleForm} ></textarea>

            </div>
          </div>
          {alertMessage && (
            <div>
              <p>{alertMessage}</p>
            </div>
          )}
          <button type="submit">Iscriviti</button>
        </form>

      </section>
    </>
  )
}

export default App