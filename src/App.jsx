import { useMemo, useState } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

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
  const [alertMessage, setAlertMessage] = useState(null);

  const isUsernameValid = useMemo(() => {
    const validCaracters = formData.username.split("").every((character) => {
      return letters.includes(character.toLowerCase()) || numbers.includes(character)
    })
    const validLength = formData.username.trim().length >= 6;

    return validLength && validCaracters;
  }, [formData.username]);

  const isPasswordValid = useMemo(() => {
    const validLength = formData.password.trim().length >= 8;
    const validLetter = formData.password.split("").some((character) => {
      return letters.includes(character);
    })
    const validSymbol = formData.password.split("").some((character) => {
      return symbols.includes(character);
    })
    const validNumber = formData.password.split("").some((character) => {
      return numbers.includes(character);
    })

    return validLength && validLetter && validSymbol && validNumber;
  }, [formData.password])

  const isDescriptionValid = useMemo(() => {
    const validLength = formData.description.trim().length >= 100 && formData.description.trim().length <= 1000;
    return validLength;
  })

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
        Attenzione! Controlla che tutti i campi del modulo siano compilati, 
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

              <label className="mt">Username</label>
              <input type="text" placeholder="Username..." name="username" value={formData.username} onChange={handleForm} />
              {formData.username.trim() && (
                !isUsernameValid ?
                  <p className="not-valid-field">Deve contenere solo caratteri alfanumerici e almeno 6 caratteri</p> :
                  <p className="valid-field">Username valido</p>
              )}
              <label className="mt">Password</label>
              <input type="password" placeholder="Password..." name="password" value={formData.password} onChange={handleForm} />
              {formData.password.trim() && (
                !isPasswordValid ?
                  <p className="not-valid-field">Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.</p> :
                  <p className="valid-field">Password valida</p>
              )}
            </div>
            <div className="form-right">
              <label>Specializzazione</label>
              <select name="specialization" value={formData.specialization} onChange={handleForm} >
                <option>Full Stack</option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>

              <label className="mt">Anni di esperienza</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleForm} />

              <label className="mt">Breve descrizione personale</label>
              <textarea name="description" value={formData.description} onChange={handleForm} ></textarea>
              {formData.description.trim() && (
                !isDescriptionValid ?
                  <p className="not-valid-field">Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).</p> :
                  <p className="valid-field">Descrizione valida</p>
              )}
            </div>
          </div>
          {alertMessage && (
            <div className="form-alert-message">
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