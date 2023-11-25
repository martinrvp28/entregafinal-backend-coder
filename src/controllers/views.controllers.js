import UserDao from "../persistence/daos/mongodb/user.dao.js";
import UserRepository from "../persistence/repository/users/users.repository.js";

const userDao = new UserDao();
const userRepository = new UserRepository();

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();


export const register = (req,res) => {
    res.render('register')
};

export const errorRegister = (req,res) => {
    res.render('errorRegister');
}

export const login = (req,res) => {
    res.render('login');
}

export const errorLogin = (req,res) => {
    res.render('errorLogin');
}

export const profile = async (req, res) => {
    try {
        const user = await userRepository.getByIdDTO(req.session.passport.user);
        
        const  userData = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            age: user.age
        }

        res.render('profile', { userData });
    } catch (error) {
        next(error);
        return httpResponse.ServerError(res, 'Error al recibir el perfil del usuario');
    }
}