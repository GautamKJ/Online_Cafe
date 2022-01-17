use  Group12Project;

create table orderHistory4(
email varchar(50) ,
product_image varchar(100),
product_name  varchar(100),
product_price int,
status varchar(20),
order_date varchar(100),
constraint emp_pk primary key(email,order_date,product_name)
);


select * from orderHistory4;