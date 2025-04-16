import { useMemo, useState, useRef } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function App() {

  const defaultFormData = {
    username: "",
    password: "",
    description: ""
  }
  const name = useRef();
  const specialization = useRef();
  const experience = useRef();

  const [formData, setFormData] = useState(defaultFormData);
  const [alertMessage, setAlertMessage] = useState(null);

  // Validazione username
  const isUsernameValid = useMemo(() => {
    const validCaracters = formData.username.split("").every((character) => {
      return letters.includes(character.toLowerCase()) || numbers.includes(character)
    })
    const validLength = formData.username.trim().length >= 6;
    return validLength && validCaracters;
  }, [formData.username]);

  // Validazione password
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

  // Validazione Descrizione
  const isDescriptionValid = useMemo(() => {
    const validLength = formData.description.trim().length >= 100 && formData.description.trim().length <= 1000;
    return validLength;
  })

  // Funzione al cambiamento dei campi con useState 
  function handleForm(e) {
    const value = e.target.value;
    const reference = e.target.name;
    setFormData(curr => {
      return {
        ...curr,
        [reference]: value
      }
    })
  }

  // Funzione di gestione invio del form
  function handleSubmit(e) {
    e.preventDefault();

    const completedFormData = {
      ...formData,
      name: name.current.value,
      specialization: specialization.current.value,
      experience: experience.current.value
    }

    // Validazione tutti i campi compilati
    const formDataConverted = Object.values(completedFormData);
    const isAllFieldsFilled = formDataConverted.every((field) => {
      return field.trim() !== "";
    })

    // Alert message in caso di condizioni non rispettate
    if (!isAllFieldsFilled || experience.current.value < 0 || specialization.current.value === "Seleziona un'opzione") {
      setAlertMessage(`
            Attenzione! Controlla che tutti i campi del modulo siano compilati, 
            che gli anni di esperienza non siano indicati con un numero negativo
             e che la specializzazione sia selezionata.
            `)
      return;
    } else {
      setAlertMessage(null);
      console.log(completedFormData);
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
              <input type="text" placeholder="Nome..." ref={name} />

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
              <select name="specialization" ref={specialization}>
                <option>Seleziona un'opzione</option>
                <option>Full Stack</option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>

              <label className="mt">Anni di esperienza</label>
              <input type="number" name="experience" ref={experience} />

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