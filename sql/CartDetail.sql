use  Group12Project;

create table  UserCartDetail4(
    imageAddress varchar(90),
	emailId varchar(50) Not null ,
    ItemName varchar(70),
    ItemPrice int,
    ItemQuantity int,
    constraint emp_pk primary key(emailId,ItemName)
);

select * from UserCartDetail4;