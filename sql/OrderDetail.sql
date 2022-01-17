use group12project;

create Table OrderDetails2(
emailId varchar(100) ,
payment_id varchar(50) ,
itemList varchar(100),
itemQuantity int,
itemPrice float,
UserPhone long,
userAddress varchar(200),
OrderStatus varchar (40),
constraint emp_pk primary key(payment_id,itemList)
);
select * from OrderDetails2;

