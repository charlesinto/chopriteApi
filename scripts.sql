CREATE TABLE IF NOT EXISTS BASE_ITEM(itemid SERIAL, itemame varchar(100),
imagepath varchar(500), brandname varchar(100),  cost integer,category varchar(50), datecreated timestamp);

INSERT INTO BASE_ITEM(brandname,itemame,imagepath,cost,category, datecreated)
values
('birds','custard', '/asset/Images/birds_custard_1.jpg', 200,'men', NOW()),
('melody','bread', '/asset/Images/bread_1.jpg', 150,'men', NOW()),
('peak','milk', '/asset/Images/daily_pure_milk_1.jpg', 200,'men', NOW()),
('keleops','cereals', '/asset/Images/loop_cereals_1.jpg', 200,'men', NOW()),
('olgy','pampers', '/asset/Images/pampers_1.jpg', 200,'men', NOW()),
('philips','beard trimmer', '/asset/Images/philips_beard_trimmer.jpg', 200,'men', NOW()),
('gucci','sweater', '/asset/Images/sweater_for_women_1.jpg', 200,'men', NOW()),
('kelogen','toilet paper', '/asset/Images/toilet_paper_1.jpg', 200,'men', NOW()),
('colgate','tooth paste', '/asset/Images/toothpaste_1.jpg', 200,'men', NOW()),
('viva','coconut oil', '/asset/Images/viva_coconut_oil_1.jpg', 200,'men', NOW());

UPDATE BASE_ITEM
SET imagepath = '/asset/Images/philips_beard_trimmer_1.jpg' where itemid = 6;