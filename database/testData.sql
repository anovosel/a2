-- =================================== USER TYPE STUDENT =============================================
INSERT INTO
  "userType" (name, "createdAt", "updatedAt")
VALUES ('student', current_timestamp, current_timestamp);

-- =================================== USER TYPE TEACHER =============================================
INSERT INTO
  "userType" (name, "createdAt", "updatedAt")
VALUES ('teacher', current_timestamp, current_timestamp);


-- =================================== STUDENTS =============================================

INSERT INTO
  "user" ("username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES ('student1', 'student1', 'Student1', 'Student-Prezime', current_timestamp, current_timestamp, 1);
INSERT INTO
  "user" ("username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES ('student2', 'student2', 'Student2', 'Student-Prezime', current_timestamp, current_timestamp, 1);
INSERT INTO
  "user" ("username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES ('student3', 'student3', 'Student3', 'Student-Prezime', current_timestamp, current_timestamp, 1);


-- =================================== TEACHERS =============================================

INSERT INTO
  "user" ("username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES ('teacher1', 'teacher1', 'Nastavnik1', 'Nastavnik-Prezime', current_timestamp, current_timestamp, 2);

INSERT INTO
  "user" ("username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES ('teacher2', 'teacher2', 'Nastavnik2', 'Nastavnik-Prezime', current_timestamp, current_timestamp, 2);

INSERT INTO
  "user" ("username", "password", "firstName", "lastName", "createdAt", "updatedAt", "userTypeId")
VALUES ('teacher3', 'teacher3', 'Nastavnik3', 'Nastavnik-Prezime', current_timestamp, current_timestamp, 2);


-- =================================== ACADEMIC YEARS =============================================

INSERT INTO
  "academicYear" ("title", "dateStart", "dateEnd", "createdAt", "updatedAt")
VALUES ('2014/2015', current_timestamp, current_timestamp, current_timestamp, current_timestamp);

INSERT INTO
  "academicYear" ("title", "dateStart", "dateEnd", "createdAt", "updatedAt")
VALUES ('2013/2014', current_timestamp, current_timestamp, current_timestamp, current_timestamp);

INSERT INTO
  "academicYear" ("title", "dateStart", "dateEnd", "createdAt", "updatedAt")
VALUES ('2012/2013', current_timestamp, current_timestamp, current_timestamp, current_timestamp);


-- =================================== COURSES =============================================
INSERT INTO
  "course" ("name", "acronym", "createdAt", "updatedAt", "academicYearId", "rootHierarchyNodeId")
VALUES ('Programiranje i programsko inzenjerstvo', 'PIPI2015', current_timestamp, current_timestamp, 1, 1);
INSERT INTO
  "course" ("name", "acronym", "createdAt", "updatedAt", "academicYearId")
VALUES ('Programiranje i programsko inzenjerstvo', 'PIPI2014', current_timestamp, current_timestamp, 2);
INSERT INTO
  "course" ("name", "acronym", "createdAt", "updatedAt", "academicYearId")
VALUES ('Programiranje i programsko inzenjerstvo', 'PIPI2013', current_timestamp, current_timestamp, 3);

INSERT INTO
  "course" ("name", "acronym", "createdAt", "updatedAt", "academicYearId", "rootHierarchyNodeId")
VALUES ('Algoritmi i strukture podataka', 'ASP2015', current_timestamp, current_timestamp, 1, 8);
INSERT INTO
  "course" ("name", "acronym", "createdAt", "updatedAt", "academicYearId")
VALUES ('Algoritmi i strukture podataka', 'ASP2014', current_timestamp, current_timestamp, 2);
INSERT INTO
  "course" ("name", "acronym", "createdAt", "updatedAt", "academicYearId")
VALUES ('Algoritmi i strukture podataka', 'ASP2013', current_timestamp, current_timestamp, 3);


-- =================================== STUDENTS ON COURSE =============================================

-- student1 PIPI2014
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 2, 1);
-- student1 ASP2015
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 4, 1);


-- student2 PIPI2013
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 3, 2);
-- student1 PIPI2014
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 2, 2);
-- student1 PIPI2015
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 1, 2);

-- teacher 1 all courses

INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 3, 4);
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 2, 4);
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 1, 4);
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 4, 4);
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 5, 4);
INSERT INTO
  "userCourse" ("createdAt", "updatedAt", "courseId", "userId")
VALUES (current_timestamp, current_timestamp, 6, 4);

-- =================================== HIERARCHY NODE TYPES =============================================
INSERT INTO
  "hierarchyNodeType" ("typeName", "createdAt", "updatedAt")
VALUES ('modul', current_timestamp, current_timestamp);

INSERT INTO
  "hierarchyNodeType" ("typeName", "createdAt", "updatedAt")
VALUES ('cjelina', current_timestamp, current_timestamp);


-- =================================== HIERARCHY NODES ON COURSE AND ACADEMIC YEAR =============================================

-- =================================== HIERARCHY NODES a pipi15 with questions =============================================
-- hierarchy nodes PIPI2015
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('a', 'id 1', current_timestamp, current_timestamp, NULL, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 1', current_timestamp, current_timestamp, 1, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 1, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 1, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 1, 3);

INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 2', current_timestamp, current_timestamp, 1, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 2, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 2, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 2, 3);

INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 3', current_timestamp, current_timestamp, 1, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 3, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 3, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 3, 3);

-- =================================== HIERARCHY NODES b pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('b', 'id 2', current_timestamp, current_timestamp, 1, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 4', current_timestamp, current_timestamp, 2, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 4, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 4, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 4, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 5', current_timestamp, current_timestamp, 2, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 5, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 5, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 5, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 6', current_timestamp, current_timestamp, 2, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 6, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 6, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 6, 3);


-- =================================== HIERARCHY NODES c pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('c', 'id 3', current_timestamp, current_timestamp, 2, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 7', current_timestamp, current_timestamp, 3, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 7, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 7, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 7, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 8', current_timestamp, current_timestamp, 3, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 8, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 8, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 8, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 9', current_timestamp, current_timestamp, 3, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 9, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 9, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 9, 3);


-- =================================== HIERARCHY NODES d pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('d', 'id 4', current_timestamp, current_timestamp, 1, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 10', current_timestamp, current_timestamp, 4, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 10, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 10, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 10, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 11', current_timestamp, current_timestamp, 4, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 11, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 11, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 11, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 12', current_timestamp, current_timestamp, 4, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 12, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 12, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 12, 3);


-- =================================== HIERARCHY NODES e pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('e', 'id 5', current_timestamp, current_timestamp, 4, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 13', current_timestamp, current_timestamp, 5, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 13, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 13, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 13, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 14', current_timestamp, current_timestamp, 5, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 14, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 14, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 14, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 15', current_timestamp, current_timestamp, 5, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 15, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 15, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 15, 3);


-- =================================== HIERARCHY NODES f pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('f', 'id 6', current_timestamp, current_timestamp, 4, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 16', current_timestamp, current_timestamp, 6, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 16, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 16, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 16, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 17', current_timestamp, current_timestamp, 6, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 17, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 17, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 17, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 18', current_timestamp, current_timestamp, 6, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 18, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 18, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 18, 3);


-- =================================== HIERARCHY NODES g pipi15 with questions =============================================
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('g', 'id 7', current_timestamp, current_timestamp, 6, 1, 1);
-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 19', current_timestamp, current_timestamp, 7, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 19, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 19, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 19, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 20', current_timestamp, current_timestamp, 7, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 20, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 20, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 20, 3);

-- questions
INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId", "answersNumber")
VALUES ('id 21', current_timestamp, current_timestamp, 7, 3);
-- answers
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('tocno', TRUE, current_timestamp, current_timestamp, 21, 1);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 21, 2);
INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId", ordinal)
VALUES ('netocno', FALSE, current_timestamp, current_timestamp, 21, 3);


--hierarchy nodes ASP2015
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('a', 'id 8', current_timestamp, current_timestamp, NULL, 1, 4);
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('b', 'id 9', current_timestamp, current_timestamp, 8, 1, 4);
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('c', 'id 10', current_timestamp, current_timestamp, 9, 1, 4);
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('d', 'id 11', current_timestamp, current_timestamp, 8, 1, 4);
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('e', 'id 12', current_timestamp, current_timestamp, 11, 1, 4);
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('f', 'id 13', current_timestamp, current_timestamp, 11, 1, 4);
INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
VALUES ('g', 'id 14', current_timestamp, current_timestamp, 13, 1, 4);


-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
-- VALUES ('hTest2', 'decs', current_timestamp, current_timestamp, NULL, 2, 1);
--
-- INSERT INTO "hierarchyNode" ("name", "description", "createdAt", "updatedAt", "parentId", "hierarchyNodeTypeId", "courseId")
-- VALUES ('hTest3', 'decs', current_timestamp, current_timestamp, NULL, 1, 2);
--
-- INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId")
-- VALUES ('first question', current_timestamp, current_timestamp, 1);
--
-- INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId")
-- VALUES ('second question', current_timestamp, current_timestamp, 2);
--
-- INSERT INTO "question" ("text", "createdAt", "updatedAt", "hierarchyNodeId")
-- VALUES ('third question', current_timestamp, current_timestamp, 3);
--
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer1', TRUE, current_timestamp, current_timestamp, 1);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer2', FALSE, current_timestamp, current_timestamp, 1);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer3', FALSE, current_timestamp, current_timestamp, 1);
--
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer1', TRUE, current_timestamp, current_timestamp, 2);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer2', FALSE, current_timestamp, current_timestamp, 2);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer3', FALSE, current_timestamp, current_timestamp, 2);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer4', FALSE, current_timestamp, current_timestamp, 2);
--
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer1', TRUE, current_timestamp, current_timestamp, 3);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer2', FALSE, current_timestamp, current_timestamp, 3);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer3', FALSE, current_timestamp, current_timestamp, 3);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer4', FALSE, current_timestamp, current_timestamp, 3);
-- INSERT INTO "answer" ("text", "correct", "createdAt", "updatedAt", "questionId")
-- VALUES ('answer5', FALSE, current_timestamp, current_timestamp, 3);
--
--
-- SELECT *
-- FROM "question";
-- SELECT *
-- FROM "answer";
-- SELECT *
-- FROM "hierarchyNode";
-- SELECT *
-- FROM "hierarchyNodeType";
-- SELECT *
-- FROM "user";
-- SELECT *
-- FROM "userType";
-- SELECT *
-- FROM "userCourse";
-- SELECT *
-- FROM teacher;
-- SELECT *
-- FROM student;
-- SELECT *
-- FROM "academicYear";
-- SELECT *
-- FROM "course";
-- SELECT *
-- FROM "test";
-- SELECT *
-- FROM "testDefinition";
--
-- DELETE FROM "hierarchyNode"
-- WHERE 1 = 1;
