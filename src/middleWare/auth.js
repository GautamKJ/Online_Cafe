

const auth = async (req, res, next) => {
    try {
        const emailType = req.body.email;
        const passwordType = req.body.password;
        console.log(emailType, passwordType);
        if (emailType == "admin123@gmail.com") {
            connection.query(`SELECT email,passwords,firstname,lastname,age FROM register_user_detail4 WHERE email = "${emailType}"`, async function (err, result, fields) {
                if (err) {
                    throw err;

                }


                const loginPasswordMatch = await bcrypt.compare(passwordType, result[0].passwords);

                if (loginPasswordMatch) {
                    console.log("Login successfully...");
                    Useremail = result[0].email;
                    UserName = result[0].firstname;
                    loginTrue = true;
                    res.render("profile", {
                        Login: result[0].firstname
                    });

                    next();
                    return;
                }

                console.log("!!!!!!Login error!!!!");
                res.redirect('/login');


            });


        }
    }
    catch (e) {

    }

}

module.exports = auth;