let dish_image = document.querySelectorAll(".dish-img");
const close = document.querySelectorAll('.close-btn');
const cart = document.querySelectorAll('.cart-orderlist');
const cartItem = document.querySelector('#cart_items');
const camera = document.querySelectorAll('.fa-camera-retro');
const addcart = document.querySelectorAll('.fa-cart-plus');
const success = document.querySelector('.success');
const danger = document.querySelector('.danger');
//declearing html elements
const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

//if user hover on img div 
if (imgDiv != null) {
    imgDiv.addEventListener('mouseenter', function () {
        uploadBtn.style.display = "block";
    });

    //if we hover out from img div

    imgDiv.addEventListener('mouseleave', function () {
        uploadBtn.style.display = "none";
    });
}
if (file != null) {
    file.addEventListener('change', function () {
        //this refers to file
        console.log(this);
        const choosedFile = this.files[0];
        console.log(choosedFile)
        if (choosedFile) {

            const reader = new FileReader(); //FileReader is a predefined function of JS

            reader.addEventListener('load', function () {
                img.setAttribute('src', reader.result);
            });

            reader.readAsDataURL(choosedFile);


        }
    });
}

const imgDivItem = document.querySelector('.admin-pic-div');
const img1 = document.querySelector('#photo1');
const file1 = document.querySelector('#file1');
const uploadBtn1 = document.querySelector('#uploadBtn1');

//if user hover on img div 
if (imgDivItem != null) {
    imgDivItem.addEventListener('mouseenter', function () {
        uploadBtn1.style.display = "block";
    });

    //if we hover out from img div

    imgDivItem.addEventListener('mouseleave', function () {
        uploadBtn1.style.display = "none";
    });
}
if (file1 != null) {
    file1.addEventListener('change', function () {
        //this refers to file1
        console.log(this);
        const choosedFile = this.files[0];
        console.log(choosedFile)
        if (choosedFile) {

            const reader = new FileReader(); //FileReader is a predefined function of JS

            reader.addEventListener('load', function () {
                img1.setAttribute('src', reader.result);
            });

            reader.readAsDataURL(choosedFile);


        }
    });
}

// admin Menu page
const imgDivMenu = document.querySelectorAll('.admin-pic-menu');
const img2 = document.querySelectorAll('.photo2');
const file2 = document.querySelectorAll('#file2');
const uploadBtn2 = document.querySelectorAll('.uploadBtn2');
for (let i = 0; i < file2.length; i++) {
    console.log(file2[i].parentNode);
}
//if user hover on img div 
let menuList = 0;
for (menuList = 0; menuList < imgDivMenu.length; menuList++) {


    let imgMenu = imgDivMenu[menuList];

    let imageMenu = img2[menuList];
    let uploadPic = uploadBtn2[menuList];
    // console.log(imgMenu + "  " + MenuFileAdd + "  " + imageMenu)
    if (imgMenu != null) {
        imgMenu.addEventListener('mouseenter', function () {
            uploadPic.style.display = "block";
        });

        //if we hover out from img div

        imgMenu.addEventListener('mouseleave', function () {
            uploadPic.style.display = "none";
        });
    }
    //   /  console.log(imgMenu + "  " + MenuFileAdd + "  " + imageMenu)
    console.log(menuList + "\n");
    console.log(file2[menuList].parentNode + "\n")
    console.log(file2[1]);
    file2[0].addEventListener('change', (e) => {
        console.log(file2.parentNode);
    })
}

for (let cnt = 0; cnt < uploadBtn2.length; cnt++) {

    let MenuFileAdd = uploadBtn2[cnt];
    console.log(MenuFileAdd);
    MenuFileAdd.addEventListener('click', (e) => {
        console.log(uploadBtn2.length, cnt);
        console.log(MenuFileAdd.parentNode, uploadBtn2[cnt].parentNode);
        console.log(e.target.parentNode);

        for (let i = 0; i < uploadBtn2.length; i++) {

            if (uploadBtn2[i] == e.target) {
                console.log("i-->", i);
                console.log(e.target.parentNode);
                //this refers to MenuFileAdd
                console.log(file2[cnt].value);
                const choosedFile = file2[cnt].files[0];
                console.log(choosedFile)
                if (choosedFile) {

                    const reader = new FileReader(); //FileReader is a predefined function of JS

                    reader.addEventListener('load', function () {
                        console.log(menuList);
                        console.log("i-->", i);
                        img2[i].setAttribute('src', reader.result);
                    });

                    reader.readAsDataURL(choosedFile);


                }
            }
        }
    });
}


// ----------------------------------------------------------------
let i = 0;
// Menu image

for (i = 0; i < camera.length; i++) {
    let item = camera[i];

    item.addEventListener('click', (e) => {
        for (i = 0; i < camera.length; i++) {
            if (camera[i] == e.target) {

                dish_image[i].classList.add('dish-img-display');
                close[i].classList.add('dish-img-display');
            }

        }
    })
}
// Menu image close button
for (i = 0; i < close.length; i++) {

    let closebtn = close[i];
    closebtn.addEventListener("click", (e) => {

        for (i = 0; i < close.length; i++) {
            if (close[i] == e.target) {

                dish_image[i].classList.remove('dish-img-display');
                close[i].classList.remove('dish-img-display');
            }
        }
    })

}
let html = "";

//  Add Cart

for (i = 0; i < addcart.length; i++) {


    let addcartItem = addcart[i];
    addcartItem.addEventListener("click", (e) => {

        for (i = 0; i < addcart.length; i++) {

            if (addcart[i] == e.target) {


                let ItemImages = addcart[i].parentNode.parentNode.lastElementChild.childNodes[1].src;
                let menuName = addcart[i].parentNode.innerText.split('(');




                checkRepeat();
                async function checkRepeat() {

                    const api = "http://localhost:8000/getAll";

                    try {
                        let data = await fetch(api);
                        let orgdata = await data.json();
                        if (orgdata.orderEmail == "") {
                            // window.alert("You are not Login...");

                            return;
                        }
                        for (let k = 0; k < orgdata.orderName.length; k++) {

                            if (menuName[0] == orgdata.orderName[k]) {

                                danger.setAttribute("style", "display: block;");
                                setTimeout(() => {
                                    danger.setAttribute("style", "display: none;");
                                }, 2000);

                                return
                            }
                        }
                        let response = fetch('/gautam', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                ItemImage: ItemImages,
                                ItemName: menuName[0],
                                ItemPrice: menuName[1].split('₹)')[0],
                                ItemQuantity: 1
                            })
                        });


                        success.setAttribute("style", "display: block;");
                        setTimeout(() => {
                            success.setAttribute("style", "display: none;");
                        }, 2000);

                    }
                    catch (e) {
                        window.alert(e);
                        console.log(e);
                    }
                }

            }


        }
    });
}

// Cart Page
const bill = document.querySelector('.subFinalbill');
window.addEventListener('load', async () => {
    html = "";

    const api = "http://localhost:8000/getAll";

    try {
        let priceofItem;
        let NameofItem = "";
        let data = await fetch(api);
        let orgdata = await data.json();


        if (orgdata.orderEmail == "") {
            window.alert("You are not Login")

            html +=
                `<td class="cart-info cart-orderall">No Item is added yet.... </td>`
            cartItem.innerHTML += html;
            html = "";
            return;
        }
        else if (orgdata.orderName[0] == undefined) {

            html +=
                `<td class="cart-info cart-orderall">No Item is added yet.... </td>`
            cartItem.innerHTML += html;
            html = "";
            return;
        }
        else {

            for (let i = 0; i < orgdata.orderName.length; i++) {
                html += `
            <td class="cart-info cart-orderall"><img src=${orgdata.orderImage[i]} alt="drink">
        <div class="cart-detail">
            ${orgdata.orderName[i]}
            
        </div>
    </td>                                                                                 
    <td class="cart-orderall cart-quantity"><input type="number" name="quantity" id="quant" value="1"></td>
    
    <td class="cart-subtotal cart-orderall" id="itemtotalPrice">  ${orgdata.orderPrice[i]}</td> 
    
    `;

                cartItem.innerHTML += html;
                html = ""

            }
            const price = document.querySelectorAll('.eachPrice');
            const subTotal = document.querySelectorAll('#itemtotalPrice');
            for (let i = 0; i < orgdata.orderName.length; i++) {
                const quantity2 = document.querySelectorAll('#quant');

                quantity2[i].value = orgdata.orderQuantity[i];


                yourbill += orgdata.orderPrice[i] * orgdata.orderQuantity[i];
                subTotal[i].innerHTML = orgdata.orderPrice[i] * orgdata.orderQuantity[i];

            }
            bill.innerHTML = yourbill
            const quantity = document.querySelectorAll('#quant');
            const addItemMenu = document.querySelector('.mere');
            const tax = document.querySelector('.taxes');
            const total = document.querySelector('.grandTotal');

            // Work on quantity
            for (let q = 0; q < quantity.length; q++) {


                let quant = quantity[q];
                quant.addEventListener("change", (e) => {

                    let yourbill = 0;

                    for (q = 0; q < quantity.length; q++) {
                        if (quantity[q] == e.target) {

                            subTotal[q].innerText = orgdata.orderPrice[q] * quantity[q].value;
                            subTotal[q].innerHTML = subTotal[q].innerText;

                            if (quantity[q].value < 1) {
                                console.log(quantity[q].value)
                                try {
                                    let response3 = fetch('/quantZero', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json;charset=utf-8'
                                        },
                                        body: JSON.stringify({
                                            ItemName3: orgdata.orderName[q],

                                        })
                                    });

                                }
                                catch (e) {
                                    console.log(e);
                                }

                                (quantity[q].parentNode.parentNode.children[3 * q]).remove();
                                (quantity[q].parentNode.parentNode.children[3 * q + 1]).remove();
                                quantity[q].parentNode.remove();


                            }
                            else {
                                try {
                                    let response2 = fetch('/getallUpdate', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json;charset=utf-8',
                                        },
                                        body: JSON.stringify({
                                            ItemName1: orgdata.orderName[q],
                                            ItemQuantity1: quantity[q].value,

                                        })
                                    });
                                }
                                catch (e) {
                                    console.log(e);
                                }


                            }
                        }
                        yourbill += parseInt(subTotal[q].innerText);

                    }
                    // Bill 
                    bill.innerHTML = yourbill
                    let taxes = yourbill * .05;
                    tax.innerHTML = taxes;
                    total.innerHTML = yourbill + taxes;

                })
            }



            let taxes = Math.round(yourbill * .05);
            tax.innerHTML = (taxes);
            total.innerHTML = yourbill + taxes;

        }
    }

    catch (e) {
        console.log(e);
    }
})
// Profile About

const profile_detail = document.querySelector('.profile_detail');
console.log(profile_detail);
window.addEventListener('load', async () => {
    console.log("helo");
    let userDetail = "";
    const api1 = "http://localhost:8000/getAllUserDetail";

    try {
        let data1 = await fetch(api1);
        let orgdata1 = await data1.json();




        userDetail +=
            `  <label class="profile_abouts profile_name">Name: </label><input type="text" name="profile_name"
                id="profile.name" value="${orgdata1.name}">
            <label class="profile_abouts profile_address">Address:</label> <input type="text" name="profile_address"
                id="profile.name" value="${orgdata1.address}">
            <label class="profile_abouts profile_mobile">Mobile:</label> <input type="text" name="profile_mobile"
                id="profile.name" value="${orgdata1.mobile}">
            <label class="profile_abouts profile_email">Email: </label> <input type="email" name="profile_email"
                id="profile.email" value="${orgdata1.email}">
            <label class="profile_abouts profile_password">Password :</label> <input type="password" name="profile_pass"
                id="profile_password" value="${orgdata1.passwords}">

                <input type="submit" value="Save Change" class="save_change">


                `

        profile_detail.innerHTML = userDetail;
        userDetail = "";
        console.log(profile_detail);
    }
    catch (e) {
        console.log(e);

    }

})
const profile_order_summary = document.querySelector('.profile_order_summary');
window.addEventListener('load', async () => {
    orderhtml = "";

    const api = "http://localhost:8000/getAllorder";

    try {

        let data = await fetch(api);
        let orgdata = await data.json();


        console.log(orgdata);

        for (let i = 0; i < orgdata.orderName.length; i++) {
            orderhtml += `
            <td class="profile_order_detail"> <img src="${orgdata.orderImage[i]}" alt=""></td>
            <td class="profile_order_detail">${orgdata.orderName[i]}</td>
            <td class="profile_order_detail">${orgdata.orderPrice[i]}</td>
            <td class="profile_order_detail">${orgdata.orderStatus[i]}</td>
            <td class="profile_order_detail">${orgdata.order_date[i]}</td>
    `;

            profile_order_summary.innerHTML += orderhtml;
            orderhtml = ""

        }
    }
    catch (e) {
        console.log(e)
    }
});

// const morning = document.querySelector('.menu-list');
// console.log(morning);
// window.addEventListener('load', async () => {
//     orderhtml = "";

//     const api = "http://localhost:8000/getAllmenuList";
//     console.log("hello");
//     try {

//         let data = await fetch(api);
//         let orgdata = await data.json();




//         for (let i = 0; i < orgdata.MenuName.length; i++) {
//             orderhtml += `
//             <div class="menu-list">
//             <div class="morning">
//             <h1> ${orgdata.MenuType[i]} </h1>
//             <div class="cards">
//                 <h3>${orgdata.MenuName[i]} (${orgdata.MenuPrice[i]} ₹) <i class="fa fa-camera-retro" aria-hidden="true"></i> <i
//                         class="fa fa-cart-plus" aria-hidden="true" title="Add to Cart"></i>
//                 </h3>
//                 <p>${orgdata.MenuDetail[i]}</p>
//                 <div class="dish-img">

//                     <img src="photo/${orgdata.MenuPhoto[i]}" alt="BUTTERMILK PANCAKES" id="myImg">
//                     <span class="btn">
//                         <img src="photo/modal_close_icon.png" alt="" class="close-btn">
//                     </span>
//                 </div>
//             </div>
//             </div>
//     `;
//             console.log("--->", orderhtml);
//             morning.innerHTML += orderhtml;

//             orderhtml = ""

//         }
//     }
//     catch (e) {
//         console.log(e)
//     }
// });

// ADMIN MENU
const add_product_summary = document.querySelector('.add_product_summary1');
window.addEventListener('load', async () => {
    orderhtmlMenu = "";

    const api = "http://localhost:8000/getAllmenuList";
    console.log("hello");
    try {

        let data = await fetch(api);
        let orgdata = await data.json();




        for (let i = 0; i < orgdata.MenuName.length; i++) {
            orderhtmlMenu += `
            <td class="add_product_detail six">
            <div class="admin-pic-menu">
                <img src="photo/${orgdata.MenuPhoto[i]}" class="photo2">
                <input type="file" id="file2" name="DishPhoto">
                <label for="file2" class="uploadBtn2">Add</label>
            </div>
        </td>
        <td class="add_product_detail one"><input type="text" name="name" id="item_Name" size="7" placeholder="Name" value="${orgdata.MenuName[i]}"></td>
        <td class="add_product_detail two"><input type="text" name="price" id="item_price1"  size="1" placeholder="price" value="${orgdata.MenuPrice[i]}"></td>
        <td class="add_product_detail three"><input type="text" name="type" id="item_type" size="5" placeholder="type" value="${orgdata.MenuType[i]}"></td>
        <td class="add_product_detail four"><textarea name="details" id="item_info" cols="20" rows="5" placeholder="about" >${orgdata.MenuDetail[i]}</textarea></td>
        <td class="add_product_detail five"><input type="text" name="offer" id="item_offers" size="5" placeholder="offers" value="${orgdata.MenuOffer[i]}"><i class="fa fa-car fa-lg"></i></td>
        

        
    `;
            console.log("--->", orderhtmlMenu);
            add_product_summary.innerHTML += orderhtmlMenu;

            orderhtmlMenu = ""

        }
    }
    catch (e) {
        console.log(e)
    }
    const deleteItem = document.querySelectorAll('.fa-car');

    for (let i = 0; i < deleteItem.length; i++) {

        let delitem = deleteItem[i];
        const api1 = "http://localhost:8000/getAllmenuList";
        console.log("hello");
        try {

            let data3 = await fetch(api1);
            let orgdata3 = await data3.json();


            delitem.addEventListener('click', (e) => {
                for (i = 0; i < deleteItem.length; i++) {
                    if (deleteItem[i] == e.target) {
                        console.log(orgdata3.MenuName[i]);
                        console.log(orgdata3.MenuDetail[i]);
                        console.log(e.target.parentNode);

                        try {
                            let response3 = fetch('/DeleteItem', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8',
                                },
                                body: JSON.stringify({
                                    ItemName3: orgdata3.MenuName[i],
                                    ItemDetails: orgdata3.MenuDetail[i]

                                })
                            });
                            window.location.reload();
                        }
                        catch (e) {
                            console.log(e);
                        }

                    }

                }
            })
        }
        catch (e) { }
    }

});

const order_list = document.querySelector('.order_list');

window.addEventListener('load', async () => {
    orderhtmlList = "";

    const api = "http://localhost:8000/getAllOrderList";

    try {

        let data = await fetch(api);
        let orgdata = await data.json();




        for (let i = 0; i < orgdata.paymentID.length; i++) {
            orderhtmlList += `
            <td class="user_payment order_product_detail">${orgdata.paymentID[i]}</td>
            <td class="user_order order_product_detail">
                <li>${orgdata.itemList[i]} (X ${orgdata.itemQuantity[i]})</li><br><br>
            </td>
            <td class="user_call order_product_detail">${orgdata.UserPhone[i]}</td>
            <td class="user_address order_product_detail">${orgdata.userAddress[i]}</td>
            <td class="order_detail order_product_detail">
            <input type="radio" id="decline" name="${orgdata.paymentID[i]} ${orgdata.itemList[i]}" value="Decline">
            <label for="decline">Decline</label><br>
            <input type="radio" id="accept" name="${orgdata.paymentID[i]} ${orgdata.itemList[i]}" value="Accept">
            <label for="accept">Accept</label><br>
           
            <input type="radio" id="delivered" name="${orgdata.paymentID[i]} ${orgdata.itemList[i]}" value="Delivered">
            <label for="delivered">Delivered</label>
    `;
            console.log("--->", orderhtmlList);
            order_list.innerHTML += orderhtmlList;

            orderhtmlList = ""

        }
        for (let i = 0; i < orgdata.paymentID.length; i++) {
            let orderStatuse = document.querySelector(`input[name="${orgdata.paymentID[i]} ${orgdata.itemList[i]}"]`);
            console.log(orderStatuse)
            orderStatuse.addEventListener('click', () => {
                console.log("orderStatuse.value", orderStatuse.value)
            })

        }
    }
    catch (e) {
        console.log(e)
    }



});



let yourbill = 0;

// Payment
document.getElementById('rzp-button1').onclick = function (e) {

    axios.post('/order').then((info) => {

        let options = {
            "key": "rzp_test_B3567CqLKpvfoZ", // Enter the Key ID generated from the Dashboard
            "amount": info.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "CORNER BAKERY",
            "description": "Pay for your Order",
            "image": `C:\Users\gauta\OneDrive\Documents\NodeJS\Cafe\public\photo\transaction.jpg`,
            "order_id": info.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "/is-order_completed",
            "theme": {
                "color": "#3399cc"
            }
        };
        let rzp1 = new Razorpay(options);

        rzp1.open();
        e.preventDefault();

    });
}






