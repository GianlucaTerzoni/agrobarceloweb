import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './Formulario.css'
import emailjs from 'emailjs-com'



const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  
  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_judsk5d', 'template_dfn95ge', e.target, 'aZf1nfm7dqaftSLF1'
    ).then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }



  return (
    <>

    <div className="container">
        
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          mensaje: "",
        }}
        validate={(valores) => {
          let errores = {};
          //validacion nombre
          if (!valores.nombre) {
            errores.nombre = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = "El nombre puede contener solo letras y espacios";
          }
          //validacion correo
          if (!valores.email) {
            errores.email = "Por favor ingrese un correo electrónico";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email = "Por favor ingrese un correo electrónico válido";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log(valores);
          console.log("Correo enviado exitosamente");
          setFormularioEnviado(true);
          setTimeout(() => setFormularioEnviado(false), 10000);
        }}
      >
        {({ errors }) => (
          <Form className="formulario" onSubmit={sendEmail}>
            
            <div>
              <label htmlFor="nombre">NOMBRE:</label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
              />
              <ErrorMessage
                name="nombre"
                component={() => <div className="error">{errors.nombre}</div>}
              />

              <div>
                <label htmlFor="email">CORREO ELECTRÓNICO:</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Introducir correo electr."
                />
                <ErrorMessage
                  name="email"
                  component={() => <div className="error">{errors.email}</div>}
                />
              </div>
              <div>
                <label htmlFor="mensaje">MENSAJE:</label>
                <Field
                  as="textarea"
                  id="mensaje"
                  name="mensaje"
                  placeholder="Escriba su mensaje"
                />
                <ErrorMessage
                  name="mensaje"
                  component={() => (
                    <div className="error">{errors.mensaje}</div>
                  )}
                />
              </div>
              <button type="submit">Enviar</button>
              {formularioEnviado && (
                <p className="exito">Correo enviado con éxito!</p>
              )}
            </div>
            
          </Form>
          
        )}
        
      </Formik>
      
      </div>  
               
    
   

    </>
  );
};

export default Formulario;
