# menwatch


#System Requirement

#1. Hardware

##Minimal

* Processor: 2 x 1,6 GHz CPU

* RAM: 2 GB

* HDD: 1 x 20 GB of free space or more

## Recommend
* Processor: 4 x 1,6 GHz CPU

* RAM: 8 GB

* HDD: 1 x 40 GB of free space or more

#2. Software

* Operating system: Window 8.1, Window 10, Ubuntu 16.04

* Database: PostgreSQL 9.8 or higher

* Nodejs 8.9.3 version or higher

* Android Studio 3.2 or higher

* Latest jdk and Java Runtime

#Install instruction
###The MenWatches Database

* Login to your PostgreSQL, then create database called menwatch

* Right click on this database choose Restore.

* Browse to the file named menwatches. select this file

* Click on Restore button.

###The MenWatches Website

* After unzip the file named menwatch-website

* Open Command Prompt Cd to this folder.

* Type **npm install** to update the needed middle-ware
* There is a file called **DatabaseConnection.js** in the utils folder. 

* Open this file to config the database connection.

* When finishing, type **nodemon index** to run this website

###The MenWatches Android Application

####From the Studio project dialog

* From the project dialog choose the second option: Open an existing Android Studio Project

* In the file dialog that appears, navigate into the project directory of the project (the one that contains the app folder)

* Click Choose

####From the file menu

* Choose File/Open from the menu

* In the file dialog that appears, navigate into the project directory of the project (the one that contains the app folder)

* Click Choose


###Admin Role

* Email: admin@menwatch.com

* Password: min

###Staff Role

* Email: staff@menwatch.com

* Password: man

* Email: staff02@menwatch.com

* Password: man

