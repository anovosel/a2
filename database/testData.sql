-- =================================== USER TYPE STUDENT =============================================
INSERT INTO
  "userType" (id, name, "createdAt", "updatedAt")
VALUES (1, 'student', current_timestamp, current_timestamp);

-- -- =================================== USER TYPE TEACHER =============================================
INSERT INTO
  "userType" (id, name, "createdAt", "updatedAt")
VALUES (2, 'teacher', current_timestamp, current_timestamp);


-- -- =================================== STUDENTS =============================================

INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (1, 'pero', 'pero', 'Pero', 'Perić', current_timestamp, current_timestamp, 1);
INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (2, 'miro', 'miro', 'Miro', 'Mirić', current_timestamp, current_timestamp, 1);
INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (3, 'jure', 'jure', 'Jure', 'Jurić', current_timestamp, current_timestamp, 1);
INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (4, 'marko', 'marko', 'Marko', 'Markić', current_timestamp, current_timestamp, 1);
INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (5, 'ivo', 'ivo', 'Ivo', 'Ivić', current_timestamp, current_timestamp, 1);


-- -- =================================== TEACHERS =============================================

INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (6, 'teacher1', 'teacher1', 'Jakov', 'Profesor', current_timestamp, current_timestamp, 2);

INSERT INTO
  "user" (id, "username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES (7, 'teacher2', 'teacher2', 'Branko', 'Ivanković', current_timestamp, current_timestamp, 2);

-- -- =================================== ACADEMIC YEARS =============================================

INSERT INTO
  "academicYear" (id, "title", "dateStart", "dateEnd", "createdAt", "updatedAt")
VALUES (3, '2013/2014', current_timestamp, current_timestamp, current_timestamp, current_timestamp);

INSERT INTO
  "academicYear" (id, "title", "dateStart", "dateEnd", "createdAt", "updatedAt")
VALUES (4, '2014/2015', current_timestamp, current_timestamp, current_timestamp, current_timestamp);

-- -- =================================== HIERARCHY NODE TYPES =============================================
INSERT INTO
  "hierarchyNodeType" (id, "typeName", "createdAt", "updatedAt")
VALUES (1, 'modul', current_timestamp, current_timestamp);

INSERT INTO
  "hierarchyNodeType" (id, "typeName", "createdAt", "updatedAt")
VALUES (2, 'cjelina', current_timestamp, current_timestamp);

--
-- -- =================================== HIERARCHY NODES ON COURSE AND ACADEMIC YEAR =============================================
--
-- -- =================================== HIERARCHY NODES root pipi15 with questions =============================================
-- -- hierarchy nodes PIPI2015
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
VALUES ('root', 'root node', current_timestamp, current_timestamp, NULL, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Naredba za grananje je: ', current_timestamp, current_timestamp, 1, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('if', TRUE, current_timestamp, current_timestamp, 1, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('while', FALSE, current_timestamp, current_timestamp, 1, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('for', FALSE, current_timestamp, current_timestamp, 1, 3);

INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Cjelobrojni tip podatka je:', current_timestamp, current_timestamp, 1, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('int', TRUE, current_timestamp, current_timestamp, 2, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('float', FALSE, current_timestamp, current_timestamp, 2, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('bool', FALSE, current_timestamp, current_timestamp, 2, 3);

INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Tekst se pohranjuje u tip podatka', current_timestamp, current_timestamp, 1, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('Char *', TRUE, current_timestamp, current_timestamp, 3, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('Char []', FALSE, current_timestamp, current_timestamp, 3, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('String', FALSE, current_timestamp, current_timestamp, 3, 3);

-- -- =================================== HIERARCHY NODES 1. ciklus pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
VALUES ('1. ciklus', 'pitanja za 1. ciklus predavanja', current_timestamp, current_timestamp, 1, 2);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravne for petlje', current_timestamp, current_timestamp, 2, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('for(int i=0; i<MAX; i+=1){}', TRUE, current_timestamp, current_timestamp, 4, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('for(i=0; ; i++)[]', FALSE, current_timestamp, current_timestamp, 4, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('for(int i=10; i>0; i--){}', TRUE, current_timestamp, current_timestamp, 4, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu if naredbu', current_timestamp, current_timestamp, 2, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('if(a) then [printf("%s, je istina", a);]', FALSE , current_timestamp, current_timestamp, 5, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('if(true) {} else {printf("uvijek se ispisem")}', FALSE, current_timestamp, current_timestamp, 5, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('if(condition) {/*condition == true*/} else {/*condition == false*/}', TRUE, current_timestamp, current_timestamp, 5, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Koja naredba daje rezultat koji je decimalni broj?', current_timestamp, current_timestamp, 2, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('4./5', TRUE, current_timestamp, current_timestamp, 6, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('4/5', FALSE, current_timestamp, current_timestamp, 6, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('4/5.', TRUE, current_timestamp, current_timestamp, 6, 3);


-- -- =================================== HIERARCHY NODES 2. ciklus pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
VALUES ('2. ciklus', 'pitanja za 2. ciklus predavanja', current_timestamp, current_timestamp, 1, 2);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Citanje iz datoteke se obavlja naredbom:', current_timestamp, current_timestamp, 3, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('readDir("path/to/dir/file")', FALSE, current_timestamp, current_timestamp, 7, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('fscnaf', TRUE, current_timestamp, current_timestamp, 7, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('scanf', TRUE, current_timestamp, current_timestamp, 7, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Pokazivac na znakovni tip je:', current_timestamp, current_timestamp, 3, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('Char *', TRUE, current_timestamp, current_timestamp, 8, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('*Char', FALSE, current_timestamp, current_timestamp, 8, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('&Char', FALSE, current_timestamp, current_timestamp, 8, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('"univerzalni" pokazivac je:', current_timestamp, current_timestamp, 3, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('void *', TRUE, current_timestamp, current_timestamp, 9, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('string *', FALSE, current_timestamp, current_timestamp, 9, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('*universal', FALSE, current_timestamp, current_timestamp, 9, 3);


-- -- =================================== HIERARCHY NODES baze root with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
VALUES ('root', 'root baze podataka', current_timestamp, current_timestamp, NULL , 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu SELECT naredbu', current_timestamp, current_timestamp, 4, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;'
  , TRUE, current_timestamp, current_timestamp, 10, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders INNER JOIN Customers WITH Orders ON Orders.CustomerID=Customers.CustomerID;'
  , FALSE, current_timestamp, current_timestamp, 10, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate FROM Orders INNER JOIN Customers WITH Orders HAVING Orders.CustomerID=Customers.CustomerID;'
  , FALSE, current_timestamp, current_timestamp, 10, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu SELECT naredbu', current_timestamp, current_timestamp, 4, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders FROM (Orders INNER JOIN Employees ON Orders.EmployeeID=Employees.EmployeeID) GROUP BY LastName HAVING COUNT(Orders.OrderID) > 10;'
  , TRUE, current_timestamp, current_timestamp, 11, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('GROUP BY LastName HAVING COUNT(Orders.OrderID) > 10 SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders FROM (Orders INNER JOIN Employees ON Orders.EmployeeID=Employees.EmployeeID);'
  , FALSE, current_timestamp, current_timestamp, 11, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Employees.LastName, COUNT(Orders.OrderID) AS NumberOfOrders FROM (Orders INNER JOIN Employees ON Orders.EmployeeID=Employees.EmployeeID) HAVING COUNT(Orders.OrderID) > 10 GROUP BY LastName;'
  , FALSE, current_timestamp, current_timestamp, 11, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu SELECT naredbu', current_timestamp, current_timestamp, 4, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Shippers.ShipperName,COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders LEFT JOIN Shippers ON Orders.ShipperID=Shippers.ShipperID GROUP BY ShipperName'
  , TRUE, current_timestamp, current_timestamp, 12, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT Shippers.ShipperName,COUNT(Orders.OrderID) AS NumberOfOrders FROM GROUP BY ShipperName Orders LEFT JOIN Shippers ON Orders.ShipperID=Shippers.ShipperID'
  , FALSE, current_timestamp, current_timestamp, 12, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('GROUP BY ShipperName SELECT Shippers.ShipperName,COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders LEFT JOIN Shippers ON Orders.ShipperID=Shippers.ShipperID'
  , FALSE, current_timestamp, current_timestamp, 12, 3);


-- SQL QUESTIONS
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Dohvatite sve predmete (course) koji u kratici(acronym) imaju slovo P',
        'SELECT * FROM course WHERE acronym LIKE ''%p%''',
        NULL ,
        NULL ,
        false, false, true, current_timestamp, current_timestamp, 4, 7, 7, NULL);
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Promijenite svim predmetima (course) ciji id je veci od 2 url u www.fer.unizg.hr',
        'UPDATE course SET url=''www.fer.unizg.hr'' WHERE id>2',
        NULL ,
        'SELECT url FROM course',
        false, false, true, current_timestamp, current_timestamp, 4, 7, 7, NULL);
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Dodajete predmetu (course) atribut prosjecna_ocjena tipa TEXT',
        'ALTER TABLE course ADD prosjecna_ocjena TEXT',
        'UPDATE course SET prosjecna_ocjena=''nepoznata'' WHERE 1=1',
        'SELECT prosjecna_ocjena FROM course',
        false, false, true, current_timestamp, current_timestamp, 4, 7, 7, NULL);

-- -- =================================== HIERARCHY NODES baze prvi ciklus with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
VALUES ('1. ciklus', '1. ciklus pitanja', current_timestamp, current_timestamp, 4, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu UPDATE naredbu', current_timestamp, current_timestamp, 5, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT "id", "username", "password", "firstName", "lastName", "token", "createdAt", "updatedAt", "userTypeId" FROM "user" AS "user" WHERE "user"."id" = 7;'
  , TRUE, current_timestamp, current_timestamp, 13, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SELECT "id", "username", "password", "firstName", "lastName", "token", "createdAt", "updatedAt", "userTypeId" WHERE "user"."id" = 7 FROM "user" AS "user";'
  , FALSE, current_timestamp, current_timestamp, 13, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('WHERE "user"."id" = 7 FROM "user" AS "user" SELECT "id", "username", "password", "firstName", "lastName", "token", "createdAt", "updatedAt", "userTypeId";'
  , FALSE, current_timestamp, current_timestamp, 13, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu UPDATE naredbu', current_timestamp, current_timestamp, 5, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('UPDATE user SET token=''123'',updatedAt=''2015-07-09 00:36:45.862 +00:00'' WHERE id = 5'
  , TRUE, current_timestamp, current_timestamp, 14, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SET token=''123'',updatedAt=''2015-07-09 00:36:45.862 +00:00'' UPDATE user WHERE id = 5'
  , FALSE, current_timestamp, current_timestamp, 14, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('UPDATE user WHERE id = 5 SET token=''123'',updatedAt=''2015-07-09 00:36:45.862 +00:00'''
  , FALSE, current_timestamp, current_timestamp, 14, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu UPDATE naredbu', current_timestamp, current_timestamp, 5, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('UPDATE testInstanceQuestion SET selectedAnswers=''3'',correctlyAnswered=true,updatedAt=''2015-07-09 00:37:26.766 +00:00'' WHERE id = 29'
  , TRUE, current_timestamp, current_timestamp, 15, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('SET selectedAnswers=''3'',correctlyAnswered=true,updatedAt=''2015-07-09 00:37:26.766 +00:00'' WHERE id = 29 UPDATE testInstanceQuestion'
  , FALSE, current_timestamp, current_timestamp, 15, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('UPDATE testInstanceQuestion WHERE id = 29 SET selectedAnswers=''3'',correctlyAnswered=true,updatedAt=''2015-07-09 00:37:26.766 +00:00'''
  , FALSE, current_timestamp, current_timestamp, 15, 3);

-- SQL QUESTIONS
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Dohvatite sve predmete (course) koji u kratici(acronym) imaju slovo P',
        'SELECT * FROM course WHERE acronym LIKE ''%p%''',
        NULL ,
        NULL ,
        false, false, true, current_timestamp, current_timestamp, 5, 7, 7, NULL);
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Promitenite svim predmetima (course) ciji id je veci od 2 url u www.fer.unizg.hr',
        'UPDATE course SET url=''www.fer.unizg.hr'' WHERE id>2',
        NULL ,
        'SELECT url FROM course',
        false, false, true, current_timestamp, current_timestamp, 5, 7, 7, NULL);
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Dodajete predmetu (course) atribut prosjecna_ocjena tipa TEXT',
        'ALTER TABLE course ADD prosjecna_ocjena TEXT',
        'UPDATE course SET prosjecna_ocjena=''nepoznata'' WHERE 1=1',
        'SELECT prosjecna_ocjena FROM course',
        false, false, true, current_timestamp, current_timestamp, 5, 7, 7, NULL);


-- -- =================================== HIERARCHY NODES baze 2. ciklus with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
VALUES ('2. ciklus', '2. ciklus pitanja', current_timestamp, current_timestamp, 4, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu ALTER TABLE naredbu', current_timestamp, current_timestamp, 6, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('ALTER TABLE Persons ADD DateOfBirth date', TRUE, current_timestamp, current_timestamp, 16, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('ALTER TABLE Persons ADD date  DateOfBirth ', FALSE, current_timestamp, current_timestamp, 16, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('ALTER TABLE ADD DateOfBirth date TO Persons', FALSE, current_timestamp, current_timestamp, 16, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu DELETE naredbu', current_timestamp, current_timestamp, 6, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('DELETE FROM user WHERE id=8', TRUE, current_timestamp, current_timestamp, 17, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('FROM user DELETE *', FALSE, current_timestamp, current_timestamp, 17, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('DELETE id FROM user', FALSE, current_timestamp, current_timestamp, 17, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Oznacite ispravnu INSERT naredbu', current_timestamp, current_timestamp, 6, 3, 7, 7, NULL);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES (''Cardinal'',''Tom B. Erichsen'',''Skagen 21'',''Stavanger'',''4006'',''Norway'')'
  , TRUE, current_timestamp, current_timestamp, 18, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) INSERT VALUES (''Cardinal'',''Tom B. Erichsen'',''Skagen 21'',''Stavanger'',''4006'',''Norway'')'
, FALSE, current_timestamp, current_timestamp, 18, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('INSERT INTO Customers VALUES (''Cardinal'')', FALSE, current_timestamp, current_timestamp, 18, 3);

-- SQL QUESTIONS
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Dohvatite sve predmete (course) koji u kratici(acronym) imaju slovo P',
        'SELECT * FROM course WHERE acronym LIKE ''%p%''',
        NULL ,
        NULL ,
        false, false, true, current_timestamp, current_timestamp, 6, 7, 7, NULL);
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Promitenite svim predmetima (course) ciji id je veci od 2 url u www.fer.unizg.hr',
        'UPDATE course SET url=''www.fer.unizg.hr'' WHERE id>2',
        NULL ,
        'SELECT url FROM course',
        false, false, true, current_timestamp, current_timestamp, 6, 7, 7, NULL);
INSERT INTO "questionSQL" (text, "correctSql", "preCheckSql", "checkSql", "columnOrder", "resultOrder", "showResult", "createdAt", "updatedAt", "hierarchyNodeId", "createdById", "lastEditedById", "previousQuestionId")
VALUES ('Dodajete predmetu (course) atribut prosjecna_ocjena tipa TEXT',
        'ALTER TABLE course ADD prosjecna_ocjena TEXT',
        'UPDATE course SET prosjecna_ocjena=''nepoznata'' WHERE 1=1',
        'SELECT prosjecna_ocjena FROM course',
        false, false, true, current_timestamp, current_timestamp, 6, 7, 7, NULL);


-- -- -- =================================== HIERARCHY NODES g pipi15 with questions =============================================
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('g', 'id 7', current_timestamp, current_timestamp, 6, 1);
-- -- questions
-- INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
-- VALUES ('id 19', current_timestamp, current_timestamp, 7, 3);
-- -- answers
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 19, 1);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 19, 2);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 19, 3);
--
-- -- questions
-- INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
-- VALUES ('id 20', current_timestamp, current_timestamp, 7, 3);
-- -- answers
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 20, 1);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 20, 2);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 20, 3);
--
-- -- questions
-- INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
-- VALUES ('id 21', current_timestamp, current_timestamp, 7, 3);
-- -- answers
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 21, 1);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 21, 2);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
-- VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 21, 3);
--
--
-- --hierarchy nodes ASP2015
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('a', 'id 8', current_timestamp, current_timestamp, NULL, 1);
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('b', 'id 9', current_timestamp, current_timestamp, 8, 1);
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('c', 'id 10', current_timestamp, current_timestamp, 9, 1);
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('d', 'id 11', current_timestamp, current_timestamp, 8, 1);
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('e', 'id 12', current_timestamp, current_timestamp, 11, 1);
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('f', 'id 13', current_timestamp, current_timestamp, 11, 1);
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId")
-- VALUES ('g', 'id 14', current_timestamp, current_timestamp, 13, 1);
--
--
-- -- =================================== COURSES =============================================

INSERT INTO
  "course" (id, "name", "acronym", "rootHierarchyNodeId", "createdAt", "updatedAt") -- rootHierarchyNode = 1
VALUES (1, 'Programiranje i programsko inzenjerstvo', 'PIPI', 1, current_timestamp, current_timestamp);
INSERT INTO
  "course" (id, "name", "acronym", "rootHierarchyNodeId", "createdAt", "updatedAt") -- rootHierarchyNode = 8
VALUES (2, 'Baze podataka', 'BazePod', 4, current_timestamp, current_timestamp);

-- =================================== Courses, academic years and rootHN =============================================
INSERT INTO
  "academicYearCourse" ("courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (1, 4, current_timestamp, current_timestamp);

INSERT INTO
  "academicYearCourse" ("courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (2, 4, current_timestamp, current_timestamp);


--  =================================== Courses in academic years per user =============================================



INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (1, 1, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (2, 1, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (3, 1, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (4, 1, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (5, 1, 4, current_timestamp, current_timestamp);

INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (1, 2, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (2, 2, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (3, 2, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (4, 2, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (5, 2, 4, current_timestamp, current_timestamp);

INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (6, 2, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (6, 1, 4, current_timestamp, current_timestamp);

INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (7, 1, 4, current_timestamp, current_timestamp);
INSERT INTO
  "userCourse" ("userId", "courseId", "academicYearId", "createdAt", "updatedAt")
VALUES (7, 2, 4, current_timestamp, current_timestamp);