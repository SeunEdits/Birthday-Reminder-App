import { prisma } from "../config/database.js"

export const createUser = async (req, res) => {
    const data = req.body
    // console.log(data)

    if (!data.username || !data.email || !data.dob) {
        res.json({
            message: "Fields cannot be empty"
        })
    } else {

        // check if username or email exists
        const exist = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: { equals: data.username.toLowerCase() } },
                    { email: { equals: data.email.toLowerCase() } }
                ]
            }
        })

        if (!exist) {
            const sucess = await prisma.user.create({
                data: {
                    username: data.username.toLowerCase(),
                    email: data.email.toLowerCase(),
                    dob: new Date(data.dob)
                }
            })

            if (!sucess) {
                res.json({
                    message: "An error occured while creating user"
                }).status(500)
            }

            res.json({
                status: "success",
                message: "User created successfully"
            })

        } else if (exist.username.toLowerCase() == data.username.toLowerCase()) {
                res.json({
                    status: "error",
                    message: "Username already exists"
                })
        } else {
            // console.log(exist.username)
            // console.log(data.username)
            res.json({
                status: "error",
                message: "Email already exists"
            })
        }
    }

}


export const getCelebrants = async () => {
    // get all customers with today's birthday.
    // query database 
    const celebrants = await prisma.$queryRaw`
    SELECT *
    FROM "user"
    WHERE EXTRACT(MONTH FROM "dob") = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(DAY FROM "dob") = EXTRACT(DAY FROM CURRENT_DATE)`;
    return celebrants
}

