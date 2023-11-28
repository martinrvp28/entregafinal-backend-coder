import { transporter } from "../services/email.service.js";
import 'dotenv/config'

export async function sendGmail(email, name) {
    try {
        const gmailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aviso de Inactividad en la App',
            html: `<h1>Hola ${name}, este es un mail automático para hacerte saber que tu cuenta fue eliminada de la App por Inactividad. Gracias.</h1>`
        };
        
        await transporter.sendMail(gmailOptions);
        console.log('Email usuario eliminado, enviado con éxito');
        
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export async function sendGmailProduct(email,title) {
    try {
        const gmailOptionsProd = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aviso de Producto Eliminado de la App',
            html: `<h1>Hola, este es un mail automático para hacerte saber que tu producto "${title}" fue eliminado de la App. Gracias.</h1>`
        };

        await transporter.sendMail(gmailOptionsProd);
        console.log('Email producto eliminado, enviado con éxito');
        
    } catch (error) {
        
    }
}
