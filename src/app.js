const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const bcrypt = require('bcrypt');
const hbs = require('hbs');
const mysql = require('mysql');
const alert = require('alert');
const Razorpay = require('razorpay');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
// var auth = require("src\middleWare\auth.js")

const encoder = require('body-parser').urlencoded();
// console.log("auth----->> ",auth);

app.set("view engine", 'hbs');
app.use('/assets', express.static('assets'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'password',
    database: "Group12Project",
    insecureAuth: true

});

connection.connect(function (error) {
    if (error) {
        console.log("Database not connected... ", error);
    }
    else console.log("Connected to database successfully..");
})

const { resolveSoa } = require('dns');
const { Server } = require('http');
const { response } = require('express');
const { encode } = require('punycode');
const async = require('hbs/lib/async');
const req = require('express/lib/request');
const templatePath = path.join(__dirname, "templates/views");
const staticPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "templates/partials");
app.use(express.static(staticPath));
console.log(staticPath);
app.set("views", templatePath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

let UserName = "Login";
var loginTrue = false;
var Useremail = "";

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/profile', (req, res) => {
    res.render("profile", {
        Login: UserName
    });
})


app.get('/profile_about', (req, res) => {
    res.render("profile_about", {
        Login: UserName
    });
})

app.get('/profile_order', (req, res) => {
    res.render("profile_order", {
        Login: UserName
    });
})


app.get("/", (req, res) => {
    res.render("index", {
        Login: UserName
    });
});
app.get("/index", (req, res) => {

    res.render("index", {
        Login: UserName
    });
})
app.get("/menu", (req, res) => {

    res.render("menu", {
        Login: UserName
    });
})
app.get("/cart", (req, res) => {

    res.render("cart", {
        Login: UserName
    });
})
app.get("/payment", (req, res) => {


    res.redirect("order", {
        Login: UserName
    });
})
app.get("/login", (req, res) => {
    if (!loginTrue) {

        res.render("login", {
            Login: UserName
        })
    }
    else if (Useremail == "admin123@gmail.com") {
        res.render('adminHome', {
            Login: UserName
        })
    }
    else {
        res.render("profile", {
            Login: UserName
        });
    }
})

app.get("/addProduct", (req, res) => {
    res.render("addProduct", {
        Login: UserName
    })
});
app.get("/NewMenu", (req, res) => {
    res.render('NewMenu', {
        Login: UserName
    });
})
app.get("/adminHome", (req, res) => {
    res.render('adminHome', {
        Login: UserName
    });
});

app.get("/addProduct", (req, res) => {
    res.render('addProduct', {
        Login: UserName
    });
});

app.get("/adminMenu", (req, res) => {
    res.render('adminMenu', {
        Login: UserName
    });
});
app.get("/adminAbout", (req, res) => {
    res.render('adminAbout', {
        Login: UserName
    });
});
app.get("/adminOrder", (req, res) => {
    res.render('adminOrder', {
        Login: UserName
    });
});


app.get('/logout', (req, res) => {

    UserName = "Login";
    loginTrue = false;
    Useremail = "";

    res.render("login", {
        Login: UserName
    });
})

app.get("/admin", (req, res) => {

    res.render("admin");
})

app.get("/adminMenu", (req, res) => {
    res.render('adminMenu');
})
app.post("/editMenu", encoder, async (req, res) => {
    console.log("req.body-->", req.body[0]);

    // var sql = `UPDATE addProduct  SET product_image ="${req.body.DishPhoto}" , product_name="${req.body.name}" , product_price=${req.body.price} , product_type="${req.body.type} ", product_details="${req.body.details}" , product_offers=${req.body.offer}`;
    // connection.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result.affectedRows + " record(s) updated");
    // });
    res.render('adminMenu');
})

app.post("/login", encoder, async (req, res) => {
    const emailType = req.body.email;
    const passwordType = req.body.password;
    console.log(emailType, passwordType);
    connection.query(`SELECT email,passwords,firstname,lastname,age FROM register_user_detail4 WHERE email = "${emailType}"`, async function (err, result, fields) {
        if (err) {
            throw err;

        }
        if (result.length == 0) {
            alert("Invalid Login....");
            res.redirect('/login');
        }
        else if (emailType == "admin123@gmail.com") {
            console.log("emailType---->  ", emailType);
            const loginPasswordMatch1 = await bcrypt.compare(passwordType, result[0].passwords);
            if (loginPasswordMatch1) {
                console.log("Login successfully...");
                Useremail = result[0].email;
                UserName = result[0].firstname;
                loginTrue = true;
                res.render("adminHome", {
                    Login: result[0].firstname
                });


                return;
            }
        }
        else {

            const loginPasswordMatch = await bcrypt.compare(passwordType, result[0].passwords);

            if (loginPasswordMatch) {
                console.log("Login successfully...");
                Useremail = result[0].email;
                UserName = result[0].firstname;
                loginTrue = true;
                res.render("profile", {
                    Login: result[0].firstname
                });


                return;
            }

            console.log("!!!!!!Login error!!!!");
            res.redirect('/login');

        }
    });

});

app.get('/getAll', (req, res) => {

    connection.query(`SELECT imageAddress,emailId,ItemName,ItemPrice,ItemQuantity FROM UserCartDetail4 where emailId="${Useremail}"`, function (err, result, fields) {
        if (err) throw err;
        var orderName = [];
        var orderPrice = [];
        var orderQuantity = [];
        var orderImages = [];
        var j = 0;
        for (let i = 0; i < result.length; i++) {
            orderImages[j] = result[i].imageAddress;
            orderName[j] = result[i].ItemName;
            orderPrice[j] = result[i].ItemPrice;
            orderQuantity[j] = result[i].ItemQuantity;
            j++;

        }

        res.json({
            orderImage: orderImages,
            orderEmail: Useremail,
            orderName: orderName,
            orderPrice: orderPrice,
            orderQuantity: orderQuantity
        })

    })
});
app.get('/getAllorder', (req, res) => {

    connection.query(`SELECT product_image,email,product_name,product_price,status,order_date FROM orderHistory4 where email="${Useremail}"`, function (err, result, fields) {
        if (err) throw err;
        var orderName = [];
        var orderPrice = [];
        var orderStatus = [];
        var orderImages = [];
        var order_date = [];
        var j = 0;
        for (let i = 0; i < result.length; i++) {
            orderImages[j] = result[i].product_image;
            orderName[j] = result[i].product_name;
            orderPrice[j] = result[i].product_price;
            orderStatus[j] = result[i].status;
            order_date[j] = result[i].order_date;
            j++;

        }

        res.json({
            orderImage: orderImages,
            orderEmail: Useremail,
            orderName: orderName,
            orderPrice: orderPrice,
            orderStatus: orderStatus,
            order_date: order_date
        })

    })
});
app.get('/getAllmenuList', (req, res) => {

    connection.query(`SELECT product_image,product_name,product_price,product_type,product_details,product_offers FROM addProduct `, function (err, result, fields) {
        if (err) throw err;
        var MenuPhoto = [];
        var MenuName = [];
        var MenuPrice = [];
        var MenuType = [];
        var MenuDetail = [];
        var MenuOffer = [];
        var j = 0;
        for (let i = 0; i < result.length; i++) {
            MenuPhoto[j] = result[i].product_image;
            MenuName[j] = result[i].product_name;
            MenuPrice[j] = result[i].product_price;
            MenuType[j] = result[i].product_type;
            MenuDetail[j] = result[i].product_details;
            MenuOffer[j] = result[i].product_offers;
            j++;

        }

        res.json({
            MenuPhoto: MenuPhoto,
            MenuName: MenuName,
            MenuPrice: MenuPrice,
            MenuType: MenuType,
            MenuDetail: MenuDetail,
            MenuOffer: MenuOffer
        })

    })
});

app.get('/getAllUserDetail', (req, res) => {
    if (Useremail != "")
        connection.query(`SELECT firstname,lastname,email,mobile,address,passwords FROM register_user_detail4 where email="${Useremail}"`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json({
                name: result[0].firstname + " " + result[0].lastname,
                email: result[0].email,
                mobile: result[0].mobile,
                address: result[0].address,
                passwords: result[0].passwords
            })

        })
});

app.post("/getallUpdate", (req, res) => {

    if (Useremail != "") {
        var sql = `UPDATE UserCartDetail4  SET ItemQuantity =${req.body.ItemQuantity1}  WHERE emailId = "${Useremail}" and ItemName="${req.body.ItemName1}"`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    }
});



app.post("/DeleteItem", (req, res) => {


    var sql = `DELETE addProduct  FROM   addProduct WHERE product_name="${req.body.ItemName3}" and product_details="${req.body.ItemDetails}"`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });

});


app.post("/quantZero", (req, res) => {

    if (Useremail != "") {
        var sql = `DELETE   FROM   UserCartDetail4 WHERE emailId = "${Useremail}" and ItemName="${req.body.ItemName3}"`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    }
});



app.get("/register", (req, res) => {
    res.render("register");
})
app.post("/UserDetail", encoder, async (req, res) => {
    const userFullName = req.body.profile_name;
    const userAddress = req.body.profile_address;
    const userPhoneNo = req.body.profile_mobile;
    const UserNewPassword = req.body.profile_pass;

    console.log(userFullName, userAddress, userPhoneNo, UserNewPassword)
    if (userFullName == "" || userAddress == "" || userPhoneNo == "" || UserNewPassword == "" || userPhoneNo.length < 10) {
        alert("Invalid DetailUser....");
        app.get('/invalid', (req, res) => {
            res.json({
                'invalid': true
            });
        });

    }
    else {
        // const passwordHashNew = await bcrypt.hash(UserNewPassword, 10);
        var sql = `UPDATE register_user_detail4  SET firstname ="${userFullName.split(" ")[0]}",lastname="${userFullName.split(" ")[1]}",mobile=${userPhoneNo},address="${userAddress}",passwords="${UserNewPassword}"  WHERE email = "${Useremail}"`

        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }
    res.redirect("profile_about");
})
app.post('/addProductList', encoder, async (req, res) => {
    const ItemImage = req.body.photofile;
    const ItemName = req.body.item_Name;
    const ItemPrice = req.body.item_price1;
    const ItemType = req.body.item_type;
    const ItemDetail = req.body.item_info;
    const ItemOffer = req.body.item_offers;
    console.log(ItemImage, ItemName, ItemPrice, ItemType, ItemDetail, ItemOffer);

    var sql2 = "INSERT INTO addProduct (product_image,product_name,product_price,product_type,product_details,product_offers) VALUES ('" + ItemImage + "','" + ItemName + "','" + ItemPrice + "','" + ItemType + "','" + ItemDetail + "','" + ItemOffer + "')";
    connection.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });


    res.redirect("addProduct");


})
app.post("/register", encoder, async (req, res) => {
    // console.log(req.body);
    const name1 = req.body.firstName;
    const name2 = req.body.lastName;
    const emailID = req.body.email;
    const Mob = req.body.phone;
    const age = req.body.age;
    const add = req.body.address;
    const pass1 = req.body.userPassword;
    const pass2 = req.body.userConfirmPassword;
    console.log(Mob);

    if (name1 == "" || name2 == "" || emailID == "" || Mob == "" || age == "" || add == "" || pass1 == "" || pass2 == "" || Mob.length < 10) {
        alert("Invalid Register....");
        app.get('/invalid', (req, res) => {
            res.json({
                'invalid': true
            });
        });
        res.redirect("register");


    }
    else {
        connection.query(`SELECT * FROM register_user_detail4 WHERE email="${emailID}"`, async function (err, result, fields) {

            if (result.length != 0) {
                alert("Email already register....");



                res.redirect("/register");

            }
            else {
                const passwordHash = await bcrypt.hash(pass1, 10);
                const passwordMatch = await bcrypt.compare(pass2, passwordHash);



                if (passwordMatch) {

                    var sql = "INSERT INTO register_user_detail4 (firstname,lastname,email,mobile,age,address,passwords) VALUES ('" + name1 + "','" + name2 + "','" + emailID + "','" + Mob + "','" + age + "','" + add + "','" + passwordHash + "')";

                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    });
                }
                else {
                    res.redirect('/register');
                    console.log("Password not match");
                }
            }
        });
        res.redirect("login");

    }


})

app.post("/gautam", (req, res) => {

    if (Useremail != "") {
        var sql2 = "INSERT INTO UserCartDetail4 (imageAddress,emailId,ItemName,ItemPrice,ItemQuantity) VALUES ('" + req.body.ItemImage + "','" + Useremail + "','" + req.body.ItemName + "','" + req.body.ItemPrice + "','" + req.body.ItemQuantity + "')";
        connection.query(sql2, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    }

});



app.get("/", (req, res) => {

    res.render("index");
})
// Payment

const razorpay = new Razorpay({
    key_id: 'rzp_test_B3567CqLKpvfoZ',
    key_secret: 'uB6dqlOwpUIxsT4BVOH8kVzd'
})

app.post('/order', (req, res) => {
    var totalPrice = 0;
    if (Useremail != "") {
        connection.query(`SELECT imageAddress,emailId,ItemName,ItemPrice,ItemQuantity FROM UserCartDetail4 WHERE emailId = "${Useremail}"`, function (err, result, fields) {
            if (err) throw err;

            for (let amt = 0; amt < result.length; amt++) {
                totalPrice += 1.05 * (result[amt].ItemPrice * result[amt].ItemQuantity);
            }


            let options = {
                amount: totalPrice * 100,
                currency: "INR",
            };
            razorpay.orders.create(options, function (err, order) {

                res.json(order);
            });
        });
    }


});

app.post('/is-order_completed', (req, res) => {


    razorpay.payments.fetch(req.body.razorpay_payment_id).then((payemntDocument) => {

        if (payemntDocument.status == 'captured') {
            res.send("Payment succsess");
            connection.query(`SELECT address ,mobile FROM register_user_detail4 WHERE email = "${Useremail}"`, function (err, Userresult, fields) {

                if (err) throw err;


                var sql = `DELETE   FROM   UserCartDetail4 WHERE emailId = "${Useremail}"`;
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result.affectedRows + " record(s) updated");
                });
            });

            connection.query(`SELECT imageAddress ,ItemName,ItemPrice FROM UserCartDetail4 WHERE emailId = "${Useremail}"`, function (err, result, fields) {
                console.log(result);
                for (let i = 0; i < result.length; i++) {
                    var sql3 = "INSERT INTO orderHistory4 (email,product_image,product_name,product_price,status,order_date) VALUES ('" + Useremail + "','" + result[i].imageAddress + "','" + result[i].ItemName + "','" + result[i].ItemPrice + "','" + "Pending" + "','" + Date() + "')";
                    connection.query(sql3, function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    });
                }
            });

            connection.query(`SELECT ItemName,ItemPrice,ItemQuantity,mobile,address FROM UserCartDetail4,register_user_detail4 WHERE UserCartDetail4.emailId = "${Useremail}" and register_user_detail4.email = "${Useremail}"`, function (err, result, fields) {
                console.log("resultOreder----  ",result);
                for (let i = 0; i < result.length; i++) {
                    
                    var sql3 = "INSERT INTO OrderDetails2 (emailId,payment_id,itemList,itemQuantity,UserPhone,itemPrice,userAddress) VALUES ('" + Useremail+  "','" + req.body.razorpay_payment_id + "','" + result[i].ItemName + "','" + result[i].ItemQuantity + "','" + result[i].mobile + "','" + result[i].ItemPrice+ "','" + result[i].address + "')";
                    connection.query(sql3, function (err, result) {
                        if (err) throw err;
                        console.log("Number of records inserted: " + result.affectedRows);
                    });
                }
            });
            app.get('/getAllOrderList', (req, res) => {

                connection.query(`SELECT payment_id,itemList,itemQuantity,UserPhone,itemPrice,userAddress,OrderStatus FROM OrderDetails2 `, function (err, resultO, fields) {
                    if (err) throw err;
                    var itemList = [];
                    var itemPrice = [];
                    var itemQuantity = [];
                    var paymentID=[],UserPhone=[],userAddress=[],orderStatus=[];
                    var j = 0;
                    console.log(resultO.length);
                    for (let i = 0; i < resultO.length; i++) {
                        
                        itemList[j] = resultO[i].itemList;
                        itemPrice[j] = resultO[i].itemPrice;
                        itemQuantity[j] = resultO[i].itemQuantity;
                        paymentID[j]=resultO[i].payment_id;
                        UserPhone[j]=resultO[i].UserPhone;
                        userAddress[j]=resultO[i].userAddress;
                        orderStatus[j]=resultO[i].OrderStatus;                       
                        j++;
            
                    }
            
                    res.json({
                        paymentID: paymentID,
                        orderEmail: Useremail,
                        itemList: itemList,
                        itemPrice: itemPrice,
                        itemQuantity: itemQuantity,
                        UserPhone:UserPhone,
                        userAddress:userAddress,
                        orderStatus:orderStatus

                    })
            
                })
            });

        }

        else
            res.send("Failed");
    })
})




app.listen(port, () => {
    console.log("Running......");
})




// https://razorpay.com/docs/payment-gateway/web-integration/standard/