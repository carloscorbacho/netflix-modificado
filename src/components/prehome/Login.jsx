import {Box, Button, TextField } from '@mui/material';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {onLogin} from "../../store/slice";
import Swal from "sweetalert2";
import validator from 'validator';

// Inicializamos los objetos
const formData = {
    email: '',
    password: ''
}

const initErrors = {
    emailError: '',
    passwordError: ''
}

export const Login = () => {

    // Creamos los estados del formulario
    const dispatch = useDispatch();
    const [formUser, setFormUser] = useState(formData);
    const [errors, setErrors] = useState(initErrors);
    const [submit, setSubmit] = useState(false);

    /*
        Hacemos un useEffect para ir actualizando los errores en función de la información que
        va añadiendo el usuario
     */
    useEffect(() => {
        const {email, password} = formUser;
        formValid(email, password);
    }, [formUser])

    const onsubmit = (event) => {
        event.preventDefault();

        // Obtenemos la información desestrucurada y actualizamos los valores
        setSubmit(true);
        const {emailError, passwordError} = errors;
        const {email, password} = formUser;

        // Comprobamos que todo está correcto
        const correctForm = emailError === '' && passwordError === '' && !!email && !!password;

        if (correctForm) {
            /*
                Utilizamos la libreria swal para que aparezca un modal y confirmar al usuario que ha accedido
                correctamente
             */
            Swal.fire(
                'Credenciales correctas.',
                '',
                'success'
            )

            setTimeout(() => {
                // Enviamos la petición mediante un dispatch para hacer login
                //Expresion regular que quita de toda la cadena las comillas ' "
                sessionStorage.setItem('user', JSON.stringify(email).replace(/['"]+/g, ''));
                const session = sessionStorage.getItem('user');
                dispatch(onLogin({ email: session }));
            }, 2000)
        }

    }

    const onInputChange = ({target}) => {
        // Obtenemos el contenido en este momento del input en cuestión
        const { name, value } = target;

        /*
            Actualizamos la información del usuario, pasandole el contenido desestrucutrado
            y el valor cambiado para actualizarlo y obtener el valor especifico en este momento
        */
        setFormUser({
            ...formUser,
            [name]: value
        })
    }

    const formValid = (email = '', password = '') => {
        // Si no contiene @ y es inferior a 4 carácteres el email será incorrecto
        const emailError = validator.isEmail(email) ? '' : 'El email es incorrecto.';

        // Si la contraseña es inferior a 6 carácteres la contraseña será incorrecta
        const passwordError = password.length <= 6 ? 'La password es incorrecta.' : '';

        // Actualizamos los errores
        setErrors({
            emailError,
            passwordError
        })

    }

    return (
        <Box className="box-login">
            <form onSubmit={onsubmit}>
                <TextField
                    label="Email"
                    variant="filled"
                    type="text"
                    name="email"
                    onChange={onInputChange}
                    value={formUser.email}
                    error={!!errors.emailError && submit}
                    helperText={submit && errors.emailError}
                    className="box-login_input box-login_input--1"
                />

                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    name="password"
                    onChange={onInputChange}
                    value={formUser.password}
                    error={!!errors.passwordError && submit}
                    helperText={submit && errors.passwordError}
                    className="box-login_input box-login_input--2"
                />

                <Button
                    variant="contained"
                    type="submit"
                    onClick={onsubmit}
                >
                    Iniciar sesión
                </Button>

            </form>
        </Box>
    )
}