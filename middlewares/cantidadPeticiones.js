const { getContador, updateContador } = require("../database/querys")

const contadorPeticiones=async (req,res,next) => {
    try {
        const cont= await getContador()
        let numero=(cont[0]?.numero)
        // si el contador de peticiones llega a 10
        if((numero+1)===10){
            await updateContador([0])
            return  res.status(429).send('TOO MANY REQUESTS')
        // si no es 10, suma 1 al contador
        }else{
            await updateContador([numero+1])
        }
    } catch (error) {
        console.log(error.message)
       return  res.status(500).send('Internal error')
    }
    next()
}

module.exports={
    contadorPeticiones
}