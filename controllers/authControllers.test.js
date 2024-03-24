// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

//{ "password": "123456", "email": "vika@com.ua"}-true
//{ "password": "12345", "email": "vika@com.ua"}-false
//{ "password": "123456"}-false
// {"email": "vika@com.ua"}-false
//{}-false

const authControllers = require ("../controllers/authControllers")

describe("Test login controller", () => {
    test("status 200 true", () => {
        const reslt = 
    })
})

