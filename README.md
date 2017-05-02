Chibolines
===================

Comunicación entre el centro infantil y la familia centralizada en una herramienta que cautiva a padres y educadores.

----------

### Discover Chibolines

![alt text](https://pbs.twimg.com/media/C-2buOWXgAAqsGB.jpg:large)

Chibolines permite a los padres conocer el registro de las actividades diarias de los pequeños chibolines en el centro educativo.

##### Lista de Actividades

![alt text](https://pbs.twimg.com/media/C-2buOPXUAEM4Tf.jpg:large)

##### Principes y Princesas

![alt text](https://pbs.twimg.com/media/C-2buOZXkAEselH.jpg:large)

##### Actividades

![alt text](https://pbs.twimg.com/media/C-2buNnXoAMbPsZ.jpg:large)

### Installation

Cosas que quizás quieras cubrir:

Rails

```
rails 4.2.6
```

Ruby

```
ruby 2.1.5p273
```

##### System dependencies

```
mysql2 -v '0.4.5'
```

##### Configuration mysql2 (Mac)

1) Install MySQL.
[Download mysql for mac:](https://dev.mysql.com/downloads/mysql/)

2) gem to your Gemfile (included)

```
gem 'mysql2', '>= 0.3.13', '< 0.5'
```


3) Run bundle install from the command line.

```
bundle install
```

4) Setup your database credentials in 
```
confid/database.yml
```
<pre>
development
   adapter: mysql2
   encoding: utf8
   database: myapp_development
   pool: 5
   username: someuser
   password: somepassword
   host: localhost
</pre>

change 
```myapp_development```, ```someuser```, ``` somepassword```, ```localhost``` for yours.

##### Database creation

```rake db:create```

##### Database initialization

```rake db:seed```

##### Rails Server

```rails s```

##### MySQL Server

```sudo /usr/local/mysql/support-files/mysql.server start```

#### Enjoy!