import { prisma } from "../dist/config/database.js"

export const createUser = async (req, res) => {
    const data = req.body

    if (!data.username || !data.email || !data.dob) {
        res.json({
            message: "Fields cannot be empty"
        })
    } else {

        // check if username or email exists
        const exist = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: { contains: data.username } },
                    { email: { contains: data.email } }
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
                })
            }

            res.json({
                message: "User created successfully"
            })

        } else if (exist.username == data.username) {
            res.redirect("/")
        } else {
            res.redirect("/")
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

