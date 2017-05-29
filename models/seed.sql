\c db_projectoverflow


INSERT INTO subjects(subject)
  VALUES
  ('javascript'),
  ('express'),
  ('react'),
  ('node');

INSERT INTO documentation(main_topic,topic,url,main_tag,rel_tag_one,rel_tag_two)
    VALUES
  ('Javascript','Javascript closures','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',1,3,4),
  ('JavaScript','Javascript "this" keyword','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this',1,3,4),
  ('JavaScript','Javascript callback functions','https://developer.mozilla.org/en-US/docs/Mozilla/js-ctypes/Using_js-ctypes/Declaring_and_Using_Callbacks',1,3,4),
  ('JavaScript','Javascript objects','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',1,3,4),
  ('JavaScript','Javascript prototypes','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype',1,3,4),
  ('Node','node.js official documentation','https://nodejs.org/en/docs/guides/',4,1,2),
  ('Node','node.js beginner tutorial','https://www.airpair.com/javascript/node-js-tutorial',4,1,2),
  ('Express.js','Express official documentation','https://expressjs.com/en/guide/routing.html',2,4,1),
  ('Express.js','Writing Middleware for Express','https://stormpath.com/blog/how-to-write-middleware-for-express-apps',2,4,1);

INSERT INTO documentation(main_topic,topic,url,main_tag,rel_tag_one)
    VALUES
  ('React.js','React tutorial','https://facebook.github.io/react/tutorial/tutorial.html',3,1),
  ('React.js','React official documentation','https://facebook.github.io/react/docs/hello-world.html',3,1);


INSERT INTO questions(question,qtopic_id,question_sub)
    VALUES
  ('What is JavaScript?',1, 'javascript'),
  ('What really is JavaScript?',1, 'javascript'),
  ('What is Express?',2, 'express'),
  ('What is React?',3, 'react'),
  ('What is Node.js?',4, 'node'),
  ('Is Node javascript?',4, 'node'),
  ('IS React javascript?',3, 'react'),
  ('Is Express js?',4, 'express'),
  ('How do they work in js?',1, 'javascript'),
  ('Hows react work with node?',3, 'react');

INSERT INTO answers(aquestion_id,answer,atopic_id)
    VALUES
  (1, 'JavaScript is a programming language dude',1),
  (1, 'this is another answer for the first javascript question',1),
  (1, 'this is a third answer for the first javascript question',1),
  (2, 'JavaScript is really a programming language dude',1),
  (3, 'Express is a framework for node.js dude',2),
  (9, 'React is stoopid',3),
  (3, 'React is reactable',3),
  (4, 'React is the new wave',3),
  (8, 'Express is expressable',2),
  (10, 'Node is nodeable',4),
  (10, 'Node.js is a test',4);



