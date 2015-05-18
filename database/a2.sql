CREATE TABLE user (
  idUser SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(50),
  password VARCHAR(50)
);

CREATE TABLE student (
  idStudent SERIAL PRIMARY KEY NOT NULL,
  idUser INTEGER REFERENCES user(idUser),
  firstName VARCHAR(50),
  lastName VARCHAR(50),
);

CREATE TABLE teacher (
  idTeacher SERIAL PRIMARY KEY NOT NULL,
  idUser INTEGER REFERENCES user(idUser),
  firstName VARCHAR(50),
  lastName VARCHAR(50),
);

CREATE TABLE course (
  idCourse SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(128),
  acronym VARCHAR(15),
  url VARCHAR(128)
);

CREATE TABLE academicYear (
  idAcademicYear SERIAL PRIMARY KEY NOT NULL,
  titleAcademicYear VARCHAR(50),
  dateStart DATE,
  dateEnd DATE
);

CREATE TABLE teacherCourse (
  idTeacher INTEGER REFERENCES teacher(idTeacher),
  idCourse INTEGER REFERENCES course(idCourse),
  idAcademicYear INTEGER REFERENCES academicYear(idAcademicYear)
);

CREATE TABLE studentCourse (
  idStudent INTEGER REFERENCES student(idStudent),
  idCourse INTEGER REFERENCES course(idCourse),
  idAcademicYear INTEGER REFERENCES academicYear(idAcademicYear)
);

-- questions and hierarchy nodes

CREATE TABLE hierarchyNodeType (
  idHierarchyNodeType SERIAL PRIMARY KEY NOT NULL,
  typeName VARCHAR(50)
);

-- implements net structure for hierarchy
CREATE TABLE hierarchyNode (
  idHierarchyNode SERIAL PRIMARY KEY NOT NULL,
  idParent INTEGER REFERENCES hierarchyNode(idHierarchyNode),
  name VARCHAR(50),
  idHierarchyNodeType INTEGER REFERENCES hierarchyNodeType(idHierarchyNodeType),
  description TEXT,
  idAcademicYear INTEGER REFERENCES academicYear(idAcademicYear)
);

-- CREATE TABLE courseAcademicYear (
--   idCourse INTEGER REFERENCES course(idCourse),
--   idAcademicYear INTEGER REFERENCES academicYear(idAcademicYear),
--   idRootHierarchyNode INTEGER REFERENCES hierarchyNode(idHierarchyNode)
-- );

CREATE TABLE questionType (
  idQuestionType SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(20),
  description TEXT
);

CREATE TABLE question (
  idQuestion SERIAL PRIMARY KEY NOT NULL,
  idQuestionType INTEGER REFERENCES questionType(idQuestionType),
  textQuestion TEXT,
  idTeacherCreated INTEGER REFERENCES teacher(idTeacher)
);

-- CREATE TABLE simpleQuestion (
--   idSimpleQuestion SERIAL PRIMARY KEY NOT NULL,
--   idQuestion INTEGER
-- );

CREATE TABLE sqlQuestion (
  idSqlQuestion SERIAL PRIMARY KEY NOT NULL,
  checkSql TEXT,
  checkCorrectResult TEXT, --???
  idQuestion INTEGER REFERENCES question(idQuestion)
);

CREATE TABLE questionHierarchy (
  idQuestion INTEGER REFERENCES question(idQuestion),
  idHierarchyNode INTEGER REFERENCES hierarchyNode(idHierarchyNode)
);

CREATE TABLE simpleQuestionAnswer (
  idAnswer SERIAL PRIMARY KEY NOT NULL,
  idQuestion INTEGER REFERENCES question(idQuestion),
  correct BOOLEAN,
  textAnswer TEXT
);

CREATE TABLE image (
  idImage SERIAL PRIMARY KEY NOT NULL,
  imageUrl TEXT,
  data BYTEA
);

CREATE TABLE questionImage (
  idQuestionImage SERIAL PRIMARY KEY NOT NULL,
  idImage INTEGER REFERENCES image(idImage),
  idQuestion INTEGER REFERENCES question(idQuestion)
);

-- ABC or SQL
CREATE TABLE testType (
  idTestType SERIAL PRIMARY KEY NOT NULL,
  typeName VARCHAR(50)
);

-- na koji nacin student moze pregledavati rezultate
CREATE TABLE resultShowType (
  idResultShowType SERIAL PRIMARY KEY NOT NULL,
  showTypeName VARCHAR(50)
);

-- test and testDefinition
CREATE TABLE test (
  idTest SERIAL PRIMARY KEY NOT NULL,
  idCourse INTEGER REFERENCES course(idCourse),
  idAcademicYear INTEGER REFERENCES academicYear(idAcademicYear),
  idTestType INTEGER REFERENCES testType(idTestType),
  idTeacherCreated INTEGER REFERENCES teacher(idTeacher),
  idResultShowType INTEGER REFERENCES resultShowType(idResultShowType),
  description TEXT,
  title VARCHAR(128),
  titleShort VARCHAR(50),
  maxScore FLOAT,
  password VARCHAR(50),
  questionsNumber SMALLINT,
  timeAvailable INTEGER,
  passPercentage SMALLINT, -- [0,100]
  availableSince DATE,
  availableTill DATE
  --repeatedly accessible
  --anonymous
  --test ordinal number
);

CREATE TABLE gradingModel (
  idGradingModel SERIAL PRIMARY KEY NOT NULL,
  modelName VARCHAR(20),
  description TEXT,
  weight INTEGER,
  negativePercentage INTEGER -- 0-100
);

--add database constraint so that SUM(minQuestions) < test.questionsNumber
CREATE TABLE testDefinition (
  idTest INTEGER REFERENCES test(idTest), 
  idHierarchyNode INTEGER REFERENCES hierarchyNode(idHierarchyNode),
  idGradingModel INTEGER REFERENCES gradingModel(idGradingModel),
  minQuestions INTEGER,
  maxQuestions INTEGER
);

--studentTest = student's test
CREATE TABLE studentTest (
  idStudentTest SERIAL PRIMARY KEY NOT NULL,
  idStudent INTEGER REFERENCES student(idStudent),
  idTest INTEGER REFERENCES test(idTest),
  timeStarted DATE,
  timeEnded DATE,
  IPAddress VARCHAR(50),
  correctAnswers SMALLINT,
  incorrectAnswers SMALLINT,
  unanswered SMALLINT,
  -- ukupna tezina i ostvarena tezina ???
  percentage SMALLINT, --of total score
  timeEvaluated DATE,
  interupted BOOLEAN,
  prolonged BOOLEAN
);

CREATE TABLE studentTestSimpleQuestion (
  idStudentTest INTEGER REFERENCES studentTest(idStudentTest),
  idQuestion INTEGER REFERENCES  question(idQuestion),
  idGradingModel INTEGER REFERENCES gradingModel(idGradingModel), 
  questionOrdinal INTEGER,
  permutation VARCHAR(10),
  correctAnswerOrdinal INTEGER, --
  answerOrdinal INTEGER -- (if there is 5 answers [1,5])
);

CREATE TABLE studentTestSqlQuestion (
  idStudentTest INTEGER REFERENCES studentTest(idStudentTest),
  idQuestion INTEGER REFERENCES question(idQuestion),
  idGradingModel INTEGER REFERENCES gradingModel(idGradingModel),
  answerSql TEXT,
  correct BOOLEAN
);

CREATE TABLE language (
  idLanguage SERIAL PRIMARY KEY NOT NULL,
  languageCode VARCHAR(50)
);

CREATE TABLE lablel (
  idLabel SERIAL PRIMARY KEY NOT NULL,
  tag TEXT,
  idLanguage INTEGER REFERENCES language(idLanguage),
  value TEXT
);

-- shadow i audit tablice
-- kako dozvoliti ponovno pisanje ili produljenje vremena (spremanje polovicnog testa studenta)